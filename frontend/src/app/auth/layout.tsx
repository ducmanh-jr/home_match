export const metadata = {
  title: "Đăng nhập | HomeMatch",
  description: "Đăng nhập tài khoản người thuê hoặc chủ nhà HomeMatch.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between antialiased selection:bg-orange-100 selection:text-orange-900">
      {children}
    </div>
  );
}

