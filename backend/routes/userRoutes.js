const express = require("express");
const router = express.Router();
const {
  insertUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// دالة لجلب جميع المستخدمين
router.get("/", getUsers);

// دالة لإضافة مستخدم جديد
router.post("/", insertUser);

// دالة لتحديث مستخدم
router.put("/:id", updateUser);

// دالة لحذف مستخدم (Soft Delete)
router.delete("/:id", deleteUser);

module.exports = router;
