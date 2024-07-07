import { Trip } from '@/components/TableContainer/Columns';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const calculateAndFormatETA = ({ tripStartTime, etaDays }: Trip) => {
  const etaDate = dayjs(tripStartTime).add(etaDays, 'day');
  return etaDate.format('DD/MM/YYYY hh:mm A');
};

export const calculateTATStatus = ({ tripStartTime, etaDays, tripEndTime, lastPingTime }: Trip) => {
  if (etaDays <= 0) {
    return 'Other';
  }

  const tripStart = dayjs(tripStartTime);
  const tripEnd = tripEndTime ? dayjs(tripEndTime) : dayjs(lastPingTime);
  const tripDuration = tripEnd.diff(tripStart, 'day');

  if (etaDays >= tripDuration) {
    return 'Ontime';
  } else {
    return 'Delayed';
  }
};
