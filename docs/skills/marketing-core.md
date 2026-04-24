# 🎯 Marketing Core Skills

Danh sách các kỹ năng cốt lõi (Core Skills) của AntigravityKit Marketing giúp bạn tự động hóa toàn bộ quy trình xây dựng thương hiệu, sáng tạo nội dung, và triển khai chiến dịch.

*(Tài liệu song ngữ: Tiếng Việt / English)*

---

## 1. Brand & Voice (`/akm:brand`)

**Mô tả:** Xây dựng Brand Voice, Persona, và Messaging Framework chuẩn xác cho thương hiệu. Đảm bảo mọi nội dung AI tạo ra sau này đều thống nhất 100% với tông giọng của bạn.
*Build Brand Voice, Persona, and Messaging Frameworks. Ensures all future AI content perfectly aligns with your brand's tone.*

**Use Cases:**
- Khởi tạo thương hiệu mới (New brand creation).
- Chuẩn hóa văn phong cho team content (Standardize tone of voice).
- Tạo Brand Guidelines để gửi cho đối tác/agency.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:brand Xây dựng brand voice chuyên nghiệp, sắc sảo và hiện đại cho công ty công nghệ SaaS có tên là TechFlow. Tập trung vào B2B.
```

**Output mẫu (Expected Output):**
- **Brand Archetype:** The Sage (Thông thái) & The Magician (Biến đổi).
- **Tone of Voice:** Quyết đoán (Assertive), Dựa trên dữ liệu (Data-driven), Không sáo rỗng (Jargon-free).
- **Từ vựng nên dùng/không nên dùng (Do's & Don'ts).**
- Tự động lưu file JSON & Markdown vào `assets/brand/`.

---

## 2. Design System (`/akm:design-system`)

**Mô tả:** Khởi tạo toàn bộ hệ thống Design Tokens (Màu sắc, Typography, Spacing). Đây là bước bắt buộc để Marketing Dashboard hiển thị chuẩn màu của bạn.
*Initialize your complete Design Tokens system. This is a required step for the Marketing Dashboard to reflect your brand colors.*

**Use Cases:**
- Tìm bảng màu (color palette) phù hợp với ngành nghề.
- Tạo file CSS variables tự động để dev sử dụng.
- Setup giao diện Dashboard đồng bộ với thương hiệu.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:design-system Tạo bảng màu phong cách cyberpunk, neon tím và đen cho thương hiệu game "NeonStrike".
```

**Output mẫu (Expected Output):**
- Bảng màu HSL tự động tính toán contrast ratio chuẩn WCAG.
- File `assets/design-tokens.css` và `assets/design-tokens.json`.
- Cập nhật tự động tab **Brand Center** trong Dashboard.

---

## 3. Copywriting (`/akm:copywriting`)

**Mô tả:** Viết nội dung bán hàng (Sales copy), Landing page, thư chào hàng chuẩn các framework marketing (AIDA, PAS, BAB).
*Write high-converting sales copy, landing pages, and pitch letters using proven marketing frameworks (AIDA, PAS, BAB).*

**Use Cases:**
- Viết copy cho Landing Page ra mắt sản phẩm.
- Viết kịch bản Telesale hoặc chốt sale qua tin nhắn.
- Tối ưu lại (Rewrite) một đoạn văn bản cho "cuốn" hơn.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:copywriting Dùng framework PAS, viết một bài sale bán khóa học Tiếng Anh giao tiếp cho người đi làm mất gốc. Giọng điệu đồng cảm, thúc giục.
```

**Output mẫu (Expected Output):**
- **Problem:** Nỗi đau sợ họp với Tây, mất cơ hội thăng tiến.
- **Agitate:** Xoáy sâu vào việc làm 5 năm lương không tăng chỉ vì kém ngoại ngữ.
- **Solution:** Giải pháp lộ trình 3 tháng thực chiến.
- **Call-to-action (CTA):** Rõ ràng, tạo hiệu ứng FOMO (Sợ bỏ lỡ).

---

## 4. Content Marketing (`/akm:content-marketing`)

**Mô tả:** Lập chiến lược nội dung dài hạn, vẽ sơ đồ chủ đề (Topic Clusters), và tạo Calendar. Khác với Copywriting (tập trung chốt sale), skill này tập trung vào nuôi dưỡng khách hàng (Nurturing).
*Plan long-term content strategies, build Topic Clusters, and generate Content Calendars focused on lead nurturing.*

**Use Cases:**
- Xây dựng lịch đăng bài đa kênh trong 30 ngày.
- Lên ý tưởng chuỗi bài viết Blog/Podcast giáo dục khách hàng.
- Tổ chức nội dung theo mô hình Pillar - Cluster.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:content-marketing Lên lịch content 2 tuần cho kênh TikTok bán mỹ phẩm thuần chay. Cần 4 video giáo dục và 3 video bán hàng.
```

