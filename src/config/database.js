const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://khussain:JtM74SrbPIeoJngx@cluster0.nchvuxv.mongodb.net/devConnect")
}
module.exports = connectDB;

