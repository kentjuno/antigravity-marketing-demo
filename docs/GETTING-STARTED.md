# 🚀 GETTING STARTED: Bắt Đầu Với AntigravityKit Marketing

Chào mừng bạn đến với **KJ-AntigravityKit (Phiên bản Marketing)**! Dưới đây là hướng dẫn 5 phút để bạn nắm rõ toàn bộ hệ thống và bắt đầu sử dụng ngay lập tức.

---

## 1. 🏗️ Kiến Trúc Hệ Thống (Mọi Thứ Nằm Ở Đâu?)

Khi bạn cài đặt thành công, bộ công cụ đã thêm một số tài nguyên quan trọng vào thư mục dự án của bạn:

- **`.antigravity/`**: Trái tim của hệ thống. Chứa toàn bộ "não bộ" (rules) và định nghĩa của 130+ Marketing Skills. **Không được xóa thư mục này!**
- **`assets/`**: Nơi lưu trữ tự động mọi kết quả bạn tạo ra (văn bản, thiết kế, token, v.v.). Bạn có thể xem trực quan qua Dashboard.
- **`docs/`**: Chứa toàn bộ tài liệu hướng dẫn (như file bạn đang đọc).

---

## 2. ⚡ Cách Đọc Lệnh `/akm:` và `/ag:`

Khi mở AI Chat (Cursor/Windsurf) và gõ dấu `/`, bạn sẽ thấy danh sách lệnh chia làm 2 loại:

1. **`/akm:[tên-lệnh]` (Core Knowledge Marketing)**
   - Các kỹ năng chuyên sâu về Marketing.
   - Ví dụ: `/akm:seo`, `/akm:copywriting`, `/akm:campaign`, `/akm:brand`

2. **`/ag:[tên-lệnh]` (Antigravity General)**
   - Các kỹ năng AI đa phương tiện, lập trình và năng suất chung.
   - Ví dụ: `/ag:ai-artist`, `/ag:plan`, `/ag:slides`

> [!TIP]
> **Pro Tip:** Đừng chỉ gõ tên lệnh rồi Enter! Hãy gõ tên lệnh kèm yêu cầu cụ thể (VD: `/akm:copywriting Viết 3 bài post Facebook bán áo thun mùa hè`), kết quả sẽ chính xác hơn gấp 10 lần.

---

## 3. 🖥️ Hướng Dẫn Sử Dụng Marketing Dashboard

Dashboard là giao diện Control Center giúp bạn quản lý trực quan toàn bộ tài nguyên thay vì phải mò mẫm trong các thư mục.

**Cách mở:**
Mở terminal trong thư mục dự án của bạn và gõ:
```bash
kj-kit dashboard
```
Sau vài giây, trình duyệt sẽ tự động mở tại `http://localhost:5173`.

**Các tính năng chính:**
- 🎨 **Brand Center:** Hiển thị Design Tokens (Màu sắc, Font) và Brand Guidelines (Voice, Persona).
- 📁 **Assets Hub:** Xem trước nhanh mọi file kết quả (Markdown, Code, Hình ảnh) đã được tạo ra bởi AI.
- ⚡ **Skills Catalog:** Danh sách 130+ lệnh. Bạn có thể xem chi tiết và copy nhanh lệnh vào clipboard.
- 📖 **Docs:** Nơi bạn đọc các tài liệu hướng dẫn (chính là Tab bạn đang xem).

---

## 4. 🎯 Top 5 Lệnh Đầu Tiên Bạn Nên Thử Ngay

Để quen với hệ thống, hãy thử copy-paste 5 lệnh này vào AI chat của bạn:

1. **Lên Plan Marketing:**
   ```
   /akm:marketing-planning Lên kế hoạch marketing 30 ngày ra mắt sản phẩm [Tên sản phẩm] ngân sách 50tr
   ```
2. **Nghiên Cứu Khách Hàng:**
   ```
   /akm:persona Xây dựng chân dung khách hàng mục tiêu cho [Ngành nghề của bạn]
   ```
3. **Viết Bài Social:**
   ```
   /akm:social Viết 5 bài đăng Facebook viral về [Chủ đề]
   ```
4. **Tạo Hình Ảnh Quảng Cáo:**
   ```
   /ag:ai-artist Tạo một bức ảnh phong cách minimalist quảng cáo cho [Sản phẩm]
   ```
5. **Cứu Hộ Khi Bí Ý Tưởng:**
   ```
   /ag:brainstorm Đang bí idea làm content cho tuần sau, hãy cho 10 ý tưởng đột phá
   ```

---

## 5. 🎨 Bước Quan Trọng Nhất: Thiết Lập Brand Center

Hệ thống cần biết **"Bạn là ai"** để viết content và làm thiết kế chuẩn nhất.

**Hãy làm ngay 2 lệnh này (chỉ cần làm 1 lần):**

```text
/akm:design-system Tạo toàn bộ hệ thống màu sắc và font chữ cho thương hiệu: [Tên thương hiệu]
```

```text
/akm:brand Xây dựng brand voice và guidelines đầy đủ cho: [Tên thương hiệu]
```

Sau khi AI chạy xong, hãy quay lại **Marketing Dashboard** và F5 (Refresh). Bạn sẽ thấy điều kỳ diệu ở tab **Brand**!

---

## 6. ❓ FAQ (Câu Hỏi Thường Gặp)

> **Hỏi: Dashboard báo lỗi 404 khi tôi mở file trong Assets?**
> **Đáp:** Hãy chắc chắn bạn đang chạy lệnh `kj-kit dashboard` từ đúng thư mục gốc của dự án. Nếu vẫn lỗi, thử restart lại server bằng cách Ctrl+C và chạy lại lệnh.

> **Hỏi: AI không chịu làm theo form tôi muốn?**
> **Đáp:** Bạn có quyền chửi nó! Gõ thêm: *"Bạn đang làm sai format, hãy vào `.antigravity/rules` đọc lại luật của kỹ năng này ngay"*.

> **Hỏi: Tôi muốn học chi tiết từng lệnh thì sao?**
> **Đáp:** Hãy xem menu bên trái trong tab **Docs** này. Các lệnh được chia theo nhóm: Marketing Core, AI Creative, Productivity và Tech. Mọi bí mật đều nằm ở đó!