**Output mẫu (Expected Output):**
- Bảng lịch trình chi tiết (Ngày, Chủ đề, Format, Kênh).
- Gợi ý Hook (Câu mở đầu) cho từng video.
- Phân bổ content theo phễu TOFU (Đầu phễu) - MOFU (Giữa phễu) - BOFU (Cuối phễu).

---

## 5. Tối Ưu SEO (`/akm:seo`)

**Mô tả:** Phân tích từ khóa, cấu trúc heading, viết meta tags, và tối ưu bài viết chuẩn SEO để leo top Google.
*Perform keyword research, outline heading structures, write meta tags, and optimize articles for Google rankings.*

**Use Cases:**
- Nghiên cứu danh sách từ khóa LSI (Latent Semantic Indexing).
- Phân tích search intent (ý định tìm kiếm) của người dùng.
- Tối ưu On-page SEO cho bài blog có sẵn.

**Ví dụ lệnh (Prompt Example):**
```text
/akm:seo Phân tích cụm từ khóa "mua máy lọc không khí" và viết dàn ý chi tiết thẻ H2, H3 để viết bài SEO dài 2000 chữ.
```

**Output mẫu (Expected Output):**
- Danh sách từ khóa chính, từ khóa phụ (LSI).
- Search Intent: Transactional (Muốn mua hàng).
- Cấu trúc Outline: H1 (Title) -> H2 (Lợi ích) -> H3 (Các loại) -> H2 (Kinh nghiệm mua) -> H2 (Top 5 sản phẩm).
- Gợi ý Title Tag & Meta Description giật tít nhưng chuẩn độ dài.

## 6. Social Media Management (/akm:social)

**Mô tả:** Tự động hóa việc tạo hàng loạt bài đăng (posts), kịch bản reels/tiktok, và lập lịch nội dung (content calendar) cho các kênh Facebook, LinkedIn, Twitter, Instagram.
*Automate the creation of bulk posts, reels/tiktok scripts, and content calendars for all social channels.*

**Use Cases:**
- Lên kế hoạch Social Media 30 ngày (30-day content calendar).
- Biến 1 bài blog thành 5 bài post Facebook/LinkedIn đa dạng (Repurpose content).
- Viết kịch bản video ngắn (Short-form video scripts) bắt trend.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:social Viết 5 bài post LinkedIn cho tuần sau về chủ đề "AI trong Marketing", giọng điệu chuyên gia, kết thúc bằng Call-to-Action tương tác.
``

**Output mẫu (Expected Output):**
- 5 bài post hoàn chỉnh kèm Emoji và Hashtag.
- Gợi ý hình ảnh đi kèm (Image prompts).
- Được lưu vào thư mục ssets/social/.

---

## 7. Email Marketing (/akm:email)

**Mô tả:** Chuyên viết các chuỗi email (sequences) như: Nurturing (nuôi dưỡng), Onboarding (chào mừng), Abandoned Cart (bỏ quên giỏ hàng), và Newsletter. Tối ưu hóa Tiêu đề (Subject Line) để tăng tỷ lệ mở (Open Rate).
*Write high-converting email sequences including Nurturing, Onboarding, Abandoned Cart, and Newsletters. Optimizes Subject Lines for high Open Rates.*

**Use Cases:**
- Viết chuỗi 5 email chốt sale cho khóa học online.
- Soạn Newsletter hàng tuần tổng hợp tin tức ngành.
- Viết email xin lỗi/thông báo bảo trì hệ thống.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:email Tạo chuỗi 3 email Welcome Series cho người dùng mới đăng ký dùng thử phần mềm quản lý kho. Mục tiêu là thuyết phục họ nâng cấp lên gói Pro.
``

**Output mẫu (Expected Output):**
- 3 Email (Subject line x 3 option, Body copy, CTA).
- Lưu tại ssets/email/.

