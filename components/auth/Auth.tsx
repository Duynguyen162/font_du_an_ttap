"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

/* ================== TYPES ================== */

type AuthMode = "login" | "register" | "restore";

interface AuthFormProps {
  mode: AuthMode;
}

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
  const router = useRouter();
  const content = CONTENT_CONFIG[mode];
  const isRestore = mode === "restore";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const titleWords = content.leftTitle.split(" ");
  const firstLine = titleWords.slice(0, 2).join(" ");
  const secondLine = titleWords.slice(2).join(" ");

  /* ================== SUBMIT ================== */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      let response: Response;

      if (mode === "login") {
        response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.msnv,
            password: data.password,
          }),
        });
      } else if (mode === "register") {
        response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/auth/restore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ msnv: data.msnv }),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Xảy ra lỗi");
      }

      // LOGIN SUCCESS
      if (mode === "login") {
        // nếu backend trả token:
        localStorage.setItem("accessToken", result.token);

        // Lưu token vào cookie (để middleware đọc được)
        document.cookie = `accessToken=${result.token}; path=/;`;

        router.push("/main/dashboard");
      } else {
        alert(result.message || "Thành công!");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Không thể kết nối server");
    } finally {
      setIsLoading(false);
    }
  };

  /* ================== JSX ================== */

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* LEFT */}
        <div className={styles.leftPanel}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>⚡</div>
            <span className={styles.brandText}>ECG WORKFLOW</span>
          </div>

          <div className={styles.heroText}>
            <h1>
              {firstLine}
              <br />
              {secondLine}
            </h1>
            <p>{content.leftSubtitle}</p>
          </div>

          <div className={styles.footerText}>© 2026 ĐH THỦY LỢI</div>
          <div className={styles.glowCircle}></div>
        </div>

        {/* RIGHT */}
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
              {"rightHeader" in content && (
                <>
                  <h2>{content.rightHeader}</h2>
                  <p>{content.rightSubHeader}</p>
                </>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <div style={{ color: "red", fontSize: 12 }}>{errorMsg}</div>
            )}

            {mode === "register" && (
              <div className={`${styles.inputGroup} ${styles.row}`}>
                <input
                  name="msnv"
                  className={styles.input}
                  placeholder="MSNV..."
                  required
                />
                <input
                  name="cchn"
                  className={styles.input}
                  placeholder="CCHN..."
                  required
                />
              </div>
            )}

            {(mode === "login" || mode === "restore") && (
              <div className={styles.inputGroup}>
                <input
                  name="msnv"
                  className={styles.input}
                  placeholder="MSNV..."
                  required
                />
              </div>
            )}

            {mode === "register" && (
              <div className={styles.inputGroup}>
                <input
                  name="fullName"
                  className={styles.input}
                  placeholder="Họ tên..."
                  required
                />
              </div>
            )}

            {!isRestore && (
              <div className={styles.inputGroup}>
                <input
                  name="password"
                  type="password"
                  className={styles.input}
                  placeholder="Mật khẩu..."
                  required
                />

                {mode === "login" && (
                  <Link href="/auth/restore" className={styles.forgotLink}>
                    Quên mật khẩu?
                  </Link>
                )}
              </div>
            )}

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : content.btnText}
            </button>

            {isRestore && (
              <Link href="/auth/login" className={styles.backLink}>
                ← Quay lại đăng nhập
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
