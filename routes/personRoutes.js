const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).send({
      success: true,
      message: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "Chef" || workType == "Manager" || workType == "Waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fethed");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid workType" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    // extract the id from the URL parameter
    const personId = req.params.id;

    //updated data from the person
    const updatedPersonData = req.body;

    // findByIdAndUpdate(id , updatedcontent )
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // Run mongoose validators
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found." });
    }
    console.log("Data updated.");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({
      success: true,
      message: `person deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
