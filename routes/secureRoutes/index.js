const express = require("express");
const router = express.Router();

const {
  createWallet,
  getWallet,
} = require("../../controllers/scureController/index");

/* JWT Authentication */
const { verifyJWT, verifyUser } = require("../../middleware/authMiddleware");
const middleware = [verifyJWT, verifyUser];
router.use(middleware);
/* ---------- */

router.post("/create_wallet", createWallet);
router.get("/get_user_wallet", getWallet);

module.exports = router;
