# 🛡️ KJ Studio Marketing - License & Installation Guide

Cảm ơn bạn đã mua **KJ Studio Marketing Dashboard**! Đây là công cụ đắc lực giúp bạn triển khai Marketing bằng hệ thống AI Agents mạnh mẽ nhất.

Để cài đặt và sử dụng phần mềm, bạn cần thiết lập một **GitHub Personal Access Token (PAT)**. Token này hoạt động như một **License Key** để xác thực quyền truy cập của bạn vào hệ thống.

---

## Bước 1: Chấp nhận lời mời tham gia Private Repo

Sau khi thanh toán thành công, chúng tôi đã gửi một lời mời (Invitation) đến tài khoản GitHub của bạn.
1. Đăng nhập vào GitHub.
2. Kiểm tra email hoặc mở link: [https://github.com/kentjuno/antigravitykit-marketing](https://github.com/kentjuno/antigravitykit-marketing).
3. Bấm **Accept Invitation** để tham gia kho lưu trữ của KJ Studio.

*(Nếu bạn chưa nhận được lời mời, vui lòng inbox trực tiếp mã đơn hàng để được hỗ trợ ngay lập tức).*

---

## Bước 2: Tạo GitHub Personal Access Token (PAT)

Token này sẽ thay thế mật khẩu của bạn để cấp quyền cho bộ cài đặt tải Source Code về máy và xác thực ứng dụng.

1. Truy cập vào phần tạo Token của GitHub: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
2. Phần **Note**: Nhập tên dễ nhớ, ví dụ: `KJ Studio Marketing License`.
3. Phần **Expiration**: Chọn `No expiration` (hoặc tùy chỉnh thời hạn bạn muốn).
4. Phần **Select scopes**:
   - Tích chọn ô **`repo`** (Full control of private repositories) - *Đây là quyền bắt buộc để hệ thống tải được mã nguồn về máy.*
5. Cuộn xuống cuối trang và bấm **Generate token**.
6. **Sao chép đoạn mã Token vừa tạo (bắt đầu bằng `ghp_...`)**. Lưu lại an toàn vì GitHub chỉ hiển thị nó 1 lần duy nhất!

---

## Bước 3: Cài đặt vào dự án của bạn

Mở Terminal (hoặc Command Prompt) tại thư mục dự án bạn muốn cài đặt và chạy các lệnh sau:

```bash
# 1. Cài đặt hệ thống lõi CLI của KJ Studio
npm install -g @kjantigravity/cli

# 2. Khởi tạo Marketing Dashboard vào thư mục hiện tại
kj-kit init -k marketing
```

Khi Terminal yêu cầu **License Key / Access Token**, hãy dán mã `ghp_...` mà bạn vừa tạo ở Bước 2 vào và bấm Enter. Hệ thống sẽ tự động tải toàn bộ quy trình và mã nguồn về máy tính của bạn.

---

## Bước 4: Khởi động Dashboard

Sau khi cài đặt thành công, hãy gõ lệnh:

```bash
kj-kit dashboard
```

Hệ thống sẽ mở Marketing Dashboard trên trình duyệt. Tại màn hình Welcome, hãy nhập lại **GitHub PAT** của bạn một lần nữa để xác thực và bẻ khóa toàn bộ các tính năng AI.

---

### 🚨 Lưu ý Quan Trọng (Security Notice)

- **Không chia sẻ Token (PAT):** Token của bạn có giá trị tương đương mật khẩu và được gắn liền với tài khoản GitHub của bạn. Nếu chia sẻ cho người khác, bạn có thể bị mất quyền kiểm soát hoặc bị hệ thống quét và chặn vĩnh viễn (Revoke Access).
- **Hỗ trợ kỹ thuật:** Nếu có bất kỳ vấn đề gì, hãy mở Issues trên trang Github chính thức hoặc liên hệ trực tiếp với đội ngũ KJ Studio.

Chúc bạn chốt deal mỏi tay và tăng x10 hiệu suất cùng KJ Studio Marketing! 🚀
