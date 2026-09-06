require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;

// Start Server after connecting to Database
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`Coursify Server running on http://localhost:${PORT}`);
        });

        // Graceful Shutdown
        const shutdown = () => {
            console.log('\nShutting down server gracefully...');
            server.close(() => {
                console.log('Server process terminated.');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
