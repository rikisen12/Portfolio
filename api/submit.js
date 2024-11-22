const { google } = require("googleapis");

const SPREADSHEET_ID = "16CXPYBDpPISTtIo0-5JwnnTuxkwLVzA9Z0tpFYfBqTk";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new google.auth.GoogleAuth({
    keyFile: "skilful-module-442518-c1-551448a44a6f.json", // Replace with the actual path to your JSON key file
    scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: "Sheet1!A:C",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [[name, email, message, new Date().toISOString()]],
                },
            });

            res.status(200).json({ message: "Data added successfully!" });
        } catch (error) {
            console.error("Google Sheets API Error:", error);
            res.status(500).json({ error: "Failed to add data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
