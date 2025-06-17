# Create a Server Listen and accepting the requests
# npm install express --save
# Create Server listen to port add routes
# Create request handlers
# Install nodemon modify 
# Order of routes matters
http://localhost:3000/ - Nodemon Dev Start from the Express app!
http://localhost:3000/hello/ - Hello from the Express app!
http://localhost:3000/test/ - Test from the Express app!
app.use('/hello', (req, res) => {
    res.send('Hello from the Express app!');
});
app.use('/test', (req, res) => {
    res.send('Test from the Express app!');
});
app.use('/', (req, res) => {
    res.send('Nodemon Dev Start from the Express app!');
});

------------------------------------------------------------------
http://localhost:3000/ - Nodemon Dev Start from the Express app!
http://localhost:3000/hello/ - Nodemon Dev Start from the Express app!
http://localhost:3000/test/ - Nodemon Dev Start from the Express app!

app.use('/', (req, res) => {
    res.send('Nodemon Dev Start from the Express app!');
});
app.use('/hello', (req, res) => {
    res.send('Hello from the Express app!');
});
app.use('/test', (req, res) => {
    res.send('Test from the Express app!');
});

# HTTP Methods
-By default GET api call, POST call also gives same response. So explicitly define the routes
    app.get()
    app.delete()
    app.post()
-Reading dynamic routes
-Middle ware next(), How res works.
-Why middleware? - Goes to all request with /admin
-app.use("/admin") - Write logic here to handle auth and next() if auth success
-app.get("/admin/getAllData")
-Order matters in app.use("/",(err, req, res, next)=>{})
-Creating Schema ?
Episode-07: Diving In to API
-Passing Dynamic data: Fill the data from API during post call
-Write Feed API - GET /feed - get all Users from the database.
# Data Sanitization
- required, unique, default-When you dont pass any value, mangoose insert the default value
- lowercase check for emailId
- trim - remove the whitespaces
- minLength, maxLength
- validate function- only for new
- to make validate for old - findByIdandUpdate
- Check Validator function

# Password Encrypt
- Sign up is entry point, never trust req body. Validation of data is first thing.
- Create a helper function to validate data
- Use bcrypt to stroring the password safely. Import bcrypt and add password, salt data

# Authentication
- User makes API call. TCP/IP protocol
- User should be logged in to make API requests. Server generates JWT token and sends to user.
- USer stores JWT.
- Every time the request made server validates JWT token.
- Where user stores JWT tokens ? - Cookies
# Cookies
- Server sents JWT token in cookies.
- Server wraps userName, password, jwt token in cookies.
- When user receives jwt token stores the cookie in browser.
- ANother API call, cookies will be validated by server.
- The cookie will have the expiration time.
- To read cookie we need cookie-parser
- login/ res.cookie('userId', user._id, { httpOnly: true, secure: true });
- profile/  const cookies = req.cookies;  // Read the cookies, if user not - logged in it retruns empty object.
# JWT Token
- Encodes: Header + Payload + Signature - npm i jsonwebtoken

    



# AWS set up
- Set up AWS, Create AWS EC2 Instance
- Create SSH and change the settings