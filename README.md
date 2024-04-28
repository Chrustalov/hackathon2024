# Hackathon App

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

- `cd hackathonfront`
- `npm start`


## Project Documentation

### Functional Requirements
1. **Creating Requests**: Users can create requests for assistance.
2. **Viewing Requests**: Ability to view requests in a separate block for assistance.
3. **Registration**: Separate registration fields for those seeking help and those providing it.
4. **Profile**: After successful registration, the user can fill out a profile with detailed information about himself.
5. **Search**: On the main page, the user can search for requests by name and go to this request.
6. **Filters**: On the requests page, the user fan filter requests by different tags and go to this request.
7. **Request details**: On the request page, the user can see details about request, author and latest requests.

### Non-Functional Requirements
1. **Confidentiality Assurance**: User data storage should be reliable and ensure confidentiality.
2. **Performance**: The website should operate quickly and smoothly even under high request loads.
3. **User-Friendly Interface**: The user interface should be intuitive and convenient for all user categories.
4. **Scalability**: The system should be easily scalable to support a growing number of users and requests.
5. **Stability**: The software should be stable and work seamlessly without unexpected failures.
6. **Design**: The design should be aesthetic and animated to attract the user's eye, shades of purple, accessible navigation, high accessibility to the request page.

### Placing a web application on hosting

- https://main--tourmaline-entremet-72ecbb.netlify.app/

