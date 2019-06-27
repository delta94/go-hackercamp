package main

import (
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go-contacts/app"
	"os"
	"fmt"
	"net/http"
	"go-contacts/controllers"
)


func main() {

	router := mux.NewRouter()

	// router.Use(corsMiddleware)
	router.Use(app.JwtAuthentication) //attach JWT auh middleware

	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/contacts/new", controllers.CreateContact).Methods("POST")
	router.HandleFunc("/api/me/contacts", controllers.GetContactsFor).Methods("GET") //  user/2/contacts

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
		AllowedMethods: []string{"GET","POST","OPTIONS"},
	})
	
	handler := c.Handler(router)
	

	

	//router.NotFoundHandler = app.NotFoundHandler

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" //localhost
	}

	fmt.Println(port)


	err := http.ListenAndServe(":" + port, handler) //Launch the app, visit localhost:8000/api
	if err != nil {
		fmt.Print(err)
	}
}
