import React from 'react';

interface DonutChartProps {
  percentage: number; // Giá trị phần trăm (0-100)
  color?: string;     // Màu của thanh (mặc định là đỏ)
  size?: number;      // Kích thước vòng tròn
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  percentage, 
  color = '#f43f5e', 
  size = 120, 
  strokeWidth = 10 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* SVG Circle */}
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Circle (Vòng xám mờ) */}
        <circle
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle (Vòng màu) */}
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {/* Số phần trăm ở giữa */}
      <div style={{ position: 'absolute', fontWeight: 800, fontSize: '20px', color: '#1e293b' }}>
        {percentage}%
      </div>
    </div>
  );
};

export default DonutChart;