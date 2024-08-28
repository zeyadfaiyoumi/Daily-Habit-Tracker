// استيراد المكتبات المطلوبة
const express = require("express");
const http = require("http");
const cors = require("cors"); // استيراد مكتبة cors
const connectDB = require("./config/db"); // استيراد دالة الاتصال بقاعدة البيانات
const userRoutes = require("./routes/userRoutes"); // استيراد المسارات

// إنشاء تطبيق Express
const app = express();

// إعداد CORS للسماح بالطلبات من جميع الأصول
app.use(cors()); // إضافة هذا السطر لتفعيل CORS

// Middleware لتحليل بيانات JSON
app.use(express.json());

// استخدام المسارات التي تم إعدادها
app.use("/api/users", userRoutes); // كل المسارات المتعلقة بالمستخدمين تبدأ بـ /api/users

// إنشاء الخادم باستخدام http و Express
const server = http.createServer(app);

// الاتصال بقاعدة البيانات وتشغيل الخادم
async function startServer() {
  try {
    await connectDB(); // انتظار الاتصال بقاعدة البيانات

    // بدء تشغيل الخادم على المنفذ 3000
    server.listen(3000, () => {
      console.log("الخادم يعمل على http://localhost:3000");
    });
  } catch (error) {
    console.error("فشل تشغيل الخادم:", error);
  }
}

startServer(); // استدعاء الدالة لبدء تشغيل الخادم
