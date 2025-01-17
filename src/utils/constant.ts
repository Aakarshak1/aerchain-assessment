import { z } from 'zod';

export type Trip = {
  _id: string;
  tripId: string;
  transporter: string;
  tripStartTime: string;
  currentStatusCode: string;
  currenStatus: string;
  phoneNumber: number;
  etaDays: number;
  distanceRemaining: number;
  tripEndTime: string;
  source: string;
  sourceLatitude: number;
  sourceLongitude: number;
  dest: string;
  destLatitude: number;
  destLongitude: number;
  lastPingTime: string;
  createdAt: string;
};

export const transporterOption = ['Bluedart', 'DHL', 'DTDC', 'FedEx', 'Delhivery'] as const;

export const statusOption = ['Booked', 'In Transit', 'Reached Destination', 'Delivered'] as const;

export const addTripFormSchema = z.object({
  tripId: z.string().min(1, {
    message: 'Trip ID is required.',
  }),
  transporter: z.enum(transporterOption, {
    message: 'Transporter is required.',
  }),
  source: z.string().min(1, {
    message: 'Source is required.',
  }),
  dest: z.string().min(1, {
    message: 'Destination is required.',
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'Invalid phone number. it should be min 10 number',
    })
    .max(10, {
      message: 'Invalid phone number. it should not be greater than 10 number',
    }),
});

export const updateStatusFromSchema = z.object({
  status: z.enum(statusOption, {
    message: 'Status is required.',
  }),
  time: z.date({
    message: 'Time is required',
  }),
});

export const getCurrentStatusCode = (status: string) => {
  switch (status) {
    case 'Booked':
      return 'BKD';
    case 'Delivered':
      return 'DEL';
    case 'In Transit':
      return 'INT';
    case 'Reached Destination':
      return 'RD';
  }
};