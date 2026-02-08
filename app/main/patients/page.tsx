"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface PatientRecord {
  id: number;
  code: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  note: string;
  createdAt: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy token từ cookie nếu cần xác thực
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return "";
        };
        const token = getCookie("accessToken");

        const res = await fetch("https://98e0-123-24-222-78.ngrok-free.app/api/patients", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (res.status === 401) {
          document.cookie =
            "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.href = "/auth/login";
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: PatientRecord[] = await res.json();
        setPatients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>HỒ SƠ BỆNH NHÂN</h1>
        <button className={styles.createButton}>
          <span>+</span> TẠO HỒ SƠ MỚI
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={`${styles.gridLayout} ${styles.tableHeader}`}>
          <div className={styles.headerTitle}>MÃ ĐỊNH DANH</div>
          <div className={styles.headerTitle}>HỌ VÀ TÊN</div>
          <div className={styles.headerTitle}>NĂM SINH</div>
          <div className={styles.headerTitle} style={{ textAlign: "right" }}>
            HÀNH ĐỘNG
          </div>
        </div>

        <div className={styles.listWrapper}>
          {loading ? (
            <div>Đang tải...</div>
          ) : error ? (
            <div style={{ color: "red" }}>Lỗi: {error}</div>
          ) : patients.length === 0 ? (
            <div>Không có dữ liệu</div>
          ) : (
            patients.map((patient) => (
              <div
                key={patient.id}
                className={`${styles.gridLayout} ${styles.dataRow}`}
              >
                <div className={styles.cellId}>{patient.code}</div>
                <div className={styles.cellName}>{patient.name}</div>
                <div className={styles.cellYear}>
                  {patient.dateOfBirth?.split("-")[0] ?? ""}
                </div>
                <div className={styles.cellAction}>Xem chi tiết &rarr;</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
