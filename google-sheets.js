const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Google Sheets Setup
const auth = new google.auth.GoogleAuth({
    keyFile: "skilful-module-442518-c1-551448a44a6f.json", // Replace with your service account key file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "16CXPYBDpPISTtIo0-5JwnnTuxkwLVzA9Z0tpFYfBqTk"; // Replace with your Google Sheets ID

// API Endpoint to Add Data
app.post("/submit", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A:C", // Adjust range as per your sheet
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[name, email, message, new Date().toISOString()]]
            }
        });

        res.status(200).send("Data added successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add data");
    }
});

// Start the Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
