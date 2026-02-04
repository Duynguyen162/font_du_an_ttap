import React from "react";
import styles from "./ImageViewer.module.css";

interface ImageViewerProps {
  title?: string;
  imageSrc?: string; // Đường dẫn ảnh (nếu có)
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  title = "ẢNH ECG RAW (FULL SIZE)",
  imageSrc,
}) => {
  return (
    <div className={styles.container}>
      {/* Header: Tiêu đề + Nút điều khiển */}
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.controls}>
          <button className={styles.controlButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            XOAY
          </button>
          <button className={styles.controlButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            ZOOM
          </button>
        </div>
      </div>

      {/* Vùng hiển thị ảnh */}
      <div className={styles.imageArea}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="ECG"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          /* Placeholder Icon (Giống ảnh mẫu) */
          <svg
            className={styles.placeholderIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M8.5 10a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
