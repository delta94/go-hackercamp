package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

var db *sql.DB

const (
  hashCost = 8

  host     = "localhost"
  port     = 5432
  user     = "postgres"
  password = "12345@Aa"
  dbname   = "mydb"
)

func main() {
	// "Signin" and "Signup" are handler that we will implement
	http.HandleFunc("/signin", Signin)
	http.HandleFunc("/signup", Signup)
	// initialize our database connection
	initDB()
	// start the server on port 8000
	fmt.Println("Server start at port 8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}

func initDB() {
  var err error
  psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
    "password=%s dbname=%s sslmode=disable",host, port, user, password, dbname)
	// Connect to the postgres db
	//you might have to change the connection string to add your database credentials
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Print("Failed connection")
		panic(err)
  }
}
