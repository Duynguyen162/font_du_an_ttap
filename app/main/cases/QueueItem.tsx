import StatusButton from "./StatusButton";
import styles from "./QueueItem.module.css";

// Định nghĩa kiểu dữ liệu cho Props
interface QueueItemProps {
  patientName: string;
  patientCode: string;
  measuredAt: string;
  status: string;
  imageCount: number;
}
const QueueItem: React.FC<QueueItemProps> = ({
  patientName,
  patientCode,
  measuredAt,
  status,
  imageCount,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>{/* ...existing SVG... */}</div>
      <div className={styles.info}>
        <span className={styles.fileName}>Tên BN: {patientName}</span>
        <span className={styles.fileCode}>Mã BN: {patientCode}</span>
        <span className={styles.fileDate}>Ngày đo: {measuredAt}</span>
        <span className={styles.imageCount}>Số ảnh: {imageCount}</span>
      </div>
      <StatusButton label={status} />
    </div>
  );
};

export default QueueItem;
