package main

import (
	"log"
	"net/http"
	"github.com/gomodule/redigo/redis"
	"github.com/rs/cors"
)

var cache redis.Conn

func main() {
	initCache()
	mux := http.NewServeMux()
	// "Signin" and "Signup" are handler that we will implement
	mux.HandleFunc("/signin", Signin)
	mux.HandleFunc("/welcome", Welcome)
	mux.HandleFunc("/refresh", Refresh)

    // cors.Default() setup the middleware with default options being
    // all origins accepted with simple methods (GET, POST). See
    // documentation below for more options.
	handler := cors.Default().Handler(mux)
	// start the server on port 8000
	log.Fatal(http.ListenAndServe(":8000", handler))
}

func initCache() {
	conn, err := redis.DialURL("redis://localhost")
	if err != nil {
		panic(err)
	}
	cache = conn
}
