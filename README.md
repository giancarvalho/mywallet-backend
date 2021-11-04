# MyWallet

MyWallet is an app made to help you organize your finances. Easily track your incomes and expenses.

You can see the project live [here (mobile only)](https://mywallet-react-g9at3yr7a-giancarvalho.vercel.app/).

![Home](https://i.imgur.com/O64KgXW.png) 



This is a full stack project. You are in the back-end repository, you can find the front-end  [here](https://github.com/giancarvalho/mywallet-react). 


## Technologies - Back-end

- Node.js
- Express
- PostgresSQL
- Bcrypt
- Joi
- Jest
- Supertest


## How to use it?

1) Clone this repository
2) Create Database using dump.sql
3) Optionally, run tests with ```npm test``` 
4) Run ```npm run start:dev```

Alternatively, you can use the api through the following URL: https://mywallet-app-me.herokuapp.com

### Endpoints

- POST /sign-up
- POST /sign-in
- GET /entries
- POST /entries
- DELETE /entries?id={entryId}


For the entries endpoint you have to send a Bearer token that you get by signing in. For the POST /entries, the object needs to have the following keys: description (3 - 30 charcaters), amount (from 0.01 - 1000000000), type ('expense' or 'income'). 


---
 This is the 14th project of Driven's Full-stack Web Dev Course.
