Hello!! This is Roy.

I created this API as a way to learn and practice backend development with Node.js, Java Script and MongoDB, JWT and Users Authentication.
Please, feel free to comment and give me your feedback.

************

Setting up the db connection:

1. create a .env file.
2. Inside the .env create the variables:
    PORT=
    MONGODB_URL=

3. for dev mode, dun the command: npm run dev

4. In this folder You'll find the Postman's collection to test the API.

*************
ROLES
There are four default roles that are being created once you run the project for the first time:
Admin: Can create, update and delete data.
Editor: Can update data.
Viewer, User: Can view only.

Roles Viewer and User are not allowed to make changes in the data.
Role User is set by default if you create a user and you don't assign a role before create the user.

*************
TESTING THE API

In Postman, you'll have to first Sign up:

1. Go to "Auth" collection.
2. Open "Signup" request.
3. Send the username, email and password, as required.
4. Open the "Login" request and send the email and password. The email sent must be created in Signup, first.
5. Copy the token in the Login result.
6. Create a Header named x-access-token and set the token you copied in the previous step as value. This is required for all of the requests you make after you logged in.
