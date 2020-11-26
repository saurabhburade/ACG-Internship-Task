const router = require("express").Router();
const {
    fetchData,
    addData,
    updateData,
    deleteData,
} = require("../controllers/form.controllers");

//fetch form data
router.get("/fetch", fetchData);

//Add form data
router.post("/add", addData);

//Update form data
router.put("/update", updateData);

//Delete form data
router.delete("/delete", deleteData);

module.exports = router;