---

## 8. Paid Ads Management (/akm:ads-management)

**Mô tả:** Viết nội dung quảng cáo (Ad Copy) tối ưu tỷ lệ click (CTR) cho Facebook Ads, Google Ads, TikTok Ads. Sử dụng các framework tâm lý học như AIDA, PAS.
*Write high-CTR Ad Copy for Facebook, Google, and TikTok Ads using psychological frameworks like AIDA and PAS.*

**Use Cases:**
- Viết 3 mẫu Facebook Ad cho sản phẩm kem chống nắng mùa hè.
- Soạn 5 Headline và 5 Description cho chiến dịch Google Search Ads.
- Viết kịch bản Video Ad 15s cho TikTok.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:ads-management Viết 3 mẫu Facebook Ad copy bán khóa học tiếng Anh giao tiếp cho người đi làm. Dùng framework PAS (Problem-Agitation-Solution).
``

**Output mẫu (Expected Output):**
- 3 biến thể Ad Copy với Text, Headline, Primary Text.
- Gợi ý hình ảnh/video đi kèm.

---

## 9. Marketing Campaign (/akm:campaign)

**Mô tả:** Lập kế hoạch chiến dịch Marketing tổng thể từ A-Z: Xác định mục tiêu, đối tượng, thông điệp chính (Key Message), các giai đoạn (Phases), và dự trù ngân sách/kênh triển khai.
*Plan an end-to-end Marketing Campaign including objectives, target audience, key messages, phases, and channel allocation.*

**Use Cases:**
- Lên kế hoạch ra mắt sản phẩm mới (Product Launch).
- Chiến dịch khuyến mãi Black Friday / Lễ Tết.
- Chiến dịch Re-branding.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:campaign Lập kế hoạch chiến dịch ra mắt tính năng AI mới cho app tài chính, ngân sách 50 triệu, kéo dài 2 tuần. Mục tiêu: 10,000 lượt dùng thử.
``

**Output mẫu (Expected Output):**
- File campaign-plan.md cực chi tiết với Timeline, Kênh phân phối, và KPI.

---

## 10. Conversion Rate Optimization (CRO) (/akm:cro)

**Mô tả:** Phân tích và đưa ra đề xuất tối ưu hóa Tỷ lệ chuyển đổi cho Landing Page, Website, hoặc App. Đề xuất các chiến lược A/B Testing hiệu quả.
*Analyze and recommend optimizations for Landing Pages or Websites to increase Conversion Rates. Propose A/B testing strategies.*

**Use Cases:**
- Sửa lại nội dung nút CTA (Call to Action) để hấp dẫn hơn.
- Cải thiện cấu trúc Landing page bán hàng đang có tỷ lệ thoát (Bounce Rate) cao.
- Đề xuất kịch bản A/B Test cho trang Checkout.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:cro Hãy đưa ra 5 ý tưởng A/B test để tăng tỷ lệ điền form trên trang đăng ký tư vấn Bất động sản.
``

**Output mẫu (Expected Output):**
- Các đề xuất thay đổi về UX/UI và Copywriting.
- Giả thuyết (Hypothesis) cho từng bài Test.

## 11. Affiliate Marketing (/akm:affiliate-marketing)

**Mô tả:** Xây dựng và thiết kế chương trình Affiliate Marketing (Tiếp thị liên kết) để mở rộng quy mô doanh thu thông qua các đối tác.
*Design high-converting Affiliate Marketing programs to scale revenue through partners.*

**Use Cases:**
- Lên cấu trúc hoa hồng (Commission Structure) cho đại lý.
- Viết email tuyển dụng Partner/KOL.
- Viết tài liệu hướng dẫn (Guidelines) cho Affiliate.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:affiliate-marketing Xây dựng chương trình affiliate cho SaaS B2B với mức hoa hồng trọn đời 20%, kèm email mời gọi KOL tham gia.
``

**Output mẫu (Expected Output):**
- Bản kế hoạch Affiliate Program.
- Email template Outreach KOL.

---

## 12. Marketing Analytics (/akm:analytics)

**Mô tả:** Phân tích dữ liệu marketing, lập báo cáo hiệu suất (Performance Report) và tìm ra nguyên nhân/insight từ các chỉ số (Metrics).
*Analyze marketing data, create performance reports, and extract actionable insights from metrics.*

