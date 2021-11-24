# jwt-auth-rest-api

A REST API to handle login using JSON Web Tokens.
 
Used MVC model to structure the project.


## Endpoints
| Routes                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
|[`/`][0]                |root endpoint                                                  |
|[`/api/user/signup`][1] |signup endpoint                                                |
|[`/api/user/signin`][1] |signin endpoint                                                |
|[`/verified`][2]        |restricted endpoint *(cannot be accessed without signing in)*  |


## Schema
[**`testusers model`**][3]

![model][model]

## Tools/ Libraries
* Used MongoDB Atlas as the database to store user EmailId, Name and password.
* Used Bcrypt module to hash user password before storing in the database.
* Used jsonwebtoken module to **sign and verify** our JWT tokens.
* Used mongoose as the ODM for MongoDB.
* Tested endpoints with Postman.

---
### Notes
For authentication we can use the concept of sessions or JWTs.
Sessions can be handled in two different ways with cookies :-
* on the client side (*using cookie-session module*).
* on the server side (*using express-session*).

If we handle the session from server side, we generally store a session identifier inside a cookie. And this identifier stores the session data on the server, generally a database.  
On the other hand if we handle the session on the client side, the cookie stores session data inside the client in the cookie itself.

[0]: https://github.com/SagnikH/jwt-auth-rest-api/blob/master/index.js
[1]: https://github.com/SagnikH/jwt-auth-rest-api/blob/master/routers/authRoutes.js
[2]: https://github.com/SagnikH/jwt-auth-rest-api/blob/master/routers/verifiedRoutes.js
[3]: https://github.com/SagnikH/jwt-auth-rest-api/blob/master/models/user.js
[model]: https://github.com/SagnikH/jwt-auth-rest-api/blob/master/public/jwt-auth-model.svg
