const express = require("express");
const multer = require("multer");
const {
  userRegister,
  userLogin,
  getAllUsers,
} = require("../controllers/usersControllers");
const { auth } = require("../middlewares/auth");

const router = express.Router();

const upload = multer({ dest: "uploads" });

router.get("/", auth, getAllUsers);
router.post("/register", upload.single("image"), userRegister);
router.post("/login", userLogin);
router.post("/addfriend/:id", auth, userAddFriend);

module.exports = router;
