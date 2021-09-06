const express = require('express');
const axios = require('axios');
const cron = require('node-cron')
require('dotenv').config()

// React app
const app = express()

// ENV Variables
const PORT = process.env.PORT || 3000
const databaseURI = process.env.DATABASE_URI;
const API_URL = process.env.API_URL;
const binId = process.env.BIN_ID

// Bin statu to read from
let binStatus = require('../binstatus.json')
let server = null


// Connect to DB
const connectToDb = async () => {
    const client = await MongoClient.connect(databaseURI, { useNewUrlParser: true })
        .catch(err => { console.log('...', err) });
    if (!client) return null;
    return client;
}

// Update status of the bin program currently running on
const updateBinStatus = async (newStatus) => {
    try {
        let doc = {
            binId: binId,
            newStatus,
            createdDate: new Date()
        };

        const response = await axios.post(API_URL, doc);

        if (!response) {
            console.log(`Can't create document with the given status`);
        }

        if (response) console.log('Bin status updated successfully');

    } catch (error) {
        console.log('Error..', error);
    } finally {
        close()
    }
}

// start the server
const listen = () => {
    server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
        cronJob.start()
    })
}

const close = () => {
    server.close();
}

const cronJob = cron.schedule('*/10 * * * * *', () => {
    console.log(`Updating bins status at ${new Date()}`)
    updateBinStatus(binStatus)
});

// start server
listen();
