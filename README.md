## Requirments

- Ruby `3.2.2`
- Rails `7.1.3.2`
Postgresql `14`
Node.js `18v +`
React `18.2`


## Database creation & initialization

`rake db:create db:migrate db:seed`
- When database is created and we need recreate:
`rake db:drop db:create db:migrate db:seed`


## Run

### Rails api server

Directory: /
`rails s`

### React app

`cd hackathonfront`
`npm start`
