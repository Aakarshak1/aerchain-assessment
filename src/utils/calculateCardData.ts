import { data } from '@/data/TripData.json';
import { calculateTATStatus } from './convertDate';

export const calculateCardData = () => {
  let totalTripsCount = 0;
  let deliveredCount = 0;
  let inTransitCount = 0;
  let delayedTripsCount = 0;
  let onTimeTripsCount = 0;

  data.forEach((trip) => {
    totalTripsCount++;
    if (trip.currentStatus === 'Delivered') deliveredCount++;
    else if (trip.currentStatus === 'In Transit') inTransitCount++;

    const tatStatus = calculateTATStatus(trip);
    if (tatStatus === 'Delayed') delayedTripsCount++;
    else if (tatStatus === 'Ontime') onTimeTripsCount++;
  });

  const deliveredPercent = ((deliveredCount / totalTripsCount) * 100).toFixed(2);
  const inTransitPercent = ((inTransitCount / totalTripsCount) * 100).toFixed(2);
  const onTimeTripsPercent = Number(((onTimeTripsCount / totalTripsCount) * 100).toFixed());

  return {
    totalTripsCount,
    deliveredCount,
    inTransitCount,
    deliveredPercent,
    inTransitPercent,
    delayedTripsCount,
    onTimeTripsCount,
    onTimeTripsPercent,
  };
};
