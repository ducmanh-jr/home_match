import React from "react";
import Link from "next/link";
import styles from "@/styles/contact.module.css";

export function ContactInfo() {
  return (
    <div>
      <span className={styles.sectionKicker}>Liên hệ HomeMatch</span>
      <h1 className={styles.h1}>Hãy cho chúng tôi biết bạn cần gì.</h1>
      <p className={styles.subtitle}>
        Chọn đúng chủ đề và mô tả cụ thể để yêu cầu được định tuyến phù hợp khi hệ thống hỗ trợ được kết nối.
      </p>

      <div className={styles.contactNotes}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-square-text"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M13 8H7"></path>
            <path d="M17 12H7"></path>
          </svg>
          <span>
            <strong>Mô tả rõ vấn đề</strong>
            <small>Thêm URL tin đăng, thời điểm và kết quả bạn mong muốn.</small>
          </span>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-check"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <span>
            <strong>Không gửi thông tin nhạy cảm</strong>
            <small>Không chia sẻ mật khẩu, mã OTP hoặc thông tin thanh toán.</small>
          </span>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clock3"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16.5 12"></polyline>
          </svg>
          <span>
            <strong>Thời gian phản hồi</strong>
            <small>HomeMatch phản hồi trong giờ làm việc; yêu cầu khẩn hãy dùng Trung tâm trợ giúp.</small>
          </span>
        </div>
      </div>

      <div className={styles.contactTrucTiep}>
        <a href="tel:0967016979">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-phone-call"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
            <path d="M14.05 6A5 5 0 0 1 18 10"></path>
          </svg>
          <span>
            <strong>0967 016 979</strong>
            <small>Gọi hoặc nhắn Zalo</small>
          </span>
        </a>

        <a href="mailto:hotro@homematch.vn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <span>
            <strong>hotro@homematch.vn</strong>
            <small>Gửi email cho đội ngũ HomeMatch</small>
          </span>
        </a>
      </div>

      <div className={styles.contactShortcuts}>
        <Link href="/tro-ly-ai">Tìm trong Trung tâm trợ giúp</Link>
        <Link href="/cam-nang/an-toan-chay-no">Xem hướng dẫn an toàn</Link>
        <Link href="/privacy">Đọc Chính sách bảo mật</Link>
      </div>
    </div>
  );
}