**Use Cases:**
- Viết báo cáo tổng kết chiến dịch tháng.
- Phân tích nguyên nhân CPA (Cost Per Action) tăng vọt.
- Tìm Insight từ file dữ liệu Khách hàng.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:analytics Phân tích nguyên nhân tại sao CTR của quảng cáo Facebook tuần này giảm 30% so với tuần trước dù ngân sách giữ nguyên.
``

**Output mẫu (Expected Output):**
- Báo cáo phân tích (Root Cause Analysis).
- 3 Action steps để cải thiện.

---

## 13. Market Research (/akm:research)

**Mô tả:** Nghiên cứu thị trường, phân tích đối thủ cạnh tranh (Competitor Analysis), và đánh giá xu hướng (Trend Analysis).
*Conduct market research, competitor analysis, and identify emerging trends in the industry.*

**Use Cases:**
- Phân tích điểm mạnh/yếu của 3 đối thủ chính.
- Khảo sát xu hướng hành vi người tiêu dùng ngành F&B.
- Viết kịch bản phỏng vấn khách hàng (Customer Interview).

**Ví dụ lệnh (Prompt Example):**
``text
/akm:research Lập bảng so sánh điểm mạnh yếu của 3 ứng dụng giao đồ ăn lớn nhất Việt Nam hiện nay để tìm ngách cho app mới.
``

**Output mẫu (Expected Output):**
- Bảng so sánh SWOT đối thủ.
- Cơ hội ngách (Niche opportunities) được đề xuất.

---

## 14. A/B Testing Setup (/akm:ab-test-setup)

**Mô tả:** Lên kế hoạch chi tiết cho các bài test A/B trên website, email hoặc quảng cáo để tìm ra phiên bản chiến thắng (Winning variant).
*Plan detailed A/B tests across websites, emails, or ads to determine the winning variant based on statistical significance.*

**Use Cases:**
- Test 2 tiêu đề Landing page khác nhau.
- Test màu sắc nút Mua Hàng.
- Test thời gian gửi Email Newsletter.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:ab-test-setup Lên kế hoạch A/B test cho trang Checkout. Variant A giữ nguyên, Variant B bỏ bớt trường nhập số điện thoại.
``

**Output mẫu (Expected Output):**
- Tài liệu A/B test plan (Metrics, Sample Size, Duration).
- Code/Copy tương ứng cho từng biến thể.

---

## 15. Upsell & Cross-sell (/akm:upsell-maximizer)

**Mô tả:** Tối đa hóa Giá trị vòng đời khách hàng (LTV) bằng cách tạo ra các kịch bản Upsell (Bán thêm) và Cross-sell (Bán chéo) thông minh.
*Maximize Customer Lifetime Value (LTV) by creating intelligent Upsell and Cross-sell scenarios.*

**Use Cases:**
- Viết kịch bản One-Click Upsell sau khi thanh toán.
- Đề xuất các combo sản phẩm mua kèm.
- Viết chuỗi email nhắc nhở mua lại (Replenishment emails).

**Ví dụ lệnh (Prompt Example):**
``text
/akm:upsell-maximizer Thiết kế kịch bản Upsell cho khách hàng vừa mua khóa học Basic (500k). Làm sao để chốt thêm gói Coaching 1-1 (2 triệu).
``

**Output mẫu (Expected Output):**
- Kịch bản Pop-up / Trang cảm ơn (Thank You Page).
- Lời thoại (Script) sales có tỷ lệ chốt cao.

## 16. Gamification Marketing (/akm:gamification-marketing)

**Mô tả:** Đưa các yếu tố trò chơi (điểm thưởng, huy hiệu, bảng xếp hạng) vào hành trình khách hàng để tăng tỷ lệ giữ chân (Retention) và tương tác.
*Incorporate game elements (points, badges, leaderboards) into the customer journey to boost retention and engagement.*

**Use Cases:**
- Lên cơ chế tích điểm Loyalty cho App mua sắm.
- Tạo chiến dịch Vòng Quay May Mắn (Lucky Wheel) ngày lễ.
- Viết kịch bản cấp độ hạng thành viên (Tier System).

**Ví dụ lệnh (Prompt Example):**
``text
/akm:gamification-marketing Thiết kế cơ chế tích điểm và thăng hạng cho quán cafe. Làm sao để khách quay lại mua lần 2, lần 3 nhiều nhất có thể.
``

