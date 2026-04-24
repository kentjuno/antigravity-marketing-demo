# 🎨 AI Creative Skills

Danh sách các kỹ năng Sáng tạo (Creative Skills) giúp bạn tự động hóa việc thiết kế hình ảnh, video, banner, logo và slide thuyết trình chuyên nghiệp.

*(Tài liệu song ngữ: Tiếng Việt / English)*

---

## 1. AI Artist (`/ag:ai-artist`)

**Mô tả:** Tạo hình ảnh chất lượng cao thông qua các model như Flux, Nano Banana, Midjourney. Hỗ trợ nhiều phong cách như Ukiyo-e, Bento grid, cyberpunk, cinematic, 3D, v.v.
*Generate high-quality images using models like Flux and Nano Banana across various styles (Ukiyo-e, Bento grid, cyberpunk, cinematic, etc.).*

**Use Cases:**
- Tạo ảnh minh họa cho bài viết Blog.
- Thiết kế hình nền (Backgrounds) cho Website.
- Tạo concept art cho nhân vật hoặc sản phẩm.

**Ví dụ lệnh (Prompt Example):**
```text
/ag:ai-artist Tạo một bức ảnh phong cách cyberpunk về một thành phố tương lai vào ban đêm, tập trung vào ánh sáng neon và không khí mưa bay.
```

**Output mẫu (Expected Output):**
- Hình ảnh chất lượng cao (định dạng PNG/JPG).
- Lưu tự động vào `assets/images/`.

---

## 2. Banner Design (`/akm:banner-design`)

**Mô tả:** Thiết kế banner cho các chiến dịch quảng cáo, mạng xã hội, hoặc Hero banner cho Website. Tích hợp layout chữ và hình ảnh tỷ lệ chuẩn.
*Design banners for ad campaigns, social media, or website heroes, integrating text layouts and standard aspect ratios.*

**Use Cases:**
- Thiết kế cover Facebook/LinkedIn cho doanh nghiệp.
- Tạo banner quảng cáo Google Display (các kích thước 300x250, 728x90, v.v.).
- Làm Hero Image cho trang chủ Website.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:banner-design Thiết kế banner Facebook Ads cho chiến dịch Black Friday ngành thời trang, phong cách tối giản, tone màu đen đỏ.
```

**Output mẫu (Expected Output):**
- Banner hoàn chỉnh với placeholder cho text (hoặc text thật nếu yêu cầu).
- Lưu vào `assets/banners/`.

---

## 3. Logo Design (`/akm:logo-design`)

**Mô tả:** Phác thảo và thiết kế Logo thương hiệu từ số không. Hỗ trợ các kiểu logo như Wordmark, Lettermark, Pictorial, Abstract, Mascot.
*Draft and design brand logos from scratch, supporting various types like Wordmark, Lettermark, Pictorial, Abstract, and Mascot.*

**Use Cases:**
- Thiết kế logo cho dự án khởi nghiệp (Startup).
- Lên concept Re-branding cho công ty lâu năm.
- Tạo logo phụ (Sub-brand) cho các dòng sản phẩm mới.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:logo-design Thiết kế logo dạng Abstract cho một công ty công nghệ AI tên là "NeuraCore", mang cảm giác hiện đại, tốc độ, dùng màu xanh lam và bạc.
```

**Output mẫu (Expected Output):**
- Nhiều biến thể Logo để lựa chọn.
- Phân tích ý nghĩa hình khối và màu sắc.

---

## 4. YouTube Thumbnail Design (`/akm:youtube-thumbnail-design`)

**Mô tả:** Thiết kế ảnh bìa (Thumbnail) Youtube giật tít, độ tương phản cao, tối ưu hóa CTR (Tỷ lệ click).
*Design high-contrast, click-worthy YouTube thumbnails optimized to maximize Click-Through Rate (CTR).*

**Use Cases:**
- Làm Thumbnail cho video Review sản phẩm công nghệ.
- Thumbnail cho video Podcast (kèm mặt khách mời).
- Thumbnail dạng Before/After cho video hướng dẫn (Tutorial).

**Ví dụ lệnh (Prompt Example):**
```text
/akm:youtube-thumbnail-design Tạo ý tưởng và mockup thumbnail cho video "Cách kiếm 1000$ đầu tiên từ Affiliate". Yêu cầu dùng biểu cảm sốc, font chữ to, màu vàng đen.
```

**Output mẫu (Expected Output):**
- 3 Concept Thumbnail (Kèm prompt tạo ảnh tương ứng).
- Hình ảnh Mockup.

---

## 5. Multimodal Generation (Audio/Video) (`/ag:ai-multimodal`)

**Mô tả:** Tích hợp đa phương thức: Phân tích hình ảnh, tạo video ngắn (Veo 3, Hailuo), tạo giọng nói (TTS) và âm nhạc.
*Multimodal capabilities: analyze media, generate short videos (Veo 3), text-to-speech (TTS), and AI music.*

**Use Cases:**
- Chuyển văn bản thành giọng nói (Voiceover) cho video Tiktok.
- Tạo đoạn video B-Roll 5 giây về thiên nhiên.
- Dùng AI phân tích hình ảnh đối thủ và bóc tách bố cục (Layout analysis).

**Ví dụ lệnh (Prompt Example):**
```text
/ag:ai-multimodal Tạo một đoạn video 5 giây cảnh sóng biển vỗ vào bờ đá lúc hoàng hôn, phong cách cinematic, quay bằng drone.
```

**Output mẫu (Expected Output):**
- Video ngắn định dạng MP4.
- File âm thanh (nếu dùng TTS/Music).

---

## 6. Slide Presentation (`/akm:slides`)

**Mô tả:** Lên cấu trúc và tự động sinh nội dung cho các bài thuyết trình (Pitch Deck, Báo cáo, Webinar). Có thể kết hợp với Design System để xuất ra chuẩn màu.
*Structure and automatically generate content for presentations (Pitch Decks, Reports, Webinars), aligned with your Design System.*

**Use Cases:**
- Làm Pitch Deck gọi vốn (Fundraising).
- Lên dàn ý Slide báo cáo tổng kết cuối năm cho team Marketing.
- Tạo Slide Webinar hướng dẫn sử dụng sản phẩm.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:slides Lên outline 10 slide thuyết trình Pitch Deck cho một app học tiếng Anh bằng AI. Tập trung vào Problem, Solution, Market Size và Business Model.
```

**Output mẫu (Expected Output):**
- Outline chi tiết từng Slide (Tiêu đề, Bullet points, Gợi ý hình ảnh).
- Code format (nếu xuất ra Markdown/HTML presentations).

---

## 7. UI/UX Concept Designer (`/akm:ui-ux-designer`)

**Mô tả:** Thiết kế nhanh các giao diện Website, Landing Page hoặc App (Wireframe/Mockup) dựa trên các nguyên lý UX tốt nhất.
*Rapidly design Website, Landing Page, or App interfaces (Wireframes/Mockups) based on UX best practices.*

**Use Cases:**
- Lên wireframe cho trang chủ (Homepage) mới.
- Thiết kế giao diện luồng thanh toán (Checkout flow).
- Tạo concept App giao đồ ăn.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:ui-ux-designer Phác thảo wireframe cho trang Landing page bán khóa học Yoga. Gồm các section: Hero, Lợi ích, Testimonials, Bảng giá, và FAQ.
```

**Output mẫu (Expected Output):**
- Cấu trúc trang (Page Structure) chi tiết.
- Bản vẽ mockup hoặc code HTML/CSS cơ bản.
