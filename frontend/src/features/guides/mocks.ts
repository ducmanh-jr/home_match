import type { GuidesContent } from "./types";

// Reference-page content for the mock UI; no backend or calculator is involved.
export const guidesMock: GuidesContent = {
  highlights: [
    {
      value: "2.380đ",
      description: "giá điện bậc 3 — mốc đối chiếu khi chủ trọ chưa kê khai người ở",
      articlePath: "/cam-nang/tien-dien-dung-gia",
    },
    {
      value: "4 người",
      description: "được tính là 1 định mức hộ cho cả điện và nước",
      articlePath: "/cam-nang/tien-dien-dung-gia",
    },
    {
      value: "Gấp đôi",
      description: "mức chủ nhà phải trả nếu họ phá thoả thuận đặt cọc",
      articlePath: "/cam-nang/dat-coc-an-toan",
    },
    {
      value: "30 ngày",
      description: "hạn đăng ký tạm trú kể từ ngày chuyển đến",
      articlePath: "/cam-nang/tam-tru-vneid",
    },
    {
      value: "Không cần",
      description: "hợp đồng thuê nhà ở không bắt buộc công chứng",
      articlePath: "/cam-nang/hop-dong-thue-nha",
    },
    {
      value: "4 m²/người",
      description: "diện tích sàn tối thiểu của nhà trọ cho thuê",
      articlePath: "/cam-nang/an-toan-chay-no",
    },
  ],
  stages: [
    {
      id: "chuan-bi",
      title: "Trước khi đi tìm",
      description: "Biết ngân sách thật và giá điện nước đúng luật, trước khi xem căn đầu tiên.",
      articles: [
        {
          title: "Tiền điện: giá đúng là bao nhiêu, và cách bắt lỗi hoá đơn",
          description: "Nhà nước quy định 6 bậc giá bán lẻ. Chủ trọ thu 4.000–5.000đ/kWh là thu vượt khung, và có mức phạt cụ thể cho việc đó.",
          readingMinutes: 7,
          path: "/cam-nang/tien-dien-dung-gia",
          hasCalculator: true,
        },
        {
          title: "Tiền nước và các khoản phí: cái nào có khung, cái nào tự thoả thuận",
          description: "Nước có quy định định mức nhưng giá do từng tỉnh ban hành. Phí dịch vụ thì hoàn toàn thoả thuận — nên phải ghi vào hợp đồng.",
          readingMinutes: 5,
          path: "/cam-nang/tien-nuoc-va-phi-dich-vu",
        },
        {
          title: "Ngân sách thật: giá phòng chỉ là một phần bạn phải trả",
          description: "Cộng đủ điện, nước, xe, mạng, đi lại rồi mới biết mình thuê nổi mức nào. Và tháng đầu luôn tốn gấp đôi.",
          readingMinutes: 5,
          path: "/cam-nang/ngan-sach-that",
        },
      ],
    },
    {
      id: "di-xem",
      title: "Đi xem phòng",
      description: "25 phút tại chỗ, kiểm đúng thứ không nhìn được qua ảnh.",
      articles: [
        {
          title: "Đi xem phòng: 25 phút kiểm đúng thứ ảnh không cho thấy",
          description: "Ảnh chụp góc rộng lúc trưa nắng. Ẩm mốc, tiếng ồn, áp lực nước và sóng điện thoại thì phải đến tận nơi mới biết.",
          readingMinutes: 6,
          path: "/cam-nang/di-xem-phong-25-phut",
        },
        {
          title: "Tám kiểu lừa đảo nhắm vào người thuê trọ, và cách chặn từng kiểu",
          description: "Gần như mọi vụ đều đi qua một điểm chung: bạn chuyển tiền trước khi kiểm chứng được người nhận là ai.",
          readingMinutes: 6,
          path: "/cam-nang/nhan-dien-lua-dao",
        },
      ],
    },
    {
      id: "chot",
      title: "Đặt cọc và ký",
      description: "Khoản tiền lớn nhất, và là chỗ mất tiền nhiều nhất.",
      articles: [
        {
          title: "Đặt cọc: luật nói gì, và giấy cọc phải có gì",
          description: "Bên nhận cọc phá thoả thuận thì phải trả lại cọc và bồi thường một khoản tương đương — tức gấp đôi. Nhưng chỉ khi bạn có giấy.",
          readingMinutes: 6,
          path: "/cam-nang/dat-coc-an-toan",
        },
        {
          title: "Hợp đồng thuê nhà: 12 điều khoản phải có, và điều luật ít người biết",
          description: "Hợp đồng thuê nhà ở không bắt buộc công chứng — nhưng vẫn có giá trị pháp lý đầy đủ. Cái quyết định là nội dung, không phải con dấu.",
          readingMinutes: 8,
          path: "/cam-nang/hop-dong-thue-nha",
        },
      ],
    },
    {
      id: "don-vao",
      title: "Dọn vào và ở",
      description: "Tạm trú, an toàn cháy nổ, và giữ bằng chứng để lấy lại cọc.",
      articles: [
        {
          title: "Đăng ký tạm trú: 30 ngày, làm trên VNeID, và vì sao nó đáng tiền",
          description: "Không chỉ để tránh phạt. Tạm trú là điều kiện để bạn được hưởng giá điện, giá nước theo định mức hộ.",
          readingMinutes: 5,
          path: "/cam-nang/tam-tru-vneid",
        },
        {
          title: "An toàn cháy nổ trong nhà trọ: kiểm gì, và tiêu chuẩn nhà trọ phải đạt",
          description: "Nhà trọ cho thuê có tiêu chuẩn tối thiểu về diện tích và lối thoát nạn. Biết tiêu chuẩn giúp bạn nhận ra nơi nào không nên ở.",
          readingMinutes: 5,
          path: "/cam-nang/an-toan-chay-no",
        },
        {
          title: "Biên bản bàn giao: tờ giấy quyết định bạn có đòi được cọc hay không",
          description: "Ngày nhận phòng là ngày duy nhất bạn còn quyền thương lượng. Sau đó mọi vết nứt đều thành của bạn.",
          readingMinutes: 6,
          path: "/cam-nang/ban-giao-nhan-phong",
        },
      ],
    },
    {
      id: "don-ra",
      title: "Dọn ra",
      description: "Chấm dứt hợp đồng đúng luật và lấy lại đủ tiền cọc.",
      articles: [
        {
          title: "Dọn ra: chấm dứt hợp đồng đúng luật và lấy lại đủ cọc",
          description: "Ba trường hợp bạn được đơn phương chấm dứt, hạn báo trước 30 ngày, và bộ bằng chứng quyết định bạn lấy lại bao nhiêu.",
          readingMinutes: 7,
          path: "/cam-nang/don-ra-lay-lai-coc",
        },
      ],
    },
  ],
  principles: [
    {
      title: "Số nào cũng có nguồn",
      description: "Cuối mỗi bài là danh sách nguồn để bạn tự tra. Chỗ nào chúng tôi không chắc, bài viết nói thẳng là không chắc.",
      icon: "sources",
    },
    {
      title: "Chỗ nào không có khung giá, chúng tôi không in bảng",
      description: "Giá nước do từng tỉnh ban hành nên bài về nước không có bảng giá — chỉ có cách tra đúng cho nơi bạn ở.",
      icon: "location",
    },
    {
      title: "Cẩm nang không thay được luật sư",
      description: "Đây là hướng dẫn thực hành. Khi tranh chấp đã thành vụ việc, hãy hỏi luật sư hoặc trợ giúp pháp lý.",
      icon: "legal",
    },
  ],
};
