import React from 'react';
import styles from './StatusButton.module.css';

// Định nghĩa kiểu dữ liệu cho Props
interface StatusButtonProps {
  label?: string;      // Dấu ? nghĩa là không bắt buộc (vì có giá trị mặc định)
  onClick?: () => void; // Hàm xử lý click (nếu cần sau này)
}

const StatusButton: React.FC<StatusButtonProps> = ({ label = "NGHI MI", onClick }) => {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {label}
    </button>
  );
};

export default StatusButton;