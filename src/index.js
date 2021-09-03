const express = require('express')
const mongodb = require('mongodb');
const cron = require('node-cron')
require('dotenv').config()

// React app
const app = express()

const PORT = process.env.PORT || 3000
const databaseURI = process.env.DATABASE_URI;
const binId = new mongodb.ObjectId(process.env.BIN_ID);

// Bin statu to read from
let binStatus = require('../binstatus.json')
let server = null


// Connect to DB
const connectToDb = async () => {
    const client = await mongodb.MongoClient.connect(databaseURI, { useNewUrlParser: true })
        .catch(err => { console.log('What the heck', err) });
    if (!client) return null;
    return client;
}

// Update status of the bin program currently running on
const updateBinStatus = async (newStatus) => {
    const client = await connectToDb();
    if (!client) console.log('Can not connect to db');

    try {
        const db = client.db('lemmaj');

        let collection = db.collection('Course');
        let query = { _id: binId };

        const resultOriginal = await collection.findOne(query);
        if (!resultOriginal) {
            console.log(`Can't find document with the given id`);
        }

        // Update Status
        const updateQuery = {
            $set: { status: newStatus }
        };

        const result = await collection.updateOne(query, updateQuery);
        if (result) console.log('Bin updated successfully');

    } catch (error) {
        console.log('Error..', error);
    } finally {
        client.close()
    }
}

// start the server
const listen = () => {
    server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
        cronJob()
    })
}

const close = () => {
    server.close();
}

const cronJob = cron.schedule('* * * * *', () => {
    console.log(`Updating bins status at ${new Date().getDate()}`)
    updateBinStatus(binStatus)
});

// start server
listen();