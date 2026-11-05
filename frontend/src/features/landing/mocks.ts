import type { LandingContent } from "./types";

export const landingMock: LandingContent = {
  discovery: [
    {
      title: "Gần trường đại học",
      description: "Tiện đi học, dễ cân đối ngân sách.",
      query: "Tìm phòng gần trường đại học",
      icon: "graduation",
      color: "orange",
    },
    {
      title: "Gần nơi làm việc",
      description: "Rút ngắn thời gian di chuyển mỗi ngày.",
      query: "Tìm phòng gần nơi làm việc",
      icon: "briefcase",
      color: "blue",
    },
    {
      title: "Sẵn nội thất",
      description: "Dọn vào nhanh với tiện nghi thiết yếu.",
      query: "Tìm phòng có sẵn nội thất",
      icon: "sofa",
      color: "green",
    },
    {
      title: "Dưới 5 triệu",
      description: "Lựa chọn vừa túi tiền đang còn phòng.",
      query: "Tìm phòng dưới 5 triệu",
      icon: "wallet",
      color: "yellow",
    },
  ],
  areas: [
    {
      title: "Gần trường đại học",
      description: "Tiện đi học, dễ cân đối ngân sách",
      query: "Tìm phòng gần trường đại học",
      image: "/images/landing/university.jpg",
      imageAlt: "Khuôn viên trường đại học với lối đi và cây xanh",
    },
    {
      title: "Khu vực trung tâm",
      description: "Kết nối thuận tiện, nhiều tiện ích",
      query: "Tìm phòng khu vực trung tâm",
      image: "/images/landing/city-center.jpg",
      imageAlt: "Góc phố trong khu vực trung tâm thành phố",
    },
    {
      title: "Gần nơi làm việc",
      description: "Rút ngắn thời gian di chuyển mỗi ngày",
      query: "Tìm phòng gần nơi làm việc",
      image: "/images/landing/workplace.jpg",
      imageAlt: "Khung cảnh đô thị và những tuyến đường kết nối",
    },
  ],
  audiences: [
    {
      label: "Dành cho sinh viên",
      title: "Gần trường, vừa ngân sách, dễ bắt đầu.",
      description: "Tìm phòng theo nơi học, mức giá, chỗ để xe và nội quy sinh hoạt.",
      action: "Tìm phòng gần trường",
      query: "Tìm phòng gần trường đại học",
      theme: "student",
    },
    {
      label: "Dành cho người đi làm",
      title: "Thuận đường đi làm, đủ tiện nghi.",
      description: "Ưu tiên căn hộ sạch, có nội thất, an ninh và chi phí rõ ràng.",
      action: "Tìm gần nơi làm việc",
      query: "Tìm phòng gần nơi làm việc",
      theme: "worker",
    },
  ],
  benefits: [
    {
      title: "Chi phí rõ ràng",
      description: "Xem giá thuê, tiền cọc và các khoản phí trước khi đặt lịch.",
      icon: "wallet",
    },
    {
      title: "Bộ lọc đúng nhu cầu",
      description: "Thu hẹp lựa chọn theo khu vực, ngân sách và tiện ích.",
      icon: "filters",
    },
    {
      title: "Tin đăng được kiểm duyệt",
      description: "Nội dung được xem xét trước khi hiển thị công khai.",
      icon: "shield",
    },
    {
      title: "Đặt lịch nhanh",
      description: "Chọn thời gian phù hợp và gửi yêu cầu trong vài bước.",
      icon: "calendar",
    },
    {
      title: "Hỗ trợ khi cần",
      description: "Kết nối đúng đầu mối khi bạn cần thêm thông tin.",
      icon: "headphones",
    },
  ],
  steps: [
    {
      title: "Chọn khu vực",
      description: "Nhập nơi bạn muốn ở, trường học hoặc khu làm việc.",
      icon: "location",
    },
    {
      title: "Lọc và so sánh",
      description: "Đối chiếu giá, diện tích, tiện ích và chi phí.",
      icon: "compare",
    },
    {
      title: "Chọn lịch xem",
      description: "Điền thông tin và thời gian thuận tiện với bạn.",
      icon: "calendar",
    },
    {
      title: "Nhận xác nhận",
      description: "Đầu mối phụ trách sẽ liên hệ xác nhận lịch.",
      icon: "check",
    },
  ],
  guides: [
    {
      title: "Tiền điện: giá đúng là bao nhiêu, và cách bắt lỗi hoá đơn",
      category: "Chi phí",
      readingMinutes: 7,
      path: "/cam-nang/tien-dien-dung-gia",
      icon: "electricity",
    },
    {
      title: "Đi xem phòng: 25 phút kiểm đúng thứ ảnh không cho thấy",
      category: "Xem phòng",
      readingMinutes: 6,
      path: "/cam-nang/di-xem-phong-25-phut",
      icon: "home",
    },
    {
      title: "Hợp đồng thuê nhà: 12 điều khoản phải có",
      category: "Hợp đồng",
      readingMinutes: 8,
      path: "/cam-nang/hop-dong-thue-nha",
      icon: "contract",
    },
  ],
};
