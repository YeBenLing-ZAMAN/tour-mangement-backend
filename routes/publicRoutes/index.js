const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  translateOpen,
} = require("../../controllers/publicController/index");


router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/translateOpen", translateOpen);



module.exports = router;