console.log('Starting the application...');
const express = require('express');
const app = express();
const port = 3000;
app.use('/hello', (req, res) => {
    res.send('Nodemon Dev Start from the Express app!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Export the app for testing purposes
module.exports = app;   