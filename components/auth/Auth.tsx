"use client";

import React from "react";
import Link from "next/link";
import styles from "./Auth.module.css";

type AuthMode = "login" | "register" | "restore";

interface AuthFormProps {
  mode: AuthMode;
}

/* ================== CONTENT TYPES ================== */
type BaseContent = {
  leftTitle: string;
  leftSubtitle: string;
  btnText: string;
};

type RestoreContent = BaseContent & {
  rightHeader: string;
  rightSubHeader: string;
};

type ContentConfig = {
  login: BaseContent;
  register: BaseContent;
  restore: RestoreContent;
};

/* ================== CONTENT CONFIG ================== */
const CONTENT_CONFIG: ContentConfig = {
  login: {
    leftTitle: "Truy Cập Hệ Thống",
    leftSubtitle: "BS: THANH HUYỀN",
    btnText: "Vào hệ thống quản trị",
  },
  register: {
    leftTitle: "Đăng Ký Danh Tính",
    leftSubtitle: "ĐH THỦY LỢI",
    btnText: "Gửi hồ sơ duyệt",
  },
  restore: {
    leftTitle: "Khôi Phục Mật Khẩu",
    leftSubtitle: "HỆ THỐNG SẼ GỬI MÃ XÁC THỰC ĐẾN EMAIL CÔNG VỤ ĐÃ ĐĂNG KÝ.",
    btnText: "Gửi yêu cầu khôi phục",
    rightHeader: "QUÊN MẬT KHẨU?",
    rightSubHeader: "VUI LÒNG NHẬP MSNV ĐỂ NHẬN HỖ TRỢ.",
  },
};

/* ================== COMPONENT ================== */
export default function AuthComponent({ mode }: AuthFormProps) {
  const content = CONTENT_CONFIG[mode];
  const isRestore = mode === "restore";

  // Tách title thành 2 dòng tự động
  const titleWords = content.leftTitle.split(" ");
  const firstLine = titleWords.slice(0, 2).join(" ");
  const secondLine = titleWords.slice(2).join(" ");

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* === LEFT PANEL === */}
        <div className={styles.leftPanel}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>⚡</div>
            <span className={styles.brandText}>ECG WORKFLOW</span>
          </div>

          <div className={styles.heroText}>
            <h1>
              {firstLine} <br />
              {secondLine}
            </h1>
            <p>{content.leftSubtitle}</p>
          </div>

          <div className={styles.footerText}>© 2026 ĐH THỦY LỢI</div>

          <div className={styles.glowCircle}></div>
        </div>

        {/* === RIGHT PANEL === */}
        <div className={styles.rightPanel}>
          {!isRestore ? (
            <div className={styles.tabs}>
              <Link
                href="/auth/login"
                className={`${styles.tabItem} ${
                  mode === "login" ? styles.active : ""
                }`}
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/register"
                className={`${styles.tabItem} ${
                  mode === "register" ? styles.active : ""
                }`}
              >
                Đăng ký chi tiết
              </Link>
            </div>
          ) : (
            <div className={styles.formHeader}>
              {isRestore &&
                "rightHeader" in content &&
                "rightSubHeader" in content && (
                  <>
                    <h2>{content.rightHeader}</h2>
                    <p>{content.rightSubHeader}</p>
                  </>
                )}
            </div>
          )}

          <form>
            {/* REGISTER: 2 input hàng đầu */}
            {mode === "register" && (
              <div className={`${styles.inputGroup} ${styles.row}`}>
                <input className={styles.input} placeholder="MSNV..." />
                <input className={styles.input} placeholder="Số hiệu CCHN..." />
              </div>
            )}

            {/* LOGIN & RESTORE: MSNV */}
            {(mode === "login" || mode === "restore") && (
              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  placeholder={
                    mode === "restore"
                      ? "Nhập MSNV: 2251172379..."
                      : "MSNV: 2251172379..."
                  }
                />
              </div>
            )}

            {/* REGISTER: Họ tên */}
            {mode === "register" && (
              <div className={styles.inputGroup}>
                <input className={styles.input} placeholder="Họ và tên..." />
              </div>
            )}

            {/* PASSWORD (không có ở restore) */}
            {!isRestore && (
              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Mật khẩu..."
                />

                {mode === "login" && (
                  <Link href="/auth/restore" className={styles.forgotLink}>
                    Quên mật khẩu?
                  </Link>
                )}
              </div>
            )}

            <button type="button" className={styles.btnSubmit}>
              {content.btnText}
            </button>

            {isRestore && (
              <Link href="/auth/login" className={styles.backLink}>
                ← QUAY LẠI ĐĂNG NHẬP
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
