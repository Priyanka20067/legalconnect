import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectDB();

        const dbName = mongoose.connection.db?.databaseName;
        const collections = await mongoose.connection.db?.listCollections().toArray();
        const collectionNames = collections?.map(col => col.name) || [];

        return NextResponse.json({
            success: true,
            message: 'MongoDB connection successful',
            database: dbName,
            collections: collectionNames,
            collectionCount: collectionNames.length,
            connectionState: mongoose.connection.readyState, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        });
    } catch (error: any) {
        console.error('Database connection test failed:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'MongoDB connection failed',
                error: error.message,
                connectionState: mongoose.connection.readyState,
            },
            { status: 500 }
        );
    }
}
