// Script to fix MongoDB indexes
// Run this with: node scripts/fix-indexes.js

const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndexes() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get the User collection
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Get current indexes
        const indexes = await usersCollection.indexes();
        console.log('Current indexes:', JSON.stringify(indexes, null, 2));

        // Drop the username index if it exists
        try {
            await usersCollection.dropIndex('username_1');
            console.log('✓ Successfully dropped username_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('Index username_1 does not exist (already removed)');
            } else {
                throw error;
            }
        }

        // Verify remaining indexes
        const remainingIndexes = await usersCollection.indexes();
        console.log('Remaining indexes:', JSON.stringify(remainingIndexes, null, 2));

        console.log('\n✓ Index cleanup completed successfully!');

    } catch (error) {
        console.error('Error fixing indexes:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

fixIndexes();
