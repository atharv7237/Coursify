const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting reconnection...');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err.message}`);
});

module.exports = { connectDB, connection: mongoose.connection };
