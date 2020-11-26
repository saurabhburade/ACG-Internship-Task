const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose")
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());


mongoose.connect(
    MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName:"ACG",
    },
    err => {
        if (err) {
            console.log("Mongoose conection error", err);
        } else {
            console.log("Mongoose conection : connected 🔥");
        }
    }
);

app.post("/login", (req, res) => {
    console.log(req.body);
    res.send("hitting /login route");
});


app.use("/products/public/uploads/", express.static("public/uploads"));
if (process.env.NODE_ENV !== "production") {
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
