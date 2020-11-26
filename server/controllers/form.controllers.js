//fetch form data
const fetchData = (req, res) => {
    res.status.json("fetch data api");
};

//Add form data
const addData = (req, res) => {
    res.status.json("Add form data api");
};

//Update form data
const updateData = (req, res) => {
    res.status.json("update form data api");
};

//Delete form data
const deleteData = (req, res) => {
    res.status.json("Delete form data api");
};

module.exports = {
    fetchData,
    addData,
    updateData,
    deleteData,
};
