"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
} from "lucide-react";

export function SecuritySettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);
    setSecuritySuccess(null);

    if (!currentPassword.trim()) {
      setSecurityError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (newPassword.length < 8) {
      setSecurityError("Mật khẩu mới phải có tối thiểu 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    setSecuritySuccess("Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới của bạn.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setSecuritySuccess(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Title */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <Shield size={18} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Đổi mật khẩu</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Cập nhật mật khẩu định kỳ để bảo vệ tài khoản và dữ liệu quản lý phòng của bạn.
          </p>
        </div>
      </div>

      {/* Security Form */}
      <form onSubmit={handleSaveSecurity} className="flex flex-col gap-4 max-w-xl">
        {securityError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            <AlertCircle size={15} className="text-rose-600 shrink-0" />
            <span>{securityError}</span>
          </div>
        )}

        {securitySuccess && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
            <span>{securitySuccess}</span>
          </div>
        )}

        {/* Mật khẩu hiện tại */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPass" className="text-xs font-medium text-slate-700">
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              id="currentPass"
              type={showCurrentPass ? "text" : "password"}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full h-10 pl-3.5 pr-10 rounded-lg border border-slate-200/90 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white transition-colors"
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPass" className="text-xs font-medium text-slate-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="newPass"
              type={showNewPass ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full h-10 pl-3.5 pr-10 rounded-lg border border-slate-200/90 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white transition-colors"
              placeholder="Tối thiểu 8 ký tự, bao gồm chữ và số"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPass" className="text-xs font-medium text-slate-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="confirmPass"
              type={showConfirmPass ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full h-10 pl-3.5 pr-10 rounded-lg border border-slate-200/90 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white transition-colors"
              placeholder="Nhập lại mật khẩu mới"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      {/* Info Note Box */}
      <div className="flex items-start gap-2.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs text-slate-700 leading-relaxed max-w-2xl mt-2">
        <ShieldCheck size={16} className="text-blue-600 mt-0.5 shrink-0" />
        <p>
          Mật khẩu cần có độ dài tối thiểu 8 ký tự. Bạn nên sử dụng mật khẩu mạnh kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt để đảm bảo an toàn tối đa cho tài khoản.
        </p>
      </div>
    </div>
  );
}

