// Import các thư viện
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());

// Cho phép frontend kết nối từ localhost:5500 hoặc 3000
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000"]
}));

// Cấu hình PostgreSQL
const client = new Client({
  user: "postgres",       // user đăng nhập trong pgAdmin
  host: "localhost",
  database: "user",       // tên database
  password: "a123123",    // mật khẩu (đảm bảo đúng)
  port: 5432,
});

// Kết nối DB
client.connect(err => {
  if (err) {
    console.error("❌ Lỗi kết nối PostgreSQL:", err);
  } else {
    console.log("✅ Đã kết nối cơ sở dữ liệu PostgreSQL");
  }
});

// API nhận dữ liệu
app.post("/add-user", async (req, res) => {
  const { fullname, datetime, kinh_do, vi_do } = req.body;

  // Kiểm tra dữ liệu (bắt buộc có đủ 4 trường)
  if (!fullname || !datetime || !kinh_do || !vi_do) {
    return res.status(400).json({ error: "Thiếu dữ liệu (fullname, datetime, kinh_do, vi_do)" });
  }

  try {
    // Dùng chính thời gian người dùng gửi lên
    const timestamp = new Date(datetime); // chuyển chuỗi datetime thành kiểu Date

    // Câu lệnh chèn dữ liệu
    const query = `
      INSERT INTO du_lieu_yeu_cau_tro_giup (ho_ten, ngay_gio, kinh_do, vi_do)
      VALUES ($1, $2, $3, $4)
    `;

    await client.query(query, [fullname, timestamp, kinh_do, vi_do]);
    res.json({ message: "Đã lưu thành công" });

  } catch (err) {
    console.error("Lỗi khi lưu:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Chạy server
const PORT = 3000;
app.listen(PORT, () => console.log(` Server chạy tại http://localhost:${PORT}`));
