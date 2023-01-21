const express = require("express");
const router = express.Router();

const {
  getUser,
} = require("../../controllers/privateController/index");

/* JWT Authentication */
const { verifyJWT, verifyAdmin } = require("../../middleware/authMiddleware");
const middleware = [verifyJWT, verifyAdmin];
router.use(middleware);
/* ---------- */


router.get("/get_all_user", getUser);


module.exports = router;
