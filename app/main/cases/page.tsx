import QueueItem from './QueueItem';
import styles from './page.module.css';

// Dữ liệu mẫu (Giả lập từ API)
const mockData = [
  {
    id: 1,
    fileName: 'ECG_RAW_DATA_HUYEN.PNG',
    date: '23/01/2026',
    status: 'NGHI MI' // MI có thể là Myocardial Infarction (Nhồi máu cơ tim)
  },
  {
    id: 2,
    fileName: 'ECG_RAW_DATA_NAM.PNG',
    date: '24/01/2026',
    status: 'BÌNH THƯỜNG'
  },
   {
    id: 3,
    fileName: 'ECG_S12_PATIENT_003.PNG',
    date: '24/01/2026',
    status: 'NGHI MI'
  }
];

export default function QueuePage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>HÀNG ĐỢI FILE ECG</h1>
      
      <div className={styles.listWrapper}>
        {mockData.map((item) => (
          <QueueItem 
            key={item.id}
            fileName={item.fileName}
            date={item.date}
            statusLabel={item.status}
          />
        ))}
      </div>
    </div>
  );
}