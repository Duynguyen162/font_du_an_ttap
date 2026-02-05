import React from "react";
import styles from "./page.module.css";

// 1. Định nghĩa kiểu dữ liệu cho Bệnh nhân
interface PatientRecord {
  id: string;
  name: string;
  birthYear: number;
}

// 2. Dữ liệu mẫu (Giả lập)
const mockPatients: PatientRecord[] = [
  {
    id: "BN-2251172379",
    name: "NGUYỄN VĂN A",
    birthYear: 1980,
  },
  {
    id: "BN-2251172380",
    name: "TRẦN THỊ B",
    birthYear: 1992,
  },
  {
    id: "BN-2251172381",
    name: "LÊ VĂN C",
    birthYear: 1975,
  },
];

export default function PatientsPage() {
  return (
    <div className={styles.pageContainer}>
      {/* --- Phần Header & Nút Tạo --- */}
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>HỒ SƠ BỆNH NHÂN</h1>
        <button className={styles.createButton}>
          <span>+</span> TẠO HỒ SƠ MỚI
        </button>
      </div>

      {/* --- Phần Bảng dữ liệu --- */}
      <div className={styles.tableContainer}>
        {/* Dòng Tiêu đề (Header) */}
        {/* Sử dụng class gridLayout để căn cột khớp với dòng dữ liệu */}
        <div className={`${styles.gridLayout} ${styles.tableHeader}`}>
          <div className={styles.headerTitle}>MÃ ĐỊNH DANH</div>
          <div className={styles.headerTitle}>HỌ VÀ TÊN</div>
          <div className={styles.headerTitle}>NĂM SINH</div>
          <div className={styles.headerTitle} style={{ textAlign: "right" }}>
            HÀNH ĐỘNG
          </div>
        </div>

        {/* Danh sách Bệnh nhân */}
        <div className={styles.listWrapper}>
          {mockPatients.map((patient) => (
            <div
              key={patient.id}
              className={`${styles.gridLayout} ${styles.dataRow}`}
            >
              <div className={styles.cellId}>{patient.id}</div>
              <div className={styles.cellName}>{patient.name}</div>
              <div className={styles.cellYear}>{patient.birthYear}</div>
              <div className={styles.cellAction}>Xem chi tiết &rarr;</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
