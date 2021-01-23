# image-recognition-backend
This is the Node.js backend for the React image-recognition-frontend, located <a href='https://github.com/ggroce/image-recognition-frontend'>here</a>.  This backend uses Express, where it handles user registration/login, and serves requests related to Clarifai image recognition API requests.  

After cloning, deployment follows the usual suit: 

`npm install`  
`npm start`

Before running, a Clarifai API key must be acquired and entered into the code or used as a enviroment variable, (available for free when creating an account at <a href="https://www.clarifai.com/">Clarifai</a>).  

PostgreSQL is used as the database in this implementation, with the following tables:  

```
CREATE TABLE login (
id serial PRIMARY KEY, 
hash VARCHAR(100) NOT NULL, 
email text UNIQUE NOT NULL
);

CREATE TABLE users (
id serial PRIMARY KEY, 
name VARCHAR(50), 
email text UNIQUE NOT NULL, 
entries BIGINT DEFAULT 0, 
joined TIMESTAMP NOT NULL
);
```  

