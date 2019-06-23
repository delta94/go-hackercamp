# Password authentication server in Go

* prerequisites (*for my current machine*)
    * postgresql  v10.8
    * go version go1.12.4 linux/amd64 
* some useful command in postgresql
    * start,stop,restart service : `sudo service postgres start` (`stop` or `restart`)
    * access postgres : `sudo -i -u postgres`
    * turn on *psql* : `psql`
    * connect my database: `\c mydb`
    * show all table: `\d`
    * and more ... [here](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)

* you must change config below in `main.go` -> adapt with your db

```go
const (
  hashCost = 8

  host     = "localhost"
  port     = 5432
  user     = "postgres"
  password = "12345@Aa"
  dbname   = "mydb"
)
```

* create database `mydb` and table `users`

```sql
CREATE TABLE users( username text PRIMARY KEY, password text);
```

* run server on port 8000

```sh
$ go build && ./server
```

* test signup & signin

```
### Sign Up request
POST http://localhost:8000/signup

{
  "username": "thoainguyen",
  "password": "secure"
}

### Signin request with correct password

POST http://localhost:8000/signin

{
  "username": "thoainguyen",
  "password": "secure"
}

### Signin request with incorrect password

POST http://localhost:8000/signin

{
  "username": "thoainguyen",
  "password": "incorrect"
}
```
