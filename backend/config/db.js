
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://zeyadfaiyoumi:GHioXuRoiCLFJYBf@testone.rarki.mongodb.net/?retryWrites=true&w=majority&appName=testone"
    );
    console.log("تم الاتصال بقاعدة البيانات بنجاح.");
  } catch (error) {
    console.error("فشل الاتصال بقاعدة البيانات:", error);
    throw error; // إعادة طرح الخطأ في حال الفشل
  }
}

module.exports = connectDB;
