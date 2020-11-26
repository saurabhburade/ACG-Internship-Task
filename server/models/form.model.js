const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dob: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Form = mongoose.model("Form", formSchema);
module.exports = Form;
