const express = require("express");
const {
  createAMatch,
  getAllMatches,
  updateAMatchById,
  deleteAMatchById,
} = require("../controllers/match");

const matchRouter = express.Router();
console.log("aa");
matchRouter.post("/", createAMatch);
matchRouter.get("/", getAllMatches);
matchRouter.put("/:id", updateAMatchById);
matchRouter.delete("/:id", deleteAMatchById);

module.exports = matchRouter;

//aa
