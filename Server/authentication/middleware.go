package authentication

import (
	"Server/graph/model"
	"context"
	"errors"
	"net/http"

	"github.com/go-pg/pg/v10"
)

type context_key struct {
	name string
}

var ctx_key = &context_key{"user"}

func Middleware(db *pg.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

			header := r.Header.Get("Authorization")

			//klo user blom auth
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			//validasi token jwt
			//pas buat token kita pake email, nah klo mo kita validate tinggal ambil token yg dikasih terus liat apakah dri email yg sama
			tokenString := header
			email, err := ParseToken(tokenString)
			if err != nil {
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}

			var user model.User
			err = db.Model(&user).Where("email = ?", email).First()

			if err != nil {
				// dsini klo tokenny sala
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), ctx_key, &user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func ForContext(ctx context.Context) (*model.User, error) {
	user, _ := ctx.Value(ctx_key).(*model.User)
	if user == nil {
		return nil, errors.New("unauthorized access")
	}

	return user, nil
}
