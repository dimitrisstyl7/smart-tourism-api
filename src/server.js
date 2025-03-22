import app from "./app.js";
import dotenv from "dotenv";
import {connectDB, initDB} from "./configs/db.config.js";
import * as path from "node:path";

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/tourismDB";
const filePath = process.env.FILE_PATH || path.resolve(process.cwd(), "data", "countries.json");

await connectDB(dbUrl); // Connect to the database
await initDB(filePath); // Initialize database with data

app.listen(port, () => {
    console.log(`✅ Server is up and running on port ${port}`);
});