import type { GuideArticleDetail } from "./types";

export const guideArticles: Record<string, GuideArticleDetail> = {
  "tien-dien-dung-gia": {
    slug: "tien-dien-dung-gia",
    title: "Tiền điện: giá đúng là bao nhiêu, và cách bắt lỗi hoá đơn",
    description: "Nhà nước quy định 6 bậc giá bán lẻ. Chủ trọ thu 4.000–5.000đ/kWh là thu vượt khung, và có mức phạt cụ thể cho việc đó.",
    readingMinutes: 7,
    category: "Chi phí",
    stageTitle: "Trước khi đi tìm",
    hasCalculator: true,
    stats: [
      { value: "1.984đ", label: "bậc 1 (0–50 kWh)" },
      { value: "2.380đ", label: "bậc 3 — mức áp khi chủ trọ không kê khai người ở" },
      { value: "4 người", label: "= 1 định mức hộ" },
      { value: "20–30 triệu", label: "mức phạt chủ trọ thu vượt giá" },
    ],
    lead: "Đây là khoản người thuê trọ bị thu vượt nhiều nhất, vì hầu như không ai biết giá đúng. Giá điện sinh hoạt không do chủ nhà tự đặt — nó là giá bán lẻ Nhà nước ban hành, chia 6 bậc thang, và chủ trọ chỉ là người thu hộ theo luật.",
    sections: [
      {
        title: "Sáu bậc giá bán lẻ điện sinh hoạt",
        paragraphs: [
          "Áp dụng theo Quyết định 1279/QĐ-BCT. Càng dùng nhiều, đơn giá bậc sau càng cao — nhưng chỉ phần kWh vượt bậc mới tính giá cao, không phải nhân cào bằng cả hoá đơn.",
        ],
        table: {
          headers: ["Bậc", "Số điện dùng trong tháng", "Đơn giá (đ/kWh chưa VAT)"],
          rows: [
            ["Bậc 1", "0 – 50 kWh", "1.984 đ"],
            ["Bậc 2", "51 – 100 kWh", "2.050 đ"],
            ["Bậc 3", "101 – 200 kWh", "2.380 đ"],
            ["Bậc 4", "201 – 300 kWh", "2.998 đ"],
            ["Bậc 5", "301 – 400 kWh", "3.350 đ"],
            ["Bậc 6", "Từ 401 kWh trở lên", "3.460 đ"],
          ],
        },
      },
      {
        title: "Điều kiện để bạn được hưởng giá bậc thang",
        paragraphs: [
          "Theo Thông tư 60/2025/TT-BCT, bạn được tính giá điện sinh hoạt theo bậc khi đáp ứng các điều kiện sau:",
        ],
        list: [
          "Hợp đồng thuê nhà có thời hạn từ 12 tháng trở lên và có đăng ký tạm trú tại địa chỉ đó.",
          "Cứ 4 người thuê (có tạm trú) được tính là 1 hộ gia đình sử dụng điện để cấp 1 định mức bậc thang.",
          "Nếu có 1 người ở lẻ được tính 1/4 định mức, 2 người tính 2/4 định mức, 3 người tính 3/4 định mức.",
        ],
      },
      {
        title: "Nếu chủ trọ không kê khai đủ người ở",
        paragraphs: [
          "Trường hợp chủ trọ không kê khai hoặc người thuê dưới 12 tháng, ngành điện lực quy định áp dụng giá bán lẻ điện sinh hoạt của Bậc 3 (2.380 đ/kWh chưa VAT) cho toàn bộ số điện dùng. Chủ nhà KHÔNG ĐƯỢC tự ý thu 4.000đ hay 5.000đ/kWh.",
        ],
        callout: {
          type: "warning",
          text: "Chủ nhà thu 4.000đ - 5.000đ/kWh là thu vượt quy định nhà nước. Khoản tiền chênh lệch này có thể lên tới 300.000đ - 600.000đ mỗi tháng cho một phòng dùng máy lạnh.",
        },
      },
      {
        title: "Chủ trọ thu vượt giá thì bị xử lý ra sao?",
        paragraphs: [
          "Theo Điều 12 Nghị định 134/2013/NĐ-CP (sửa đổi bổ sung bởi Nghị định 17/2022/NĐ-CP), hành vi thu tiền điện của người thuê nhà cao hơn giá quy định bị phạt tiền từ 20.000.000 đ đến 30.000.000 đ và buộc hoàn trả toàn bộ số tiền chênh lệch thu bất hợp pháp cho người thuê.",
        ],
      },
      {
        title: "Cách kiểm tra hoá đơn của bạn trong 3 phút",
        list: [
          "Bước 1: Chụp ảnh đồng hồ điện vào ngày chốt số (ghi rõ ngày giờ và chỉ số kWh).",
          "Bước 2: Lấy chỉ số mới trừ chỉ số cũ để ra lượng điện thực dùng trong tháng.",
          "Bước 3: Sử dụng công cụ tính bên dưới hoặc đối chiếu với mức giá trần 2.380đ (chưa VAT) để biết số tiền chuẩn xác.",
        ],
      },
    ],
    redFlags: [
      "Chủ trọ không cho xem đồng hồ điện riêng hoặc đồng hồ quay tít mù dù không bật thiết bị nào.",
      "Tính cào bằng 4.500đ - 5.000đ/kWh mà không có bất kỳ văn bản hay thỏa thuận rõ ràng nào.",
      "Từ chối đăng ký tạm trú cho khách thuê nhằm trốn khai báo định mức điện.",
    ],
    landlordQuestions: [
      "Phòng có đồng hồ điện riêng không? Cho em xem chỉ số hiện tại được không?",
      "Anh/chị đã kê khai số người ở với điện lực chưa? Phòng em được tính mấy định mức?",
      "Giá điện tính theo bậc thang nhà nước hay giá cố định? Nếu cố định thì bao nhiêu một số?",
    ],
    legalBasis: [
      "Quyết định 1279/QĐ-BCT về biểu giá bán lẻ điện sinh hoạt.",
      "Thông tư 60/2025/TT-BCT hướng dẫn thực hiện giá bán điện cho người thuê trọ.",
      "Nghị định 17/2022/NĐ-CP sửa đổi Nghị định xử phạt vi phạm hành chính trong lĩnh vực điện lực.",
    ],
    relatedSlugs: ["tien-nuoc-va-phi-dich-vu", "ngan-sach-that", "hop-dong-thue-nha"],
  },

  "dat-coc-an-toan": {
    slug: "dat-coc-an-toan",
    title: "Đặt cọc: luật nói gì, và giấy cọc phải có gì",
    description: "Cọc giữ chỗ là khoản dễ mất nhất. Nắm rõ Điều 328 Bộ luật Dân sự và những nội dung bắt buộc phải có trong giấy đặt cọc.",
    readingMinutes: 6,
    category: "Đặt cọc",
    stageTitle: "Trước khi đi tìm",
    stats: [
      { value: "Điều 328", label: "Bộ luật Dân sự 2015 quy định đặt cọc" },
      { value: "Gấp đôi", label: "mức chủ nhà phải trả nếu huỷ cam kết" },
      { value: "100%", label: "phải chuyển khoản có nội dung rõ ràng" },
      { value: "0đ", label: "không đặt cọc nếu chưa xem phòng thật" },
    ],
    lead: "Tiền đặt cọc là khoản tranh chấp phổ biến nhất khi thuê phòng. Nhiều bạn sinh viên hoặc người mới đi làm chuyển cọc vội chỉ qua tin nhắn mạng xã hội rồi bị chặn số, hoặc khi dọn vào thì phòng khác xa ảnh quảng cáo.",
    sections: [
      {
        title: "Luật quy định thế nào về đặt cọc?",
        paragraphs: [
          "Theo Điều 328 Bộ luật Dân sự 2015:",
          "• Nếu hợp đồng được giao kết, thực hiện thì tài sản đặt cọc được trả lại cho bên đặt cọc hoặc được trừ để thực hiện nghĩa vụ trả tiền.",
          "• Nếu bên đặt cọc từ chối giao kết, thực hiện hợp đồng thì tài sản đặt cọc thuộc về bên nhận đặt cọc.",
          "• Nếu bên nhận đặt cọc từ chối giao kết, thực hiện hợp đồng thì phải trả cho bên đặt cọc tài sản đặt cọc VÀ MỘT KHOẢN TIỀN TƯƠNG ĐƯƠNG GIÁ TRỊ TÀI SẢN ĐẶT CỌC (tức là đền cọc gấp đôi), trừ trường hợp có thoả thuận khác.",
        ],
      },
      {
        title: "Giấy biên nhận cọc tối thiểu phải có những gì?",
        list: [
          "Họ tên, CCCD, số điện thoại, địa chỉ thường trú của cả người cho thuê và người thuê.",
          "Địa chỉ chính xác của phòng cho thuê (số nhà, tầng, số phòng).",
          "Số tiền đặt cọc (bằng số và bằng chữ), ngày giờ nhận cọc.",
          "Mức giá thuê đã chốt hằng tháng (để tránh việc dọn vào bị tăng giá).",
          "Ngày chính thức ký hợp đồng và nhận phòng.",
          "Thời hạn và điều kiện hoàn cọc khi kết thúc hợp đồng.",
        ],
      },
      {
        title: "Chuyển khoản có nội dung — Đừng đưa tiền mặt trao tay",
        paragraphs: [
          "Khi đặt cọc, ưu tiên chuyển khoản ngân hàng chính chủ của người đứng tên sở hữu hoặc được ủy quyền hợp pháp. Nội dung chuyển khoản ghi rõ: 'Nguyen Van A dat coc phong 302 so 123 duong XYZ'. Đây là bằng chứng pháp lý vững chắc trước pháp luật.",
        ],
      },
    ],
    redFlags: [
      "Chủ nhà hối thúc: 'Chuyển cọc ngay trong 15 phút kẻo có người khác thuê mất'.",
      "Tài khoản nhận tiền cọc là tài khoản game, ví ảo hoặc tên không trùng với người dẫn xem phòng.",
      "Giấy nhận cọc ghi chung chung: 'Cọc giữ phòng không hoàn lại trong mọi trường hợp'.",
    ],
    landlordQuestions: [
      "Cọc bao nhiêu tháng, và trả lại vào lúc nào sau khi em dọn ra?",
      "Những trường hợp nào bị trừ tiền cọc? Mức khấu trừ tính ra sao?",
      "Nếu em đến ngày nhận phòng mà phòng chưa sẵn sàng hoặc không đúng cam kết thì đền cọc thế nào?",
    ],
    legalBasis: ["Điều 328 Bộ luật Dân sự 2015 về biện pháp bảo đảm đặt cọc."],
    relatedSlugs: ["nhan-dien-lua-dao", "hop-dong-thue-nha", "don-ra-lay-lai-coc"],
  },

  "tam-tru-vneid": {
    slug: "tam-tru-vneid",
    title: "Đăng ký tạm trú: 30 ngày, làm trên VNeID, và vì sao nó đáng tiền",
    description: "Đăng ký tạm trú không chỉ để tránh bị phạt 500.000–1.000.000đ mà còn để được hưởng giá điện bậc thang và bảo đảm an ninh.",
    readingMinutes: 5,
    category: "Pháp lý",
    stageTitle: "Sau khi dọn vào",
    stats: [
      { value: "30 ngày", label: "hạn chót đăng ký kể từ ngày chuyển đến" },
      { value: "0 đồng", label: "lệ phí làm online qua Cổng DVC / VNeID" },
      { value: "500k–1tr", label: "mức phạt nếu không đăng ký tạm trú" },
      { value: "Tiết kiệm", label: "đủ điều kiện tính định mức điện sinh hoạt" },
    ],
    lead: "Rất nhiều người đi thuê trọ ngại làm thủ tục tạm trú vì nghĩ rườm rà. Thực tế từ khi tích hợp dịch vụ công trên VNeID và Cổng Dịch vụ công Quốc gia, bạn có thể tự nộp hồ sơ online chỉ trong 10 phút ngay trên điện thoại.",
    sections: [
      {
        title: "Ai có trách nhiệm đăng ký tạm trú và hạn trong bao lâu?",
        paragraphs: [
          "Theo Điều 27 Luật Cư trú 2020, công dân đến sinh sống tại chỗ ở hợp pháp ngoài phạm vi đơn vị hành chính cấp xã nơi đã đăng ký thường trú từ 30 ngày trở lên phải đăng ký tạm trú.",
          "Thời hạn đăng ký: Trong vòng 30 ngày kể từ ngày đến chỗ ở mới. Chủ nhà hoặc người thuê nhà đều có thể đứng ra nộp hồ sơ.",
        ],
      },
      {
        title: "Vì sao nhất định phải làm tạm trú?",
        list: [
          "Được cấp định mức điện sinh hoạt bậc thang (tiết kiệm hàng trăm nghìn đồng mỗi tháng).",
          "Tránh bị xử phạt vi phạm hành chính từ 500.000 đ đến 1.000.000 đ theo Nghị định 144/2021/NĐ-CP.",
          "Cần thiết cho các thủ tục: làm hộ chiếu, đăng ký xe máy biển số nơi tạm trú, mua bảo hiểm y tế, xin việc làm.",
        ],
      },
      {
        title: "Quy trình đăng ký tạm trú trên VNeID hoặc Dịch vụ công",
        list: [
          "Bước 1: Chuẩn bị ảnh chụp CCCD gắn chip và ảnh chụp Hợp đồng thuê nhà có chữ ký 2 bên.",
          "Bước 2: Mở app VNeID (đã kích hoạt mức 2) -> Thủ tục hành chính -> Đăng ký tạm trú.",
          "Bước 3: Điền địa chỉ phòng trọ, thông tin chủ nhà và đính kèm ảnh hợp đồng thuê.",
          "Bước 4: Công an xã/phường tiếp nhận và trả kết quả điện tử trong 3 ngày làm việc.",
        ],
      },
    ],
    redFlags: [
      "Chủ trọ thu phí làm tạm trú 300.000đ - 500.000đ (nhà nước không thu phí đăng ký qua cổng dịch vụ công).",
      "Chủ trọ kiên quyết không cho khách thuê làm tạm trú (thường do nhà xây trái phép hoặc trốn thuế).",
    ],
    landlordQuestions: [
      "Em tự đăng ký tạm trú ở đây trên VNeID được không? Anh/chị gửi em thông tin chủ hộ để em khai nhé?",
      "Nhà mình đã kê khai danh sách người ở tạm trú với công an khu vực và điện lực chưa?",
    ],
    legalBasis: [
      "Điều 27, Điều 28 Luật Cư trú 2020.",
      "Nghị định 144/2021/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực an ninh trật tự, cư trú.",
    ],
    relatedSlugs: ["tien-dien-dung-gia", "hop-dong-thue-nha", "don-ra-lay-lai-coc"],
  },

  "hop-dong-thue-nha": {
    slug: "hop-dong-thue-nha",
    title: "Hợp đồng thuê nhà: 12 điều khoản phải có, và điều luật ít người biết",
    description: "Hợp đồng thuê nhà không bắt buộc phải công chứng, nhưng cần có đủ 12 điều khoản then chốt để bảo vệ tiền cọc và quyền lợi của bạn.",
    readingMinutes: 8,
    category: "Pháp lý",
    stageTitle: "Trước khi dọn vào",
    stats: [
      { value: "Điều 164", label: "Luật Nhà ở 2023 — thuê nhà không bắt buộc công chứng" },
      { value: "12", label: "điều khoản cốt tử phải ghi rõ trong hợp đồng" },
      { value: "30 ngày", label: "thời hạn báo trước chuẩn khi chuyển đi" },
      { value: "2 bản", label: "ký tươi, mỗi bên giữ một bản có giá trị như nhau" },
    ],
    lead: "Rất nhiều người đi thuê chỉ ký hợp đồng qua loa theo tờ giấy photocopy sẵn của chủ nhà mà không đọc kỹ các điều khoản gài bẫy. Đến khi phát sinh hỏng hóc hoặc trả phòng mới ngỡ ngàng vì bị trừ cọc vô lý.",
    sections: [
      {
        title: "Hợp đồng thuê nhà có bắt buộc công chứng không?",
        paragraphs: [
          "Theo Điều 164 Luật Nhà ở 2023, hợp đồng cho thuê nhà ở giữa cá nhân với cá nhân KHÔNG BẮT BUỘC phải công chứng hay chứng thực. Hợp đồng chỉ cần lập thành văn bản và có chữ ký đầy đủ của hai bên là đã có hiệu lực pháp luật.",
        ],
      },
      {
        title: "Mười hai điều khoản bắt buộc phải có",
        list: [
          "1. Thông tin định danh của bên cho thuê và bên thuê (kèm số CCCD, ngày cấp).",
          "2. Địa chỉ cụ thể phòng thuê và trang thiết bị đi kèm.",
          "3. Thời hạn thuê (ngày bắt đầu và ngày kết thúc).",
          "4. Giá thuê phòng cố định và phương thức thanh toán (chuyển khoản, ngày nộp hằng tháng).",
          "5. Quy định về việc tăng giá: Trong thời hạn hợp đồng, giá thuê có được tăng không?",
          "6. Tiền đặt cọc và điều kiện hoàn trả cọc (sau bao nhiêu ngày kể từ ngày bàn giao trả phòng).",
          "7. Đơn giá điện, nước, internet, phí vệ sinh và cách thức tính.",
          "8. Trách nhiệm sửa chữa hư hỏng: Hư hỏng do sử dụng tự nhiên ai chịu? Hư hỏng do người thuê ai chịu?",
          "9. Quyền riêng tư: Chủ nhà có được tự ý mở cửa vào phòng khi khách thuê vắng mặt không?",
          "10. Điều kiện đơn phương chấm dứt hợp đồng và thời hạn báo trước (chuẩn là 30 ngày).",
          "11. Trách nhiệm hỗ trợ đăng ký tạm trú của bên cho thuê.",
          "12. Chữ ký rõ ràng của cả 2 bên tại từng trang hoặc trang cuối.",
        ],
      },
    ],
    redFlags: [
      "Hợp đồng có điều khoản: 'Chủ nhà có quyền tăng giá thuê bất kỳ lúc nào nếu giá cả thị trường biến động'.",
      "Điều khoản: 'Bên thuê chuyển đi trước hạn mất 100% tiền cọc dù có báo trước'.",
      "Chủ nhà giữ cả 2 bản hợp đồng và không chịu giao lại cho bạn 1 bản gốc.",
    ],
    landlordQuestions: [
      "Cho em xin mẫu hợp đồng đọc trước 1 ngày để xem kỹ điều khoản trước khi ký được không?",
      "Nếu em có việc đột xuất cần chuyển đi sớm thì báo trước bao lâu để nhận lại đủ cọc?",
      "Các thiết bị như máy lạnh, bình nóng lạnh nếu hỏng do hao mòn tự nhiên thì ai trả chi phí sửa?",
    ],
    legalBasis: [
      "Điều 472 đến Điều 482 Bộ luật Dân sự 2015 về Hợp đồng thuê tài sản.",
      "Điều 163, Điều 164 Luật Nhà ở 2023.",
    ],
    relatedSlugs: ["dat-coc-an-toan", "ban-giao-nhan-phong", "don-ra-lay-lai-coc"],
  },

  "an-toan-chay-no": {
    slug: "an-toan-chay-no",
    title: "An toàn cháy nổ trong nhà trọ: kiểm gì, và tiêu chuẩn nhà trọ phải đạt",
    description: "Nhà trọ phải có lối thoát nạn thứ 2, khu sạc xe điện an toàn và bình chữa cháy kiểm định. Hướng dẫn kiểm tra an toàn PCCC trong 15 phút.",
    readingMinutes: 6,
    category: "An toàn",
    stageTitle: "Đi xem phòng",
    stats: [
      { value: "4 m²", label: "diện tích sàn tối thiểu cho mỗi người ở" },
      { value: "Lối thoát 2", label: "bắt buộc phải có ngoài cầu thang chính" },
      { value: "Khu sạc riêng", label: "cho xe đạp điện, xe máy điện" },
      { value: "Bình PCCC", label: "phải còn áp suất (kim ở vạch xanh)" },
    ],
    lead: "Sau nhiều sự cố cháy nổ nhà trọ thương tâm tại các đô thị lớn, an toàn PCCC là tiêu chí sinh mạng bạn phải đặt lên hàng đầu khi đi tìm phòng, trước cả vị trí và giá cả.",
    sections: [
      {
        title: "Tiêu chuẩn an toàn PCCC nhà trọ phải đạt",
        list: [
          "Có ít nhất 2 lối thoát nạn (cầu thang bộ thoát hiểm hoặc thang sắt ngoài trời, ban công có cửa thoát mở ra không bị hàn lồng cọp bịt kín).",
          "Khu vực để xe tầng trệt phải ngăn cách với sảnh cầu thang bằng vách chống cháy hoặc cửa chống cháy.",
          "Hệ thống điện sạc xe điện phải có atomat chống quá tải riêng và ngắt tự động vào ban đêm.",
          "Mỗi tầng có ít nhất 1-2 bình chữa cháy xách tay (bột hoặc khí CO2) còn hạn sử dụng.",
        ],
      },
      {
        title: "Sáu bước tự kiểm tra an toàn khi đến xem phòng",
        list: [
          "1. Nhìn ban công: Có bị rào 'chuồng cọp' kín mít không? Có cửa thoát hiểm mở ra ngoài không?",
          "2. Kiểm tra bình chữa cháy: Kim đồng hồ đo áp suất có nằm ở vạch XANH không? Nếu ở vạch ĐỎ là bình đã mất áp suất.",
          "3. Xem cầu thang thoát hiểm: Có bị để đồ đạc, xe cộ, thùng xốp chắn lối đi không?",
          "4. Kiểm tra dây điện tầng trệt: Dây điện có đi vào ống gen chống cháy hay chằng chịt như mạng nhện?",
          "5. Xem khu vực sạc xe máy điện: Có thiết bị ngắt điện riêng khi pin sạc đầy không?",
          "6. Hỏi về chuông báo cháy: Nhà trọ có lắp đầu báo khói độc lập hoặc chuông báo cháy toàn nhà không?",
        ],
      },
    ],
    redFlags: [
      "Nhà nhiều tầng không có ban công hoặc toàn bộ ban công bị hàn khung sắt chết không có lối thoát.",
      "Tầng trệt nhét chật kín 40-50 xe máy bao vây kín chân cầu thang bộ duy nhất.",
      "Không thấy bất kỳ một bình chữa cháy nào ở các hành lang.",
    ],
    landlordQuestions: [
      "Nếu xảy ra cháy ở tầng trệt thì người ở tầng trên thoát nạn bằng đường nào?",
      "Nhà mình có chỗ cắm sạc xe điện riêng và hẹn giờ ngắt không?",
      "Bình chữa cháy để ở vị trí nào và có ai bảo trì định kỳ không?",
    ],
    legalBasis: [
      "Chỉ thị 19/CT-TTg về tăng cường công tác phòng cháy, chữa cháy đối với nhà ở nhiều tầng, nhà trọ.",
      "Tiêu chuẩn Quốc gia TCVN 3890:2023 về trang bị PCCC cho nhà và công trình.",
    ],
    relatedSlugs: ["di-xem-phong-25-phut", "ngan-sach-that", "hop-dong-thue-nha"],
  },

  "tien-nuoc-va-phi-dich-vu": {
    slug: "tien-nuoc-va-phi-dich-vu",
    title: "Tiền nước và các khoản phí: cái nào có khung, cái nào tự thoả thuận",
    description: "Nước có quy định định mức nhưng phí dịch vụ thì hoàn toàn tự thoả thuận — cần liệt kê minh bạch vào hợp đồng để không bị phát sinh chi phí ẩn.",
    readingMinutes: 5,
    category: "Chi phí",
    stageTitle: "Trước khi đi tìm",
    stats: [
      { value: "4 người", label: "= 1 hộ định mức dùng nước" },
      { value: "100%", label: "phí dịch vụ phải ghi rõ trên giấy tờ" },
      { value: "100–150k", label: "mức phí gửi xe máy phổ biến" },
      { value: "30–50k", label: "phí vệ sinh, rác sinh hoạt mỗi tháng" },
    ],
    lead: "Nhiều người đi thuê trọ thấy tiền phòng đề 3 triệu rất rẻ, nhưng đến cuối tháng cộng thêm tiền nước tính 'vo', tiền wifi, tiền thang máy, phí dọn rác, tiền quản lý... hoá đơn vọt lên gần 4.5 triệu đồng.",
    sections: [
      {
        title: "Quyền của bạn về giá nước sinh hoạt",
        paragraphs: [
          "Giá nước sạch do UBND tỉnh/thành phố ban hành biểu giá. Giống như điện, người thuê trọ có hợp đồng thuê từ 12 tháng trở lên và có đăng ký tạm trú được cấp định mức nước sinh hoạt (thường là 4m³/người/tháng theo giá bậc thấp).",
          "Nếu chủ trọ thu theo đầu người, mức phổ biến tại TP.HCM và Hà Nội dao động từ 80.000đ đến 120.000đ/người/tháng. Nếu thu quá 150.000đ/người thì bạn nên đề nghị lắp đồng hồ nước riêng.",
        ],
      },
      {
        title: "Các khoản phí dịch vụ phát sinh phổ biến cần làm rõ",
        table: {
          headers: ["Khoản phí", "Mức thị trường hợp lý", "Lưu ý"],
          rows: [
            ["Gửi xe máy", "100.000 – 150.000 đ/xe/tháng", "Phòng được để tối đa mấy xe?"],
            ["Wifi / Internet", "50.000 – 100.000 đ/phòng hoặc miễn phí", "Tốc độ mạng có ổn định giờ cao điểm?"],
            ["Thang máy", "50.000 – 100.000 đ/người/tháng", "Phòng tầng thấp có phải chịu phí không?"],
            ["Vệ sinh hành lang & rác", "30.000 – 50.000 đ/phòng/tháng", "Rác để đâu và xe rác lấy lúc nào?"],
            ["Máy giặt chung", "50.000 – 100.000 đ/người/tháng", "Bao nhiêu phòng dùng chung 1 máy?"],
          ],
        },
      },
    ],
    redFlags: [
      "Quảng cáo: 'Bao trọn chi phí dịch vụ' nhưng khi ký hợp đồng lại phụ thu thêm tiền bảo trì, tiền quản lý tòa nhà.",
      "Nước thu theo khối với giá 35.000đ - 40.000đ/m³ (cao gấp đôi giá nước sạch sinh hoạt).",
    ],
    landlordQuestions: [
      "Tiền nước tính theo đồng hồ khối hay tính theo đầu người cố định? Bao nhiêu một tháng?",
      "Ngoài tiền phòng, điện, nước thì còn bất kỳ khoản phí nào khác nữa không? Cho em xin danh sách chi tiết.",
      "Các khoản phí này có cam kết giữ nguyên trong suốt thời hạn hợp đồng không?",
    ],
    legalBasis: ["Quyết định biểu giá nước sạch sinh hoạt của UBND TP.HCM và UBND TP. Hà Nội."],
    relatedSlugs: ["tien-dien-dung-gia", "ngan-sach-that", "hop-dong-thue-nha"],
  },

  "ngan-sach-that": {
    slug: "ngan-sach-that",
    title: "Ngân sách thật: giá phòng chỉ là một phần bạn phải trả",
    description: "Cộng đủ điện, nước, xe, mạng, đi lại rồi mới biết mình thuê nổi mức nào. Tháng đầu tiên dọn vào luôn tốn gấp đôi.",
    readingMinutes: 5,
    category: "Chi phí",
    stageTitle: "Trước khi đi tìm",
    stats: [
      { value: "≈ 2 lần", label: "khoản tiền cần có sẵn trong ngày dọn vào" },
      { value: "30%", label: "tỷ lệ tối đa thu nhập nên chi cho chỗ ở" },
      { value: "+1.2–1.8tr", label: "khoản chi phí phụ trội hằng tháng ngoài giá phòng" },
      { value: "1–2 triệu", label: "chi phí sắm sửa đồ đạc ban đầu" },
    ],
    lead: "Một sai lầm kinh điển của người thuê nhà là chỉ lấy tiền thuê phòng so với lương. Nếu lương bạn 12 triệu mà thuê căn phòng 5 triệu, cộng thêm cọc và chi phí sinh hoạt phát sinh, bạn rất dễ rơi vào tình trạng cạn kiệt tài chính ngay tháng đầu.",
    sections: [
      {
        title: "Bảng tính tổng ngân sách thực tế mỗi tháng",
        table: {
          headers: ["Hạng mục chi phí", "Số tiền ước tính", "Ghi chú"],
          rows: [
            ["Tiền thuê phòng", "4.500.000 đ", "Khoản cố định"],
            ["Tiền điện (chạy máy lạnh 8h/ngày)", "600.000 đ", "Dao động theo mùa nóng"],
            ["Tiền nước (1 người)", "100.000 đ", "Định mức"],
            ["Phí gửi xe máy (1 chiếc)", "120.000 đ", "Cố định"],
            ["Wifi + rác + dịch vụ chung", "150.000 đ", "Cố định"],
            ["Xăng xe / đi lại đến chỗ làm", "300.000 đ", "Tùy khoảng cách xa gần"],
            ["Tổng chi phí thực tế cho chỗ ở", "5.770.000 đ", "Cao hơn 28% so với giá phòng niêm yết"],
          ],
        },
      },
      {
        title: "Số tiền cần chuẩn bị sẵn cho tháng đầu dọn vào",
        paragraphs: [
          "Tháng đầu tiên dọn vào bạn phải thanh toán: [Tiền cọc (1-2 tháng)] + [Tiền nhà tháng đầu] + [Chi phí dọn nhà/xe ba gác] + [Mua sắm vật dụng cơ bản: drap giường, nồi cơm, móc áo...].",
          "Ví dụ phòng 4.5 triệu, số tiền bạn cần sẵn trong tài khoản ngày ký hợp đồng là ít nhất: 4.5tr (cọc) + 4.5tr (tháng 1) + 1tr (mua sắm dọn dẹp) = 10.000.000 đồng.",
        ],
      },
      {
        title: "Quy tắc 30% thu nhập — Đắt hơn nhưng lại rẻ hơn",
        paragraphs: [
          "Chuyên gia tài chính khuyến nghị tổng chi phí cho chỗ ở không nên vượt quá 30% - 35% thu nhập ròng hằng tháng. Đôi khi thuê căn phòng 4.5 triệu gần công ty đi bộ 5 phút lại rẻ hơn thuê căn 3.5 triệu ở xa phải tốn 500k tiền xăng và 2 tiếng kẹt xe mệt mỏi mỗi ngày.",
        ],
      },
    ],
    redFlags: [
      "Ký hợp đồng thuê phòng vượt quá 45% thu nhập hằng tháng khiến bạn không còn quỹ dự phòng khẩn cấp.",
      "Không hỏi trước về tiền cọc khiến đến ngày nhận phòng bị động tài chính.",
    ],
    landlordQuestions: [
      "Tổng cộng ngày đầu tiên dọn vào em cần chuẩn bị chính xác bao nhiêu tiền?",
      "Phòng tương tự tháng vừa rồi trung bình hết khoảng bao nhiêu tiền điện nước?",
      "Giá thuê phòng này có cam kết giữ cố định trong hợp đồng 1 năm không?",
    ],
    legalBasis: ["Khuyến nghị quản lý tài chính cá nhân chuẩn quốc tế."],
    relatedSlugs: ["tien-dien-dung-gia", "tien-nuoc-va-phi-dich-vu", "dat-coc-an-toan"],
  },

  "di-xem-phong-25-phut": {
    slug: "di-xem-phong-25-phut",
    title: "Đi xem phòng: 25 phút kiểm đúng thứ ảnh không cho thấy",
    description: "Ảnh trên mạng thường chụp góc rộng và chỉnh màu. Đây là checklist 25 phút kiểm tra thực tế: áp lực nước, mùi cống, sóng điện thoại và an ninh.",
    readingMinutes: 7,
    category: "Xem phòng",
    stageTitle: "Đi xem phòng",
    stats: [
      { value: "25 phút", label: "thời gian tối thiểu cần dành để kiểm tra" },
      { value: "2 thời điểm", label: "nên xem: 1 lần ban ngày, 1 lần buổi tối" },
      { value: "100%", label: "mở tất cả vòi nước và xả bồn cầu thử" },
      { value: "Chụp ảnh", label: "lưu lại hiện trạng ngay lúc xem" },
    ],
    lead: "Góc máy góc rộng và ánh sáng đèn studio có thể biến một căn phòng ẩm mốc, thiếu sáng thành căn hộ lung linh. Chỉ khi bước chân đến tận nơi và dành đúng 25 phút kiểm tra, bạn mới phát hiện những điểm trừ chí mạng.",
    sections: [
      {
        title: "Checklist 25 phút kiểm tra từng hạng mục",
        list: [
          "Phút 1-5 (Xung quanh khu trọ): Đường vào có ngập nước mùa mưa không? Đầu ngõ có bãi rác hay quán nhậu ồn ào không?",
          "Phút 6-10 (Cửa và an ninh): Khóa cửa sổ, khóa ban công có chắc chắn không? Cửa phòng có khe hở nhìn trộm được không?",
          "Phút 11-15 (Nhà vệ sinh & thoát nước): Mở vòi sen xem áp lực nước mạnh hay yếu? Xả bồn cầu xem có thoát nhanh không? Ngửi mùi cống bốc lên ngược không?",
          "Phút 16-20 (Thiết bị điện & sóng): Bật máy lạnh xem có lạnh sâu và chạy êm không? Rút điện thoại xem có đủ vạch sóng 4G/5G nghe gọi không?",
          "Phút 21-25 (Tường, ẩm mốc & ánh sáng): Nhìn chân tường và góc trần xem có vết ố vàng ẩm mốc không? Ban ngày tắt đèn phòng có đủ sáng không?",
        ],
      },
      {
        title: "Vì sao nên quay lại xem thêm 1 lần vào buổi tối?",
        paragraphs: [
          "Ban ngày xóm trọ thường vắng vẻ vì mọi người đi làm. Buổi tối (từ 19h - 21h) là lúc bộc lộ rõ nhất: hàng xóm có hát karaoke không, xe máy về có chỗ để không, khu phố có đèn đường an toàn cho bạn đi bộ về khuya không.",
        ],
      },
    ],
    redFlags: [
      "Chủ nhà giục giã: 'Xem nhanh lên em ơi anh đang bận' và không cho bạn bật thử máy lạnh, vòi nước.",
      "Trong phòng có mùi thuốc xịt phòng nồng nặc (thường dùng để át mùi ẩm mốc hoặc mùi cống hôi).",
      "Sóng điện thoại mất hoàn toàn khi khép cửa phòng.",
    ],
    landlordQuestions: [
      "Người thuê trước ở đây bao lâu và vì sao họ chuyển đi?",
      "Khu này mùa mưa lớn triều cường có bị ngập đường vào không?",
      "Giờ đóng cổng là mấy giờ? Về muộn thì có chìa khóa riêng tự mở không?",
      "Trong phòng có được nấu ăn bằng bếp điện không?",
    ],
    legalBasis: ["Kinh nghiệm thực tiễn từ hơn 10.000 lượt thuê phòng trọ."],
    relatedSlugs: ["an-toan-chay-no", "ban-giao-nhan-phong", "nhan-dien-lua-dao"],
  },

  "nhan-dien-lua-dao": {
    slug: "nhan-dien-lua-dao",
    title: "Tám kiểu lừa đảo nhắm vào người thuê trọ, và cách chặn từng kiểu",
    description: "Nhận diện thủ đoạn lừa cọc qua mạng, phòng ma, giả danh chủ nhà và chiêu trò ép giá để tự bảo vệ tài sản của bạn.",
    readingMinutes: 9,
    category: "Cảnh báo",
    stageTitle: "Trước khi đi tìm",
    stats: [
      { value: "0 đồng", label: "tuyệt đối không chuyển cọc trước khi xem tận mắt" },
      { value: "8 chiêu trò", label: "lừa đảo phổ biến nhất được vạch trần" },
      { value: "CCCD", label: "luôn đối chiếu giấy tờ chủ quyền căn nhà" },
      { value: "Báo ngay", label: "công an phường khi phát hiện dấu hiệu lừa đảo" },
    ],
    lead: "Sinh viên năm nhất và người chân ướt chân ráo lên thành phố luôn là miếng mồi ngon của các đối tượng lừa đảo thuê trọ tinh vi với đủ kịch bản đánh vào tâm lý ham phòng đẹp giá rẻ.",
    sections: [
      {
        title: "Tám kịch bản lừa đảo phổ biến nhất",
        list: [
          "1. Chiêu 'Phòng đẹp giá hời, cọc gấp để giữ': Đăng ảnh penthouse/studio sang trọng giá chỉ 2 triệu, bắt chuyển cọc 500k-1tr qua mạng rồi chặn số ngay lập tức.",
          "2. Giả danh chủ nhà: Đối tượng thuê phòng theo ngày (Airbnb), sau đó giả làm chủ trọ dẫn khách đến xem rồi thu cọc 1-2 tháng của hàng chục người cùng lúc rồi ôm tiền trốn.",
          "3. 'Cọc giữ chỗ không hoàn lại': Làm hợp đồng cọc mập mờ, khi đến ngày dọn vào đưa ra thêm hàng loạt chi phí vô lý ép người thuê nản lòng tự bỏ cọc.",
          "4. Đăng giá một đằng, thu một nẻo: Đăng tin 2.5 triệu nhưng đến nơi bảo 'phòng đó vừa hết, chỉ còn phòng 4.5 triệu'.",
          "5. Thu phí xem phòng, phí dẫn đường: Bắt nộp 100k - 200k tiền 'dẫn đi xem phòng' rồi dẫn đi lòng vòng qua các phòng nát.",
          "6. Hợp đồng miệng hoặc giấy tay bỏ trống: Không ghi thời hạn, không ghi giá điện nước, sau đó tự ý tăng giá.",
          "7. 'Đổi chủ' giữa chừng: Người ký hợp đồng biến mất, người khác đến nhận là chủ nhà thật đòi đuổi khách hoặc bắt ký lại hợp đồng mới.",
          "8. Ở ghép ảo: Người đăng tìm người ở ghép đòi chuyển cọc trước, nhận tiền xong biến mất.",
        ],
      },
      {
        title: "Ba nguyên tắc vàng phòng chống lừa đảo",
        list: [
          "Nguyên tắc 1: Không chuyển bất kỳ một đồng nào nếu chưa đến tận nơi, bước vào trong căn phòng và kiểm tra chìa khóa.",
          "Nguyên tắc 2: Yêu cầu người nhận cọc xuất trình CCCD và giấy tờ chứng minh quyền cho thuê (sổ đỏ hoặc hợp đồng ủy quyền quản lý).",
          "Nguyên tắc 3: Luôn chuyển khoản có ghi chú rõ ràng, chụp ảnh CCCD của người nhận tiền và giữ giấy nhận cọc có chữ ký tươi.",
        ],
      },
    ],
    redFlags: [
      "Người đăng tin từ chối cho xem phòng trực tiếp với lý do 'đang ở quê/đang bận công tác'.",
      "Yêu cầu chuyển tiền qua thẻ cào điện thoại hoặc tài khoản ngân hàng ảo không hiển thị tên thật.",
      "Tài khoản mạng xã hội mới lập, không có tương tác thật, avatar ảnh mạng.",
    ],
    landlordQuestions: [
      "Anh/chị là chủ nhà trực tiếp hay là bên môi giới/quản lý vận hành?",
      "Cho em xem giấy tờ nhà hoặc hợp đồng ủy quyền quản lý được không?",
      "Em có thể gặp trực tiếp chủ nhà đứng tên trên sổ để ký hợp đồng không?",
    ],
    legalBasis: [
      "Điều 174 Bộ luật Hình sự 2015 (sửa đổi 2017) về Tội lừa đảo chiếm đoạt tài sản.",
    ],
    relatedSlugs: ["dat-coc-an-toan", "di-xem-phong-25-phut", "hop-dong-thue-nha"],
  },

  "ban-giao-nhan-phong": {
    slug: "ban-giao-nhan-phong",
    title: "Biên bản bàn giao: tờ giấy quyết định bạn có đòi được cọc hay không",
    description: "Luật không bắt buộc mẫu cụ thể, nhưng có biên bản bàn giao kèm hình ảnh hiện trạng là tấm bùa hộ mệnh giúp bạn không bị trừ cọc oan uổng.",
    readingMinutes: 6,
    category: "Bàn giao",
    stageTitle: "Trước khi dọn vào",
    stats: [
      { value: "Điều 479", label: "Bộ luật Dân sự: Bên thuê sửa chữa nhỏ, bên cho thuê sửa chữa lớn" },
      { value: "6 mục", label: "bắt buộc phải kiểm tra và ghi nhận vào biên bản" },
      { value: "Video 4K", label: "quay quét toàn bộ căn phòng lúc nhận chìa khóa" },
      { value: "Chỉ số", label: "chốt công tơ điện nước ngay tại thời điểm bàn giao" },
    ],
    lead: "Khi dọn vào, căn phòng có thể đã có sẵn vết nứt trên tường, vòi nước rỉ nhẹ hay tủ quần áo bị xệ cánh. Nếu không lập biên bản bàn giao, đến ngày bạn dọn đi, chủ nhà sẽ quy toàn bộ hư hỏng đó cho bạn và trừ cọc không thương tiếc.",
    sections: [
      {
        title: "Ranh giới trách nhiệm theo Điều 479 Bộ luật Dân sự",
        paragraphs: [
          "Bên cho thuê phải sửa chữa những hư hỏng lớn, hao mòn tự nhiên theo thời gian của ngôi nhà và các trang thiết bị gắn liền.",
          "Bên thuê chỉ phải chịu trách nhiệm sửa chữa những hư hỏng nhỏ do quá trình sử dụng của bản thân gây ra (ví dụ: làm vỡ gương, cháy bóng đèn do dùng quá tải, làm gãy chốt cửa...).",
        ],
      },
      {
        title: "Sáu mục cốt tử cần ghi rõ trong biên bản bàn giao",
        list: [
          "1. Chỉ số công tơ điện và đồng hồ nước tại thời điểm nhận phòng (có ảnh chụp đính kèm).",
          "2. Số lượng và tình trạng hoạt động của chìa khóa phòng, khóa cổng, thẻ thang máy, vân tay.",
          "3. Tình trạng tường, trần, sàn gạch (có vết nứt, thấm dột, tróc sơn sẵn ở đâu không).",
          "4. Trang thiết bị điện máy: máy lạnh (remote, độ mát), tủ lạnh, máy nước nóng, quạt hút.",
          "5. Thiết bị vệ sinh: bồn cầu, vòi sen, lavabo, gương soi có nứt mẻ, rò rỉ nước không.",
          "6. Nội thất rời: giường, nệm, tủ áo, bàn ghế (ghi rõ nếu đã cũ, trầy xước từ trước).",
        ],
      },
      {
        title: "Mẹo quay video bằng chứng không thể chối cãi",
        paragraphs: [
          "Vào ngày nhận phòng, hãy quay một video liền mạch từ cửa vào, quay cận cảnh các góc tường, vòi nước đang chảy, bật thử máy lạnh, mở các ngăn tủ. Sau đó gửi video này vào nhóm Zalo chung có mặt chủ nhà kèm tin nhắn: 'Em gửi anh/chị video hiện trạng phòng lúc em nhận bàn giao hôm nay'.",
        ],
      },
    ],
    redFlags: [
      "Chủ nhà nói miệng: 'Cứ yên tâm ở đi hỏng đâu chú sửa cho, không cần biên bản giấy tờ gì rắc rối'.",
      "Từ chối ký xác nhận chỉ số điện nước ngày đầu dọn vào.",
    ],
    landlordQuestions: [
      "Hôm nay nhận chìa khóa mình cùng lập biên bản bàn giao và chốt số điện nước nhé anh/chị?",
      "Những vết nứt và chỗ rỉ nước cũ này em ghi chú vào biên bản luôn để sau này khỏi nhầm lẫn nhé?",
      "Lúc em dọn ra thì quy trình đối chiếu bàn giao sẽ thực hiện lại như hôm nay đúng không ạ?",
    ],
    legalBasis: ["Điều 477, Điều 479 Bộ luật Dân sự 2015 về nghĩa vụ bảo đảm và sửa chữa tài sản thuê."],
    relatedSlugs: ["hop-dong-thue-nha", "don-ra-lay-lai-coc", "dat-coc-an-toan"],
  },

  "don-ra-lay-lai-coc": {
    slug: "don-ra-lay-lai-coc",
    title: "Dọn ra: chấm dứt hợp đồng đúng luật và lấy lại đủ cọc",
    description: "Báo trước đúng 30 ngày bằng văn bản, đối chiếu biên bản bàn giao và nắm vững quy định pháp luật để chủ nhà không có cớ trừ cọc.",
    readingMinutes: 6,
    category: "Hoàn cọc",
    stageTitle: "Sau khi dọn vào",
    stats: [
      { value: "30 ngày", label: "thời hạn báo trước chuẩn theo luật" },
      { value: "0đ", label: "chủ nhà không được trừ tiền hao mòn tự nhiên" },
      { value: "Văn bản", label: "luôn thông báo dọn đi có bằng chứng văn bản/tin nhắn" },
      { value: "Biên bản", label: "lập biên bản trả phòng đối chiếu ngày dọn ra" },
    ],
    lead: "Rất nhiều người đi thuê sợ nhất ngày dọn ra, vì có những chủ trọ tìm đủ mọi lý do: 'sơn lại tường', 'vệ sinh máy lạnh', 'thay ổ khóa'... để trừ gần hết tiền cọc 1-2 tháng mà người thuê tích cóp bao lâu.",
    sections: [
      {
        title: "Ba trường hợp bạn được quyền đơn phương chấm dứt hợp đồng",
        paragraphs: [
          "Theo Điều 481 Bộ luật Dân sự 2015 và Điều 172 Luật Nhà ở 2023, bạn có quyền đơn phương chấm dứt hợp đồng và ĐÒI LẠI ĐỦ TIỀN CỌC khi:",
          "1. Bên cho thuê không sửa chữa nhà ở khi có hư hỏng nặng làm ảnh hưởng nghiêm trọng đến an toàn và sinh hoạt.",
          "2. Bên cho thuê tự ý tăng giá thuê nhà bất hợp lý hoặc tăng giá không báo trước theo thỏa thuận.",
          "3. Quyền sử dụng nhà ở bị hạn chế do lợi ích của người thứ ba (nhà bị tranh chấp, siết nợ, giải tỏa).",
        ],
      },
      {
        title: "Quy tắc báo trước 30 ngày bằng văn bản",
        paragraphs: [
          "Khi muốn dọn đi khi hết hạn hợp đồng hoặc trước hạn (nếu hợp đồng cho phép), hãy gửi thông báo bằng tin nhắn Zalo/SMS hoặc email chính thức trước ít nhất 30 ngày. Chụp ảnh màn hình lưu lại để chứng minh bạn đã hoàn thành đúng nghĩa vụ báo trước theo luật.",
        ],
      },
      {
        title: "Chủ nhà được trừ khoản nào và KHÔNG được trừ khoản nào?",
        table: {
          headers: ["Khoản được trừ hợp pháp", "Khoản KHÔNG ĐƯỢC trừ vô lý"],
          rows: [
            ["Tiền điện nước thực tế dùng đến ngày trả phòng", "Chi phí sơn lại tường bị ngả màu tự nhiên theo năm tháng"],
            ["Đồ đạc bị gãy, vỡ, mất mát do người thuê làm hỏng", "Khấu hao máy móc thiết bị cũ do hết tuổi thọ"],
            ["Phí dọn dẹp nếu người thuê để phòng quá bẩn (có thoả thuận)", "Phí 'môi giới tìm khách mới' thay thế"],
          ],
        },
      },
      {
        title: "Ba bước đòi lại cọc khi chủ nhà cố tình chây ì",
        list: [
          "Bước 1: Đưa ra hợp đồng thuê, biên bản bàn giao ban đầu và video hiện trạng ngày nhận phòng để đối chiếu trực tiếp.",
          "Bước 2: Gửi thông báo yêu cầu hoàn trả cọc nêu rõ thời hạn thanh toán (tối đa 3-5 ngày làm việc).",
          "Bước 3: Nếu chủ nhà vẫn cố tình không trả, nộp đơn trình báo lên Công an xã/phường nơi có nhà trọ về hành vi chiếm giữ tài sản trái phép hoặc khởi kiện ra Tòa án nhân dân quận/huyện.",
        ],
      },
    ],
    redFlags: [
      "Chủ nhà hẹn: 'Cứ dọn đồ đi đi, tuần sau chú kiểm tra phòng rồi chuyển khoản trả cọc sau'.",
      "Kê ra một danh sách hóa đơn sửa chữa vô lý gấp 3 lần giá thị trường mà không có chứng từ chứng minh.",
    ],
    landlordQuestions: [
      "Em gửi thông báo dọn ra trước 30 ngày qua Zalo, anh/chị xác nhận giúp em nhé?",
      "Ngày trả chìa khóa hai bên cùng lập biên bản đối chiếu hiện trạng và thanh toán dứt điểm tiền cọc nhé?",
      "Khoản tiền điện nước tháng cuối tính đến đúng số trên đồng hồ ngày em trả phòng đúng không ạ?",
    ],
    legalBasis: [
      "Điều 481, Điều 482 Bộ luật Dân sự 2015 về Chấm dứt hợp đồng thuê tài sản.",
      "Điều 172 Luật Nhà ở 2023.",
    ],
    relatedSlugs: ["ban-giao-nhan-phong", "hop-dong-thue-nha", "dat-coc-an-toan"],
  },
};

export function getGuideArticleBySlug(slug: string): GuideArticleDetail | undefined {
  return guideArticles[slug];
}

export function getAllGuideArticleSlugs(): string[] {
  return Object.keys(guideArticles);
}

