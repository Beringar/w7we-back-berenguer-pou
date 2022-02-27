const express = require("express");
const multer = require("multer");
const {
  userRegister,
  userLogin,
  getAllUsers,
} = require("../controllers/usersControllers");

const router = express.Router();

const upload = multer({ dest: "uploads" });

router.get("/", getAllUsers);
router.post("/register", upload.single("image"), userRegister);
router.post("/login", userLogin);

module.exports = router;
