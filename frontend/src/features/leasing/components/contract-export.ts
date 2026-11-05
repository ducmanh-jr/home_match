import type { LeaseContract } from "../types";
import { formatMoney } from "@/features/listings/constants";
import { getSpecificCategoryClauses, getGeneralClauses } from "./contract-content";

export function generateContractHtml(contract: LeaseContract): string {
  const landlord = contract.landlord;
  const tenant = contract.tenant;
  const terms = contract.rentalTerms;
  const general = getGeneralClauses(contract);
  const specificCategoryClauses = getSpecificCategoryClauses(contract);

  const today = new Date();
  const dayStr = today.getDate().toString().padStart(2, "0");
  const monthStr = (today.getMonth() + 1).toString().padStart(2, "0");
  const yearStr = today.getFullYear().toString();

  const specificClausesHtml = specificCategoryClauses
    .map(
      c => `
  <h3>${c.title}</h3>
  ${c.paragraphs.map(p => `<p>${p}</p>`).join("\n  ")}
      `,
    )
    .join("\n");

  return `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 15">
<meta name="Originator" content="Microsoft Word 15">
<title>Hợp đồng thuê nhà ở - ${contract.code}</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page Section1 {
    size: 210mm 297mm;
    margin: 25mm 20mm 20mm 20mm;
    mso-header-margin: 36pt;
    mso-footer-margin: 36pt;
    mso-paper-source: 0;
  }
  div.Section1 { page: Section1; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13pt;
    line-height: 1.5;
    color: #000000;
    mso-ascii-font-family: 'Times New Roman';
    mso-fareast-font-family: 'Times New Roman';
    mso-hansi-font-family: 'Times New Roman';
    mso-bidi-font-family: 'Times New Roman';
  }
  p, div, td, th, span, h1, h2, h3, h4, i, b {
    font-family: 'Times New Roman', Times, serif;
    mso-ascii-font-family: 'Times New Roman';
    mso-fareast-font-family: 'Times New Roman';
    mso-hansi-font-family: 'Times New Roman';
    mso-bidi-font-family: 'Times New Roman';
  }
  h1 { text-align: center; font-size: 16pt; margin: 20pt 0 10pt; font-weight: bold; text-transform: uppercase; }
  h2 { font-size: 13pt; margin: 15pt 0 5pt; font-weight: bold; }
  h3 { font-size: 13pt; margin: 12pt 0 4pt; font-weight: bold; }
  p { margin: 4pt 0; text-align: justify; }
  .text-center { text-align: center; }
  .qh { font-weight: bold; font-size: 12pt; margin: 0; text-transform: uppercase; }
  .tn { font-weight: bold; font-size: 11pt; margin: 0; }
  .gach { margin: 0 0 15pt; text-align: center; }
  .can-cu { font-style: italic; text-align: center; font-size: 11pt; margin-bottom: 15pt; }
  .signature-table { width: 100%; margin-top: 40pt; border-collapse: collapse; }
  .signature-table td { width: 50%; text-align: center; vertical-align: top; }
  .sign-space { height: 70pt; }
</style>
</head>
<body lang="vi-VN">
<div class="Section1">
  <div class="text-center">
    <p class="qh">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
    <p class="tn">Độc lập – Tự do – Hạnh phúc</p>
    <p class="gach">-------o0o-------</p>
  </div>

  <h1>HỢP ĐỒNG THUÊ NHÀ Ở</h1>
  <p class="can-cu">Căn cứ Bộ luật Dân sự 2015; Luật Nhà ở 2023; Luật Giao dịch điện tử 2023 và thoả thuận của các bên.</p>

  <p>Hôm nay, ngày ${dayStr} tháng ${monthStr} năm ${yearStr}, các bên gồm:</p>

  <h2>BÊN CHO THUÊ (BÊN A)</h2>
  <p><b>Họ và tên:</b> ${landlord.fullName || "................................................................"}</p>
  <p><b>Số CCCD/CMND:</b> ${landlord.identityNumber || "........................"}</p>
  <p><b>Địa chỉ thường trú:</b> ${landlord.address || "................................................................"}</p>
  <p><b>Số điện thoại:</b> ${landlord.phone || "........................"}</p>
  ${landlord.bankAccount ? `<p><b>Tài khoản ngân hàng:</b> ${landlord.bankAccount} tại ${landlord.bankName || ""}</p>` : ""}

  <h2>BÊN THUÊ (BÊN B)</h2>
  <p><b>Họ và tên:</b> ${tenant.fullName || "................................................................"}</p>
  <p><b>Số CCCD/CMND:</b> ${tenant.identityNumber || "........................"}</p>
  <p><b>Địa chỉ thường trú:</b> ${tenant.address || "................................................................"}</p>
  <p><b>Số điện thoại:</b> ${tenant.phone || "........................"}</p>

  <p style="margin-top: 15pt; font-style: italic;">Hai bên thống nhất ký kết hợp đồng thuê nhà ở với các điều khoản sau:</p>

  <h3>Điều 1. Đối tượng của hợp đồng</h3>
  <p>1.1. Bên cho thuê đồng ý cho thuê và Bên thuê đồng ý thuê nhà ở tại địa chỉ: <b>${contract.propertyAddress}</b></p>
  <p>1.2. Đặc điểm nhà ở: Phòng ${contract.roomCode}, diện tích sử dụng ${contract.roomArea} m².</p>
  <p>1.3. Đặc điểm thửa đất gắn với nhà ở: Theo hồ sơ đăng ký địa chính.</p>
  <p>1.4. Giấy tờ về quyền sở hữu / quyền sử dụng: Đầy đủ giấy tờ hợp pháp.</p>
  <p>1.5. Trang thiết bị, nội thất bàn giao kèm: ${contract.furnitureNotes || "Theo biên bản bàn giao thực tế."}</p>
  <p>1.6. Mục đích thuê: sử dụng để ở. Bên thuê không được chuyển nhượng hợp đồng hoặc cho thuê lại toàn bộ hay một phần nhà ở khi chưa có văn bản đồng ý của Bên cho thuê.</p>

  <h3>Điều 2. Thời hạn thuê và thời điểm giao nhận nhà</h3>
  <p>2.1. Thời hạn thuê: Từ ngày <b>${contract.startDate || "......"}</b> đến hết ngày <b>${contract.endDate || "......"}</b>.</p>
  <p>2.2. Thời điểm bàn giao nhà ở: ngày <b>${contract.handoverDate || contract.startDate || "......"}</b>.</p>
  <p>2.3. Hết hạn hợp đồng, nếu Bên thuê có nhu cầu tiếp tục thuê thì phải thông báo trước <b>${general.noticeDays}</b> ngày để hai bên tiến hành gia hạn.</p>

  <h3>Điều 3. Giá thuê, tiền đặt cọc và phương thức thanh toán</h3>
  <p>3.1. Giá thuê nhà ở là: <b>${terms.monthlyRent ? `${formatMoney(terms.monthlyRent)}/tháng` : "……………………………… đồng/tháng"}</b>.</p>
  <p>3.2. Tiền đặt cọc bảo đảm thực hiện hợp đồng: <b>${terms.depositAmount ? formatMoney(terms.depositAmount) : "……………………………… đồng"}</b>.</p>
  <p>3.3. Phương thức thanh toán: ${terms.paymentMethod === "transfer" ? `Chuyển khoản qua tài khoản ngân hàng (Thông tin nhận tiền: ${general.bankPaymentText})` : "Tiền mặt trực tiếp"}.</p>
  <p>3.4. Kỳ thanh toán: ${general.cycleText}, đến hạn vào ngày <b>${terms.paymentDueDay}</b> của mỗi kỳ.</p>

  ${specificClausesHtml}

  <h3>Điều 7. Quyền và nghĩa vụ của Bên cho thuê (Bên A)</h3>
  <p>7.1. Bàn giao nhà ở và trang thiết bị đúng thời hạn thỏa thuận.</p>
  <p>7.2. Yêu cầu Bên thuê thanh toán tiền thuê và các chi phí đầy đủ, đúng hạn.</p>

  <h3>Điều 8. Quyền và nghĩa vụ của Bên thuê (Bên B)</h3>
  <p>8.1. Nhận bàn giao nhà và sử dụng nhà ở đúng mục đích sinh hoạt hợp pháp.</p>
  <p>8.2. Chấp hành các quy định pháp luật về an ninh trật tự và phòng cháy chữa cháy.</p>

  <h3>Điều 9. Chấm dứt hợp đồng</h3>
  <p>9.1. Hợp đồng chấm dứt khi hết thời hạn thuê mà hai bên không gia hạn.</p>
  <p>9.2. Bên đơn phương chấm dứt trước hạn phải thông báo bằng văn bản cho bên kia trước ít nhất <b>${general.noticeDays}</b> ngày.</p>

  <h3>Điều 10. Giải quyết tranh chấp</h3>
  <p>10.1. Mọi tranh chấp phát sinh được ưu tiên giải quyết qua thương lượng, hòa giải.</p>
  <p>10.2. Trường hợp không hòa giải được, tranh chấp sẽ được giải quyết tại Tòa án có thẩm quyền.</p>

  <h3>Điều 11. Cam kết của các bên</h3>
  <p>Hai bên cam kết thông tin đã khai là hoàn toàn đúng sự thật và tự nguyện ký tên dưới đây.</p>

  <h3>Điều 12. Điều khoản thi hành</h3>
  <p>Hợp đồng này có hiệu lực kể từ ngày ký, được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản.</p>

  <table class="signature-table">
    <tr>
      <td>
        <b>BÊN CHO THUÊ (BÊN A)</b><br>
        <i>(Ký và ghi rõ họ tên)</i>
        <div class="sign-space"></div>
        <b>${landlord.fullName || ""}</b>
      </td>
      <td>
        <b>BÊN THUÊ (BÊN B)</b><br>
        <i>(Ký và ghi rõ họ tên)</i>
        <div class="sign-space"></div>
        <b>${tenant.fullName || ""}</b>
      </td>
    </tr>
  </table>
</div>
</body>
</html>
  `.trim();
}

