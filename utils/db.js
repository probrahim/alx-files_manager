import mongoose from 'mongoose';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        
        mongoose.connect(`mongodb://${host}:${port}/${database}`, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    isAlive() {
        return this.connection.readyState === 1; // 1 means connected
    }

    async nbUsers() {
        return await User.countDocuments();
    }

    async nbFiles() {
        return await File.countDocuments();
    }
}

const dbClient = new DBClient();
export default dbClient;
