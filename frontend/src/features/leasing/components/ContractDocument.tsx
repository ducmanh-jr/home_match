"use client";

import React from "react";
import type { LeaseContract } from "../types";
import { getSpecificCategoryClauses, getGeneralClauses } from "./contract-content";

interface ContractDocumentProps {
  contract: LeaseContract;
}

export function ContractDocument({ contract }: ContractDocumentProps) {
  const landlord = contract.landlord;
  const tenant = contract.tenant;
  const terms = contract.rentalTerms;
  const general = getGeneralClauses(contract);
  const specificClauses = getSpecificCategoryClauses(contract);

  // Calculate duration in months
  const start = new Date(contract.startDate);
  const end = new Date(contract.endDate);
  const diffMonths = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (30.44 * 24 * 3600 * 1000)) || 6
  );

  return (
    <article
      className="contract-print-area bg-white text-neutral-900 leading-[1.6] text-[13.5px] select-text"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* Quốc hiệu & Tiêu ngữ */}
      <div className="text-center space-y-1 mb-6">
        <p className="font-bold text-sm tracking-wide uppercase">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
        <p className="font-bold text-xs">Độc lập – Tự do – Hạnh phúc</p>
        <div className="w-24 h-[1px] bg-neutral-900 mx-auto my-2" />
      </div>

      {/* Tên hợp đồng */}
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold uppercase tracking-tight text-neutral-950">
          HỢP ĐỒNG THUÊ NHÀ Ở
        </h1>
        <p className="text-xs italic text-neutral-700 mt-1.5 max-w-lg mx-auto">
          Căn cứ Bộ luật Dân sự 2015; Luật Nhà ở 2023; Luật Giao dịch điện tử 2023 và thoả thuận của các bên.
        </p>
      </div>

      <p className="text-justify mb-4">
        Hôm nay, ngày {start.getDate() ? `...... tháng ...... năm ......` : `...... tháng ...... năm ......`}, các bên gồm:
      </p>

      {/* BÊN CHO THUÊ (Bên A) */}
      <section className="mb-4 space-y-1">
        <h2 className="font-bold text-[13px] text-neutral-950 uppercase">BÊN CHO THUÊ (Bên A)</h2>
        <div className="space-y-1 pl-0">
          <p>Họ và tên: <span className="font-medium">{landlord.fullName || "………………………………………………………"}</span></p>
          <p>CCCD/CMND số: <span className="font-medium">{landlord.identityNumber || "…………………………………"}</span></p>
          <p>Địa chỉ: <span className="font-medium">{landlord.address || "………………………………………………………"}</span></p>
          <p>Điện thoại: <span className="font-medium">{landlord.phone || "…………………………………"}</span></p>
        </div>
      </section>

      {/* BÊN THUÊ (Bên B) */}
      <section className="mb-5 space-y-1">
        <h2 className="font-bold text-[13px] text-neutral-950 uppercase">BÊN THUÊ (Bên B)</h2>
        <div className="space-y-1 pl-0">
          <p>Họ và tên: <span className="font-medium">{tenant.fullName || "………………………………………………………"}</span></p>
          <p>CCCD/CMND số: <span className="font-medium">{tenant.identityNumber || "…………………………………"}</span></p>
          <p>Địa chỉ: <span className="font-medium">{tenant.address || "………………………………………………………"}</span></p>
          <p>Điện thoại: <span className="font-medium">{tenant.phone || "…………………………………"}</span></p>
        </div>
      </section>

      <p className="italic mb-4">
        Hai bên thống nhất ký kết hợp đồng thuê nhà ở với các điều khoản sau:
      </p>

      {/* 12 ĐIỀU KHOẢN HỢP ĐỒNG */}
      <div className="space-y-4 text-justify">
        {/* Điều 1 */}
        <section>
          <h3 className="font-bold text-neutral-950">Điều 1. Đối tượng của hợp đồng</h3>
          <p className="mt-1">
            1.1. Bên cho thuê đồng ý cho thuê và Bên thuê đồng ý thuê nhà ở tại địa chỉ:{" "}
            <span className="font-medium">{contract.propertyAddress || "Theo thỏa thuận của hai bên"}</span>
          </p>
          <p className="mt-1">
            1.2. Đặc điểm nhà ở: <span className="font-medium">{contract.roomArea ? `Phòng ${contract.roomCode}, diện tích sử dụng ${contract.roomArea} m²` : `Phòng ${contract.roomCode || "..."}`}</span>
          </p>
          <p className="mt-1">
            1.3. Đặc điểm thửa đất gắn với nhà ở:{" "}
            <span className="font-medium">Theo hồ sơ đăng ký địa chính tại địa phương.</span>
          </p>
          <p className="mt-1">
            1.4. Giấy tờ về quyền sở hữu / quyền sử dụng:{" "}
            <span className="font-medium">Đầy đủ giấy tờ hợp pháp theo quy định của pháp luật.</span>
          </p>
          <p className="mt-1">
            1.5. Trang thiết bị, nội thất bàn giao kèm:{" "}
            <span className="font-medium">
              {contract.furnitureNotes?.trim() || "Theo biên bản bàn giao thực tế và phụ lục trang thiết bị đính kèm."}
            </span>
          </p>
          <p className="mt-1">
            1.6. Mục đích thuê: sử dụng để ở. Bên thuê không được chuyển nhượng hợp đồng hoặc cho thuê lại toàn bộ hay một phần nhà ở khi chưa có văn bản đồng ý của Bên cho thuê.
          </p>
        </section>

        {/* Điều 2 */}
        <section>
          <h3 className="font-bold text-neutral-950">Điều 2. Thời hạn thuê và thời điểm giao nhận nhà</h3>
          <p className="mt-1">
            2.1. Thời hạn thuê là <span className="font-bold">{diffMonths}</span> tháng, bắt đầu từ ngày{" "}
            <span className="font-medium">{contract.startDate || "......"}</span> đến hết ngày{" "}
            <span className="font-medium">{contract.endDate || "......"}</span>.
          </p>
          <p className="mt-1">
            2.2. Thời điểm bàn giao nhà ở: ngày{" "}
            <span className="font-medium">{contract.handoverDate || contract.startDate || "......"}</span>.
          </p>
          <p className="mt-1">
            2.3. Hết hạn hợp đồng, nếu Bên thuê có nhu cầu tiếp tục thuê thì phải thông báo trước{" "}
            <span className="font-medium">{general.noticeDays}</span> ngày để hai bên tiến hành gia hạn.
          </p>
        </section>

        {/* Điều 3 */}
        <section>
          <h3 className="font-bold text-neutral-950">Điều 3. Giá thuê, tiền đặt cọc và phương thức thanh toán</h3>
          <p className="mt-1">
            3.1. Giá thuê nhà ở là:{" "}
            <span className="font-bold text-neutral-950">
              {terms.monthlyRent ? `${terms.monthlyRent.toLocaleString("vi-VN")} đồng/tháng` : "……………………………… đồng/tháng"}
            </span>.
          </p>
          <p className="mt-1">
            3.2. Tiền đặt cọc: Bên thuê đặt cọc số tiền là{" "}
            <span className="font-bold text-neutral-950">
              {terms.depositAmount ? `${terms.depositAmount.toLocaleString("vi-VN")} đồng` : "……………………………… đồng"}
            </span>{" "}
            để đảm bảo thực hiện nghĩa vụ hợp đồng. Tiền cọc sẽ được hoàn trả cho Bên thuê sau khi trừ các chi phí hư hỏng hoặc công nợ tồn đọng (nếu có) khi thanh lý hợp đồng.
          </p>
          <p className="mt-1">
            3.3. Phương thức thanh toán:{" "}
            <span className="font-medium">
              {terms.paymentMethod === "transfer" ? "Chuyển khoản qua tài khoản ngân hàng" : "Tiền mặt trực tiếp"}
            </span>.
            {terms.paymentMethod === "transfer" && (
              <span> (Thông tin nhận tiền: {general.bankPaymentText})</span>
            )}
          </p>
          <p className="mt-1">
            3.4. Kỳ thanh toán:{" "}
            <span className="font-medium">
              {general.cycleText}
            </span>, hạn thanh toán vào ngày <span className="font-bold">{terms.paymentDueDay}</span> của mỗi kỳ.
          </p>
        </section>

        {/* Dynamic Category Specific Clauses (Điều 4, 5, 6) */}
        {specificClauses.map(clause => (
          <section key={clause.title}>
            <h3 className="font-bold text-neutral-950">{clause.title}</h3>
            {clause.paragraphs.map((p, idx) => (
              <p key={idx} className="mt-1">
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Điều 7 đến Điều 12 */}
        <section>
          <h3 className="font-bold text-neutral-950">Điều 7. Quyền và nghĩa vụ của Bên cho thuê</h3>
          <p className="mt-1">
            7.1. Bàn giao nhà ở và trang thiết bị đúng thời hạn đã thỏa thuận.
          </p>
          <p className="mt-1">
            7.2. Yêu cầu Bên thuê thanh toán tiền thuê và các chi phí đầy đủ, đúng hạn.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-neutral-950">Điều 8. Quyền và nghĩa vụ của Bên thuê</h3>
          <p className="mt-1">
            8.1. Nhận bàn giao nhà và sử dụng nhà ở đúng mục đích.
          </p>
          <p className="mt-1">
            8.2. Thanh toán tiền thuê, tiền cọc và các chi phí phát sinh đúng thỏa thuận.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-neutral-950">Điều 9. Chấm dứt hợp đồng</h3>
          <p className="mt-1">
            9.1. Hợp đồng chấm dứt khi hết thời hạn thuê mà hai bên không gia hạn.
          </p>
          <p className="mt-1">
            9.2. Trường hợp một bên đơn phương chấm dứt hợp đồng trước hạn phải thông báo bằng văn bản trước ít nhất{" "}
            <span className="font-medium">{general.noticeDays}</span> ngày.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-neutral-950">Điều 10. Giải quyết tranh chấp</h3>
          <p className="mt-1">
            10.1. Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng, hòa giải trên tinh thần hợp tác.
          </p>
          <p className="mt-1">
            10.2. Trường hợp không hòa giải được, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền giải quyết.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-neutral-950">Điều 11. Cam kết của các bên</h3>
          <p className="mt-1">
            Hai bên cam kết những thông tin kê khai trong hợp đồng là hoàn toàn đúng sự thật và tự nguyện ký tên dưới đây.
          </p>
        </section>

        <section>
          <h3 className="font-bold text-neutral-950">Điều 12. Điều khoản thi hành</h3>
          <p className="mt-1">
            Hợp đồng này có hiệu lực kể từ ngày ký, được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản.
          </p>
        </section>
      </div>

      {/* Ký tên */}
      <div className="grid grid-cols-2 gap-8 text-center mt-8 pt-6 border-t border-neutral-200">
        <div>
          <p className="font-bold uppercase text-neutral-950">BÊN CHO THUÊ (BÊN A)</p>
          <p className="text-xs italic text-neutral-500 mt-0.5">(Ký và ghi rõ họ tên)</p>
          <div className="h-20 flex items-end justify-center">
            <span className="font-semibold text-neutral-900">{landlord.fullName}</span>
          </div>
        </div>

        <div>
          <p className="font-bold uppercase text-neutral-950">BÊN THUÊ (BÊN B)</p>
          <p className="text-xs italic text-neutral-500 mt-0.5">(Ký và ghi rõ họ tên)</p>
          <div className="h-20 flex items-end justify-center">
            <span className="font-semibold text-neutral-900">{tenant.fullName}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
