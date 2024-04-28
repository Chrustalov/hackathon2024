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

- We have some error about .env (change in .env.development url to [http://localhost:3000/](http://localhost:3000/)):
```
'https://hackaton-9507e74b8c0c.herokuapp.com' to process.env.REACT_APP_API
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

### Step-by-step development of events through the eyes of a user on a website 

- Users can register on the site for the first time and, if they are already registered, they should log in. 
- They can become a contractor or a customer. When registering, the user can provide detailed information about himself (phone number, about himself, email, location, first and last name) to ensure the reliability of the person.
- User capabilities:
    - The contractor will be able to take orders for execution.
    - The customer can create requests, mark requests as completed, and edit requests.
    - General: The user can search for requests by name or tags (for example, city).

### Extended version of the product (steps in future)

1. Ability to administer the website. 
  - The administrator will be able to:
    - check user requests.
    - create categories of requests.
    - create tags for requests.
    - modify the content of the main page (i.e. add a banner or swiper, etc.)
    - ban users who are suspected of falsifying information about a request.
    - view statistics of requests and users 

2. Integration with Diia, charitable foundations.

3. Ability to create secure requests. 
  - The user must be identified on the profile page with a passport.

4. Advanced filtering of requests by tags, categories, creation date, execution date, security.

5. Add status extensions for the request:
  - canceled 
  - fraud
  - suspended

6. Cloud storage for storing all completed requests in the form of pdf files. The certificates should contain information about the request, author and executor, and the status of the request.