export function downloadContractDoc(contract: LeaseContract) {
  const htmlContent = generateContractHtml(contract);
  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Hop-dong-thue-${contract.roomCode}-${contract.code}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printContractViaIsolatedIframe(elementId: string = "contract-paper-document", filename?: string) {
  if (typeof window === "undefined") return;

  const targetEl = document.getElementById(elementId);
  if (!targetEl) {
    window.print();
    return;
  }

  // Xóa iframe cũ nếu có
  const oldIframe = document.getElementById("homematch-contract-print-iframe");
  if (oldIframe) {
    oldIframe.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "homematch-contract-print-iframe";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  const title = filename || "Hop_Dong_Thue_Nha_O";

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 20mm 15mm 20mm 15mm;
          }
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            font-family: 'Times New Roman', Times, serif !important;
            color: #000000 !important;
            font-size: 13pt;
            line-height: 1.55;
          }
          p, div, td, th, span, h1, h2, h3, h4, i, b {
            font-family: 'Times New Roman', Times, serif !important;
          }
          h1 {
            text-align: center;
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 18pt 0 8pt;
          }
          h2 {
            font-size: 13pt;
            font-weight: bold;
            margin: 12pt 0 4pt;
          }
          h3 {
            font-size: 13pt;
            font-weight: bold;
            margin: 10pt 0 3pt;
          }
          p {
            margin: 3.5pt 0;
            text-align: justify;
          }
          .text-center { text-align: center; }
          .signature-table {
            width: 100%;
            margin-top: 30pt;
            border-collapse: collapse;
          }
          .signature-table td {
            width: 50%;
            text-align: center;
            vertical-align: top;
          }
          .sign-space { height: 65pt; }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${targetEl.innerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Đợi iframe tải và áp dụng styles rồi mở hộp thoại in / Lưu PDF
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  }, 250);
}

export function printContract(elementId: string = "contract-paper-document", title?: string) {
  printContractViaIsolatedIframe(elementId, title);
}

export function printContractDirectly(contract: LeaseContract) {
  if (typeof window === "undefined") return;

  const oldIframe = document.getElementById("homematch-contract-print-iframe");
  if (oldIframe) {
    oldIframe.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "homematch-contract-print-iframe";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(generateContractHtml(contract));
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  }, 250);
}
