package main

import (
	"Server/authentication"
	"Server/graph"
	"Server/graph/generated"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-pg/pg/extra/pgdebug"
	"github.com/go-pg/pg/v10"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dbOptions := &pg.Options{
		User:     "postgres",
		Password: "user",
		Database: "InstagraMT",
	}

	db := pg.Connect(dbOptions)

	db.AddQueryHook(pgdebug.DebugHook{
		Verbose: true,
	})

	defer db.Close()

	resolver := &graph.Resolver{Db: db}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", authentication.Middleware(db)(srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
