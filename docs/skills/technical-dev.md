# 💻 Technical & Dev Skills

Danh sách các kỹ năng Công nghệ và Lập trình (Tech & Dev Skills) dành cho những chiến dịch cần xây dựng Website, Landing Page, App hoặc tự động hóa sâu vào hệ thống.

*(Tài liệu song ngữ: Tiếng Việt / English)*

---

## 1. Frontend Development (`/ag:frontend-development`)

**Mô tả:** Code giao diện Frontend cho Website, Landing Page hoặc ứng dụng Web. Hỗ trợ các công nghệ hiện đại như HTML/CSS/JS thuần, Vue.js, React, Tailwind CSS.
*Code Frontend interfaces for Websites, Landing Pages, or Web Apps using modern technologies like Vanilla JS, Vue.js, React, and Tailwind CSS.*

**Use Cases:**
- Lập trình trang Landing Page tĩnh từ bản thiết kế Figma.
- Thêm hiệu ứng Animation / CSS Transition cho nút bấm.
- Xây dựng giao diện thu thập thông tin khách hàng (Lead Capture Form).

**Ví dụ lệnh (Prompt Example):**
```text
/ag:frontend-development Code một trang Landing Page bán khóa học bằng HTML và TailwindCSS. Có Header, Hero section, 3 khối lợi ích và một form đăng ký.
```

**Output mẫu (Expected Output):**
- Mã nguồn (Source code) giao diện hoàn chỉnh, responsive trên Mobile.

---

## 2. Backend Development (`/ag:backend-development`)

**Mô tả:** Xây dựng hệ thống máy chủ (Server), API, kết nối cơ sở dữ liệu (Database) và xử lý logic phía sau. Hỗ trợ Node.js, Python, Go.
*Build server systems, APIs, database connections, and business logic using Node.js, Python, Go, etc.*

**Use Cases:**
- Code API để lưu thông tin khách hàng điền form vào Database.
- Xây dựng hệ thống tự động gửi Email xác nhận (Transactional Email).
- Kết nối cổng thanh toán (Payment Gateway).

**Ví dụ lệnh (Prompt Example):**
```text
/ag:backend-development Viết một API bằng Node.js (Hono) để nhận dữ liệu POST từ form đăng ký và lưu vào file JSON.
```

**Output mẫu (Expected Output):**
- Mã nguồn Backend.
- Hướng dẫn cài đặt và chạy server.

---

## 3. System Architecture (`/ag:system-architecture`)

**Mô tả:** Kiến trúc sư hệ thống. Thiết kế cấu trúc dự án (Folder structure), sơ đồ luồng dữ liệu (Data Flow), sơ đồ thực thể (ERD) và chọn công nghệ (Tech Stack).
*System Architect. Design project structures, Data Flow diagrams, ERD, and tech stack selection.*

**Use Cases:**
- Lên cấu trúc cho một hệ thống Marketing Automation nhỏ.
- Thiết kế luồng dữ liệu (User Journey) từ lúc click quảng cáo đến lúc mua hàng.
- Đánh giá xem nên dùng WordPress hay Code tay cho dự án mới.

**Ví dụ lệnh (Prompt Example):**
```text
/ag:system-architecture Lên cấu trúc hệ thống và luồng đi dữ liệu cho một hệ thống Affiliate Tracking tự xây dựng.
```

**Output mẫu (Expected Output):**
- Sơ đồ Mermaid diagram trực quan.
- Tài liệu kiến trúc hệ thống (Architecture Document).

---

## 4. Test-Driven Development (`/ag:test-driven-development`)

**Mô tả:** Viết Unit Test và E2E Test để đảm bảo code hoạt động hoàn hảo, không có lỗi (bug) khi chạy chiến dịch thực tế.
*Write Unit and E2E Tests to ensure flawless code execution with zero bugs during live campaigns.*

**Use Cases:**
- Viết test kiểm tra xem Form đăng ký có bắt lỗi thiếu Email không.
- Test xem API có xử lý đúng khi có 1000 người cùng lúc truy cập không.

**Ví dụ lệnh (Prompt Example):**
```text
/ag:test-driven-development Viết unit test bằng Vitest cho hàm xử lý định dạng số điện thoại Việt Nam trong form đăng ký.
```

**Output mẫu (Expected Output):**
- File code `.test.js` kèm hướng dẫn chạy.

---

## 5. Code Review & Optimization (`/ag:review`)

**Mô tả:** Chuyên gia rà soát mã nguồn. Tìm lỗi bảo mật, tối ưu hóa tốc độ tải trang (Page Speed) và cấu trúc lại code (Refactor).
*Code reviewer. Identify security vulnerabilities, optimize page load speed, and refactor code.*

**Use Cases:**
- Tối ưu hóa file CSS/JS để Landing page tải dưới 2 giây.
- Đánh giá xem đoạn code thu thập dữ liệu có rủi ro bảo mật (XSS, SQL Injection) không.

**Ví dụ lệnh (Prompt Example):**
```text
/ag:review Kiểm tra file index.js này và chỉ ra các điểm có thể tối ưu để trang web chạy mượt hơn trên thiết bị di động.
```

**Output mẫu (Expected Output):**
- Danh sách các lỗi (Bugs) và cảnh báo.
- Code đã được tối ưu.

---

## 6. Technical Documentation (`/ag:document`)

**Mô tả:** Tự động sinh tài liệu kỹ thuật, file README, hoặc hướng dẫn cài đặt API cho đối tác (Partner/Agency).
*Automatically generate technical documentation, README files, or API installation guides for partners/agencies.*

**Use Cases:**
- Tạo tài liệu tích hợp API để gửi cho Agency chạy quảng cáo.
- Viết file README.md hướng dẫn nhân viên mới cài đặt dự án.

**Ví dụ lệnh (Prompt Example):**
```text
/ag:document Viết tài liệu kỹ thuật giải thích cách hoạt động của hệ thống CRM nội bộ dựa trên thư mục source code hiện tại.
```

**Output mẫu (Expected Output):**
- Tài liệu Markdown chuyên nghiệp, dễ hiểu.
