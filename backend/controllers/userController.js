const User = require("../models/userModel");

// دالة لإدخال مستخدم جديد
async function insertUser(req, res) {
  try {
    const user = await User.create(req.body);
    console.log("تم إضافة المستخدم:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("خطأ أثناء إضافة المستخدم:", error);
    res.status(500).json({ message: "خطأ أثناء إضافة المستخدم" });
  }
}

// دالة لجلب جميع المستخدمين
async function getUsers(req, res) {
  try {
    const users = await User.find({ isDeleted: false });
    console.log("المستخدمون في قاعدة البيانات:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("خطأ أثناء جلب المستخدمين:", error);
    res.status(500).json({ message: "خطأ أثناء جلب المستخدمين" });
  }
}

// دالة لتحديث مستخدم
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
    }
    console.log("تم تحديث المستخدم:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("خطأ أثناء تحديث المستخدم:", error);
    res.status(500).json({ message: "خطأ أثناء تحديث المستخدم" });
  }
}

// دالة لحذف مستخدم (Soft Delete)
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
    }
    console.log("تم حذف المستخدم (Soft Delete):", user);
    res.status(200).json({ message: "تم حذف المستخدم بنجاح (Soft Delete)" });
  } catch (error) {
    console.error("خطأ أثناء حذف المستخدم:", error);
    res.status(500).json({ message: "خطأ أثناء حذف المستخدم" });
  }
}

module.exports = { insertUser, getUsers, updateUser, deleteUser };
