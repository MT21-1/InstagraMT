package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"Server/authentication"
	"Server/graph/generated"
	"Server/graph/model"
	"context"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.InputUser) (string, error) {
	usernameExist, usererr := r.UsernameExist(ctx, input.Username)

	if usernameExist {
		return "", usererr
	}

	emailExist, emailerr := r.EmailExist(ctx, input.Email)
	if emailExist {
		return "", emailerr
	}

	u := model.User{
		IsVerified: false,
		Username:   input.Username,
		FullName:   input.FullName,
		Email:      input.Email,
		Password:   authentication.HashPassword(input.Password),
		Picture:    "https://www.pngitem.com/pimgs/m/517-5177724_vector-transparent-stock-icon-svg-profile-user-profile.png",
	}

	_, err := r.Db.Model(&u).Insert()

	if err != nil {
		return "", errors.New("register failed")
	}

	token, _ := authentication.GenerateToken(input.Email)
	authentication.SendGmail(input.Email, token)

	return "Verification Code Sent", nil
}

func (r *mutationResolver) LoginUser(ctx context.Context, input model.LoginUser) (string, error) {
	var u model.User
	emailRegistered, _ := r.EmailExist(ctx, input.Email)

	if !emailRegistered {
		// artinya emailnya ga ada.
		return "", errors.New("invalid email")
	}
	err := r.Db.Model(&u).Where("email = ?", input.Email).First()

	if err != nil {
		return "", errors.New("invalid Email")
	}

	checkPassword := authentication.CheckPasswordHash(input.Password, u.Password)

	if !checkPassword {
		//kalo passwordnya ga cocok
		return "", errors.New("invalid password")
	}

	token, _ := authentication.GenerateToken(input.Email)
	return token, nil
}

func (r *mutationResolver) UsernameExist(ctx context.Context, input string) (bool, error) {
	var user model.User
	err := r.Db.Model(&user).Where("username = ?", input).First()

	if err == nil {
		// Username sudah ada
		return true, errors.New("username is used")
	}

	// Username kosong
	return false, nil
}

func (r *mutationResolver) EmailExist(ctx context.Context, input string) (bool, error) {
	var user model.User
	err := r.Db.Model(&user).Where("email = ?", input).First()

	if err == nil {
		// Email sudah ada
		return true, errors.New("email is used")
	}

	// Email kosong
	return false, errors.New("")
}

func (r *mutationResolver) GmailLogin(ctx context.Context, accessToken string) (string, error) {
	client := http.Client{}
	req, err := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
	if err != nil {
		return "", nil
	}

	req.Header.Set("Authorization", "Bearer "+accessToken)

	res, err := client.Do(req)
	if err != nil {
		return "", nil
	}

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", nil
	}

	var googleInfo authentication.GoogleInfo
	json.Unmarshal(resBody, &googleInfo)

	var user model.User
	err = r.Db.Model(&user).Where("email = ?", googleInfo.Email).First()
	if err == nil {
		token, err := authentication.GenerateToken(user.Email)
		if err != nil {
			return "", err
		}

		return token, nil
	}

	user = model.User{
		FullName:        googleInfo.Name,
		Email:           googleInfo.Email,
		Password:        "user",
		Username:        strings.ReplaceAll(googleInfo.Email, "@", ""),
		Picture:         googleInfo.Picture,
		IsVerified:      true,
		IsGoogleAccount: true,
	}

	_, err = r.Db.Model(&user).Insert()
	if err != nil {
		return "", err
	}

	token, err := authentication.GenerateToken(user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (r *mutationResolver) IsVerified(ctx context.Context, input string) (bool, error) {
	var u model.User
	err := r.Db.Model(&u).Where("email = ?", input).First()

	if err != nil {
		return false, err
	}

	if u.IsVerified {
		return true, nil
	} else {
		return false, nil
	}
}

func (r *mutationResolver) ResendVerificationCode(ctx context.Context, input string) (string, error) {
	var u model.User
	err := r.Db.Model(&u).Where("email = ?", input).First()
	if err != nil {
		return "", errors.New("email not registered")
	}

	token, err := authentication.GenerateToken(input)
	if err != nil {
		return "", err
	}

	authentication.SendGmail(input, token)

	return "Verification Code Sent", nil
}

func (r *mutationResolver) VerifyUser(ctx context.Context, input model.VerifyEmail) (string, error) {
	email, err := authentication.ParseToken(input.Token)
	print(email)
	if err != nil {
		return "", errors.New("invalid email")
	}

	if email != input.Email {
		return "", errors.New("invalid verification code")
	}

	_, err = r.Db.Model(&model.User{}).Set("is_verified = true").Where("email = ?", email).Update()

	if err != nil {
		//klo error
		return "", errors.New("connection to database failed")
	}

	token, err := authentication.GenerateToken(input.Email)
	if err != nil {
		return "", errors.New("failed to generate token")
	}

	return token, nil
}

func (r *mutationResolver) SendResetPassword(ctx context.Context, input string) (string, error) {
	token, _ := authentication.GenerateToken(input)
	authentication.SendResetGmail(input, token)

	return "Success", nil
}

func (r *mutationResolver) VerifyResetPassword(ctx context.Context, input model.UpdatePassword) (string, error) {
	token := input.Token

	email, _ := authentication.ParseToken(token)

	var u model.User
	err := r.Db.Model(&u).Where("email = ?", email).First()

	if err != nil {
		return "", errors.New("invalid token")
	}
	password := authentication.HashPassword(input.Password)
	_, errs := r.Db.Model(&model.User{}).Set("password = '"+password+"'").Where("email = ?", email).Update()

	if errs != nil {
		return "", errs
	}

	return "Success", nil
}

func (r *mutationResolver) GetUserBasedOnUsername(ctx context.Context, input string) (*model.User, error) {
	var user model.User
	err := r.Db.Model(&user).Where("username = ?", input).First()

	if err != nil {
		return nil, errors.New("invalid username")
	}
	return &user, nil
}

func (r *mutationResolver) GetUserBasedOnEmail(ctx context.Context, input string) (*model.User, error) {
	var user model.User
	err := r.Db.Model(&user).Where("email = ?", input).First()

	if err != nil {
		return nil, errors.New("invalid username")
	}
	return &user, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	err := r.Db.Model(&users).Select()

	if err != nil {
		return nil, errors.New("fail to retrieve data")
	}

	return users, errors.New("")
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
