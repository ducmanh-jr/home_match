import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>404</h1>
      <p style={{ fontSize: "18px", color: "#64748b", marginBottom: "24px" }}>
        Không tìm thấy trang bạn yêu cầu.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#f97316",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Về trang chủ
      </Link>
    </div>
  );
}

