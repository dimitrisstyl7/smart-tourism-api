import mongoose from "mongoose";
import Country from "../models/Country.js";
import fs from "node:fs";

const countriesCollection = "countries";

const loadCountriesFromJsonFile = (filePath) => {
    const countries = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Remove keys with non-valid values
    countries.forEach(country => {
        for (const [key, value] of Object.entries(country)) {
            if (!value) delete country[key];
        }
    })
    return countries
}

const initDB = async (filePath) => {
    try {
        console.log("🔄 Checking database initialization\n");

        // Check if collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === countriesCollection);

        if (!collectionExists) {
            console.log(`📁 Creating collection '${countriesCollection}'\n`);
            await mongoose.connection.db.createCollection(countriesCollection);
            console.log("✅ Collection created successfully\n");
        }
        // Check if collection has already data
        const numOfDocuments = await Country.countDocuments().exec();
        if (numOfDocuments === 0) {
            console.log("📥 Loading initial data from file\n");

            // Load countries from the json file and insert them in the database
            const countries = loadCountriesFromJsonFile(filePath);
            await Country.insertMany(countries);

            console.log("✅ Database initialized successfully\n");
        } else {
            console.log("⚠️ Data already exists. Skipping database initialization\n");
        }
    } catch (e) {
        console.error("❌ Error during database initialization:", e.message);
    }
};

const connectDB = async (dbUrl) => {
    try {
        console.log(`🔄 Connecting to database at ${dbUrl}\n`);
        await mongoose.connect(dbUrl);
        console.log("✅ Connection established successfully\n");
    } catch (e) {
        console.error("❌ Database connection failed:", e.message);
        process.exit(1);
    }
};

export {connectDB, initDB};