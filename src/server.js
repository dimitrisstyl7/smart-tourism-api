import app from "./app.js";
import {connectDB, initDB} from "./configs/db.config.js";

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;
const filePath = process.env.FILE_PATH;

await connectDB(dbUrl); // Connect to the database
await initDB(filePath); // Initialize database with data

app.listen(port, () => {
    console.log(`✅ Server is up and running on port ${port}`);
});