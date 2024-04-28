## Requirments

- Ruby `3.2.2`
- Rails `7.1.3.2`
- Postgresql `14`
- Node.js `18v +`
- React `18.2`


## Database creation & initialization

`rake db:create db:migrate db:seed`
- When database is created and we need recreate:
`rake db:drop db:create db:migrate db:seed`

## To Run App on your local machine:

- From the terminal: Clone the repo and change to that directory:
```
$ git clone https://github.com/Chrustalov/hackathon2024.git
```

- Install the gems locally:
```
$ bundle install
```

- Create databases: 
```
$ rails db:create
```
(builds a development and testing database)

- Run migrations:
```
$ rails db:migrate
```

- Seed database with initial users, requests and tags. (optional)
```
$ rails db:seed
```

- Install npm packages locally:
```
$ cd hackathonfront
$ npm install
```

- Creates secret key:
```
$ rails secret
```

- Create your credentials for all environments: 
  - `EDITOR="rubymine --wait" rails credentials:edit`

- Paste secret key into credentials:
```
devise_jwt_secret_key: (copy and paste the generated secret here) 
```

## Run

### Rails api server

`rails s`

### React app

`cd hackathonfront`
`npm start`
