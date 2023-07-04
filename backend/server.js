const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
dotenv.config({ path: ".env" });
const cors = require("cors");

app.use(cors(
    {
        origin: 'https://mern-frontend-faq1.onrender.com',
    }
));

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: "8-nqbp9WR1ZkQqdisGFHf6YqsGM",
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("uncaughtException", err => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(() => {
        process.exit(1);
    });
});