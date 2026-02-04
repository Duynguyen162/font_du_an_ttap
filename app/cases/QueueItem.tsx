import StatusButton from "./StatusButton";
import styles from "./QueueItem.module.css";

// Định nghĩa kiểu dữ liệu cho Props
interface QueueItemProps {
  fileName: string;
  date: string;
  statusLabel: string;
}

const QueueItem: React.FC<QueueItemProps> = ({
  fileName,
  date,
  statusLabel,
}) => {
  return (
    <div className={styles.container}>
      {/* Icon giả lập giống ảnh */}
      <div className={styles.iconWrapper}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      {/* Thông tin Text */}
      <div className={styles.info}>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.fileDate}>NGÀY NHẬN: {date}</span>
      </div>

      {/* Gọi Component Button ở đây */}
      <StatusButton label={statusLabel} />
    </div>
  );
};

export default QueueItem;
