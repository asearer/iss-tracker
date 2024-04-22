const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

// Endpoint to get the current location of the ISS
app.get('/iss', (req, res) => {
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';

    https.get(url, (response) => {
        let data = '';

        // A chunk of data has been received.
        response.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        response.on('end', () => {
            const issData = JSON.parse(data);
            res.send({
                message: "Current ISS Location",
                latitude: issData.latitude,
                longitude: issData.longitude,
                altitude: issData.altitude, // in kilometers
                velocity: issData.velocity  // in kilometers per hour
            });
        });
    }).on("error", (err) => {
        console.error("Error: " + err.message);
        res.status(500).send({
            message: "Failed to retrieve ISS data",
            error: err.message
        });
    });
});

app.listen(port, () => {
    console.log(`ISS Tracker app listening at http://localhost:${port}`);
});
