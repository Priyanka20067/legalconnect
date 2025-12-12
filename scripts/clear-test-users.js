// Script to clear test users from the database
// Run this with: node scripts/clear-test-users.js

const mongoose = require('mongoose');
require('dotenv').config();

async function clearTestUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get the User collection
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Count current users
        const beforeCount = await usersCollection.countDocuments();
        console.log(`Current user count: ${beforeCount}`);

        // Delete all users (or you can add a filter to delete specific test users)
        const result = await usersCollection.deleteMany({});
        console.log(`✓ Deleted ${result.deletedCount} users`);

        // Verify deletion
        const afterCount = await usersCollection.countDocuments();
        console.log(`Remaining user count: ${afterCount}`);

        console.log('\n✓ Database cleanup completed successfully!');
        console.log('You can now test registration with any email address.');

    } catch (error) {
        console.error('Error clearing users:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

clearTestUsers();
