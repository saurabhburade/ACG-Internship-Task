const Form = require("../models/form.model");
//fetch form data
const fetchData = (req, res) => {
    Form.find()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);

            res.status(400).json("Failed to fetch data");
        });
};

//Add form data
const addData = (req, res) => {
    const {fname, lname, email, dob} = req.body;
    const newData = new Form({
        fname,
        lname,
        email,
        dob,
    });
    newData
        .save()
        .then(entry => {
            res.status(200).json("Add Data Success");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Add Data failed");
        });
};

//Update form data
const updateData = (req, res) => {
    const {fname, lname, email, dob, _id} = req.body;
    Form.updateOne(
        {_id},
        {
            $set: {
                fname,
                lname,
                email,
                dob,
            },
        }
    )
        .then(updateObject => {
            if (updateObject.nModified) {
                res.status(200).json("Data updated successfully");
            }
            res.status(400).json("Something went wrong");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Failed to update data");
        });
};

//Delete form data
const deleteData = (req, res) => {
    const {_id} = req.headers;
    Form.deleteOne({_id})
        .then(delObject => {
            console.log(delObject);

            if (delObject.n) {
                res.status(200).json("Data deleted successfully");
            }
            res.status(400).json("Something went wrong");
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Failed to delete data");
        });
};

module.exports = {
    fetchData,
    addData,
    updateData,
    deleteData,
};
