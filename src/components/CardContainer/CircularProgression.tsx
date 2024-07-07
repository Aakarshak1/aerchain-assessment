'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type CircularProgressionProps = {
  percentage: number;
};

const CircularProgression = ({ percentage }: CircularProgressionProps) => {
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      className='h-14 w-12'
      strokeWidth={12}
      styles={buildStyles({
        pathColor: `rgba(22, 163, 74, ${percentage / 100})`,
        textColor: '#4B5563',
        trailColor: '#f1f5f9',
      })}
    />
  );
};

export default CircularProgression;
