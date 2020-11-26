const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const formRoutes = require("./routes/form.routes");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
    MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: "ACG",
    },
    err => {
        if (err) {
            console.log("Mongoose conection error", err);
        } else {
            console.log("Mongoose conection : connected 🔥");
        }
    }
);

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use("/acg/api", formRoutes);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client", "build", "index.html")
        );
    });
}

app.listen(8000, () => {
    console.log("Server is 🔥 ");
});
