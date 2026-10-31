"use client";

import React, { useState } from "react";
import styles from "@/styles/contact.module.css";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock client-side submission delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.contactFormCard}>
      <form className={styles.leadForm} onSubmit={handleSubmit}>
        {submitted && (
          <div className={styles.successInline}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>
              Yêu cầu đã được gửi thành công! HomeMatch sẽ liên hệ phản hồi sớm nhất.
            </span>
          </div>
        )}

        <label>
          Họ và tên *
          <input required placeholder="Tên của bạn" name="ten" />
        </label>

        <div className={styles.formRow}>
          <label>
            Email *
            <input
              required
              type="email"
              placeholder="ban@example.com"
              name="email"
            />
          </label>
          <label>
            Số điện thoại
            <input inputMode="tel" placeholder="0901 234 567" name="sdt" />
          </label>
        </div>

        <label>
          Chủ đề
          <select name="chu_de" defaultValue="general">
            <option value="general">Câu hỏi chung</option>
            <option value="renter">Hỗ trợ tìm phòng</option>
            <option value="owner">Hỗ trợ chủ nhà</option>
            <option value="report">Báo cáo tin đăng</option>
          </select>
        </label>

        <label>
          URL liên quan
          <input type="url" placeholder="https://..." name="url_lien_quan" />
        </label>

        <label>
          Nội dung *
          <textarea
            name="noi_dung"
            required
            rows={5}
            placeholder="Mô tả điều bạn cần hỗ trợ, thời điểm và kết quả mong muốn"
          ></textarea>
        </label>

        <label className={styles.contactConsent}>
          <input type="checkbox" required /> Tôi xác nhận không gửi mật khẩu, OTP
          hoặc dữ liệu thanh toán.
        </label>

        <button
          className={styles.buttonPrimary}
          type="submit"
          disabled={isSubmitting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-send"
          >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
            <path d="m21.854 2.147-10.94 10.939"></path>
          </svg>{" "}
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>

        <small>
          HomeMatch phản hồi trong giờ làm việc. Thông tin của bạn chỉ dùng để hỗ
          trợ yêu cầu này.
        </small>
      </form>
    </div>
  );
}