**Output mẫu (Expected Output):**
- Cơ chế Game Loop chi tiết.
- Tính toán chi phí phần thưởng (Reward Cost).

---

## 17. Pricing Strategy (/akm:pricing-strategy)

**Mô tả:** Nghiên cứu và định giá sản phẩm (Product Pricing) dựa trên giá trị (Value-based), đối thủ cạnh tranh, hoặc chiến lược hớt váng (Skimming).
*Research and develop product pricing strategies based on value, competition, or skimming methods.*

**Use Cases:**
- Lên 3 gói giá (Tiers) cho phần mềm SaaS.
- Tính toán tỷ suất lợi nhuận (Margin) cho sản phẩm vật lý.
- Đề xuất giá khuyến mãi không làm mất định vị thương hiệu.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:pricing-strategy Đề xuất 3 mức giá (Basic, Pro, Enterprise) cho công cụ AI viết content. Dùng hiệu ứng chim mồi (Decoy Effect) để lái khách mua gói Pro.
``

**Output mẫu (Expected Output):**
- Bảng giá chi tiết với các tính năng (Feature list).
- Phân tích tâm lý học định giá (Psychological Pricing).

---

## 18. Product Launch Strategy (/akm:launch-strategy)

**Mô tả:** Lập chiến lược ra mắt sản phẩm mới (Go-To-Market) nhằm tạo tiếng vang và doanh thu bùng nổ trong tuần lễ đầu tiên.
*Develop Go-To-Market and product launch strategies to create buzz and generate explosive revenue in the first week.*

**Use Cases:**
- Lên Timeline 3 giai đoạn: Teasing, Launching, Sustaining.
- Viết kịch bản sự kiện ra mắt (Launch Event Script).
- Lên danh sách các kênh PR cần phủ sóng.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:launch-strategy Lập kế hoạch 30 ngày ra mắt bộ sưu tập thời trang thu đông. Cần chiến thuật Pre-order để thu tiền trước.
``

**Output mẫu (Expected Output):**
- File launch-plan.md với Timeline đếm ngược (T-30, T-7, Launch Day).
- KPI cho từng giai đoạn.

---

## 19. Marketing Psychology (/akm:marketing-psychology)

**Mô tả:** Áp dụng các nguyên lý tâm lý học (như FOMO, Social Proof, Scarcity, Reciprocity) vào nội dung để thôi thúc hành động mua hàng.
*Apply psychological principles (FOMO, Social Proof, Scarcity) to content to drive purchasing actions.*

**Use Cases:**
- Chỉnh sửa câu chữ trang thanh toán để tạo sự khan hiếm (Scarcity).
- Viết kịch bản seeding tạo hiệu ứng đám đông (Bandwagon Effect).
- Cải thiện nội dung chốt sale bằng hiệu ứng mỏ neo (Anchoring).

**Ví dụ lệnh (Prompt Example):**
``text
/akm:marketing-psychology Phân tích và sửa lại nội dung đoạn chốt sale này. Áp dụng kỹ thuật FOMO và Loss Aversion để ép khách mua ngay hôm nay.
``

**Output mẫu (Expected Output):**
- Copywriting mới đã được nhúng tâm lý học.
- Giải thích lý do tại sao nó hiệu quả.

---

## 20. Marketing Ideation (/akm:marketing-ideas)

**Mô tả:** Brainstorm (động não) để đẻ ra hàng loạt ý tưởng viral, campaign "điên rồ", hoặc concept nội dung phá cách (Out-of-the-box).
*Brainstorm viral ideas, crazy campaigns, or out-of-the-box content concepts.*

**Use Cases:**
- Nghĩ 10 concept quay Tiktok viral cho quán ăn.
- Brainstorm ý tưởng Guerrilla Marketing (Marketing du kích).
- Tìm góc nhìn mới (New Angle) để viết bài cho sản phẩm cũ.

**Ví dụ lệnh (Prompt Example):**
``text
/akm:marketing-ideas Cho 5 ý tưởng Marketing du kích (Guerrilla Marketing) với ngân sách 0 đồng để quảng bá ứng dụng đọc sách.
``

**Output mẫu (Expected Output):**
- 5 Concept ý tưởng điên rồ nhưng khả thi.
- Cách triển khai thực tế (Execution Plan).
