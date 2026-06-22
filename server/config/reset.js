import "./dotenv.js";
import { pool } from "./database.js";
import { locations } from "../data/locations.js";
import { events } from "../data/events.js";

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id      SERIAL PRIMARY KEY,
            name    VARCHAR(255) NOT NULL,
            image   VARCHAR(255),
            address VARCHAR(255),
            city    VARCHAR(100),
            state   VARCHAR(50),
            zip     VARCHAR(20)
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log("🎉 locations table created successfully");
    } catch (err) {
        console.log("⚠️ error creating locations table", err);
    }
};

const seedLocationsTable = async () => {
    await createLocationsTable();

    for (const location of locations) {
        try {
            await pool.query(
                `INSERT INTO locations (name, image, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6)`,
                [location.name, location.image, location.address, location.city, location.state, location.zip]
            );
            console.log(`✅ ${location.name} added successfully`);
        } catch (err) {
            console.error("⚠️ error inserting location", err);
        }
    }
};

const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id          SERIAL PRIMARY KEY,
            title       VARCHAR(255) NOT NULL,
            date        DATE,
            time        TIME,
            image       VARCHAR(255),
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log("🎉 events table created successfully");
    } catch (err) {
        console.log("⚠️ error creating events table", err);
    }
};

const seedEventsTable = async () => {
    await createEventsTable();

    for (const event of events) {
        try {
            await pool.query(
                `INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)`,
                [event.title, event.date, event.time, event.image, event.location_id]
            );
            console.log(`✅ ${event.title} added successfully`);
        } catch (err) {
            console.error("⚠️ error inserting event", err);
        }
    }
};

const seedAll = async () => {
    await seedLocationsTable();
    await seedEventsTable();
};

seedAll();
