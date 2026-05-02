---
title: Lệnh: /akm:ads-management
description: "Dành cho người mới: Để mồi khách hàng vào Phễu, bạn không thể chỉ đăng bài lên Fanpage rồi ngồi đợi (vì Facebook "bóp" t"
category: 05-performance-ads
order: 2
lang: vn
---

# Lệnh: /akm:ads-management

## 🎯 Mục đích (What it does)
Dành cho người mới: Để mồi khách hàng vào Phễu, bạn không thể chỉ đăng bài lên Fanpage rồi ngồi đợi (vì Facebook "bóp" tương tác tự nhiên rất nặng). Bạn phải bỏ tiền ra mua quảng cáo (Facebook Ads, Google Ads). 

Skill `/akm:ads-management` biến AI thành một **Chuyên gia Chạy Quảng cáo (Media Buyer)**. Nó sẽ không tự tay vào Facebook bấm nút chạy Ads cho bạn (vì cần kết nối thẻ Visa), nhưng nó sẽ vạch ra cho bạn một **Bản đồ Setup Quảng Cáo** chi tiết đến từng click chuột: Bạn nên chọn mục tiêu gì? Nên Target (Nhắm mục tiêu) vào những ai? Và phân bổ ngân sách 100 USD/ngày ra sao để ra đơn rẻ nhất.

## 🛠️ Cách sử dụng (How to use)
**Cú pháp:** `/akm:ads-management [Nền tảng chạy Ads] cho chiến dịch [Tên chiến dịch]`

**Ví dụ:**
- `/akm:ads-management Lên cấu trúc setup chiến dịch Google Ads tìm kiếm cho dịch vụ sửa ống nước tại Toronto.`
- `/akm:ads-management Hướng dẫn cách phân bổ ngân sách 500 đô cho Facebook Ads bán quần áo mùa đông.`

## 💡 Kịch bản thực tế (Use Case & Demo)

**Context (Bối cảnh):** Bạn đã chuẩn bị xong Video múa chảo (Wave 2) và Bài viết chốt sale. Bây giờ là lúc "Đốt tiền" chạy Facebook Ads cho chiến dịch "The Golden Duo" để lôi kéo dân Markham đến Tiệm Phở Kent Juno Premium. Nhưng giao diện Facebook Ads Manager toàn thông số kỹ thuật phức tạp, nếu setup sai (chọn nhầm mục tiêu) thì sẽ "đốt sạch tiền" mà không thu được tin nhắn nào. Bạn cần AI hướng dẫn setup.

**Lệnh đã gõ:** 
`/akm:ads-management Đóng vai Chuyên gia Chạy Quảng Cáo Facebook (Media Buyer). Hãy hướng dẫn tôi setup chiến dịch Facebook Ads cho chương trình "The Golden Duo" (Tặng nước sâm khi ăn phở) của nhà hàng Pho Kent Juno Premium. Ngân sách: 100 CAD/ngày. Yêu cầu chỉ rõ:
1. Mục tiêu chiến dịch (Campaign Objective) nên chọn cái nào để ra nhiều mã giảm giá nhất?
2. Cách thiết lập Target Audience (Độ tuổi, Bán kính vị trí, Sở thích) để quét đúng tệp "người giàu thích ăn uống" ở Markham.
3. Cách chia ngân sách (A/B Test) cho 2 nhóm quảng cáo.`

**Kết quả thu được (Dự kiến):**
AI sẽ cung cấp một bản thiết kế Setup cực kỳ chuyên nghiệp (bạn chỉ việc nhìn vào màn hình Facebook và làm theo):

> **⚙️ CẤU TRÚC SETUP CHIẾN DỊCH FACEBOOK ADS: THE GOLDEN DUO**
> Ngân sách: 100 CAD / Ngày | Nền tảng: Facebook & Instagram
> 
> **1. Cấp độ Chiến dịch (Campaign Level):**
> - *Mục tiêu (Objective):* Tuyệt đối KHÔNG chọn "Lượt tương tác" (Engagement). Hãy chọn **"Tin nhắn" (Messages) / "Khách hàng tiềm năng" (Lead Generation)**. Vì mục tiêu của chúng ta là ép khách ấn vào Chatbot để lấy Mã VIP.
> 
> **2. Cấp độ Nhóm Quảng Cáo (Ad Set Level) - A/B Testing 2 Nhóm:**
> Chẻ 100 CAD thành 2 nhóm, mỗi nhóm 50 CAD/ngày để xem tệp nào rẻ hơn.
> - **Nhóm 1 (Tệp Rộng - Broad):** Vị trí (Location): Bán kính 10km quanh nhà hàng ở Markham. Độ tuổi: 25 - 55. Không target sở thích. Cứ để AI của Facebook tự tìm người.
> - **Nhóm 2 (Tệp Siêu Sang - Luxury):** Vị trí: Như trên. Độ tuổi: 25 - 55. Sở thích (Interests): Thích "Fine Dining", "Steakhouse", "Kobe Beef", "Luxury lifestyle". 
> 
> **3. Cấp độ Quảng cáo (Ad Level):**
> - Sử dụng Video "Múa chảo" và bài viết AIDA đã chuẩn bị. 
> - Nút kêu gọi hành động (CTA Button): Chọn **"Send Message" (Gửi tin nhắn)**.

## ⚠️ Lưu ý & Mẹo (Pro Tips)
- **Tắt Audience Network:** Luôn dặn AI: *"Có nên tắt mạng Audience Network không?"*. Câu trả lời luôn là CÓ, vì hiển thị quảng cáo ở các ứng dụng rác sẽ làm tốn tiền vô ích.
- **Quy tắc 3 Ngày:** Nếu sau 3 ngày mà giá một tin nhắn (CPL) cao hơn 5 CAD, hãy dừng chiến dịch ngay lập tức và dùng lệnh `/akm:campaign-debugger` để tìm nguyên nhân.
