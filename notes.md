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