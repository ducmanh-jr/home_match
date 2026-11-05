import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeMatch - Nền Tảng Tìm Kiếm & Quản Lý Nhà Trọ Thông Minh",
  description: "Tìm chỗ ở phù hợp theo khu vực, ngân sách và tiện ích. Xem chi phí rõ ràng và đặt lịch xem phòng nhanh cùng HomeMatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
