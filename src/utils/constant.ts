import { z } from 'zod';

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

export const updateStatusFrom = z.object({
  status: z.enum(statusOption, {
    message: 'Status is required.',
  }),
  time: z.date({
    message: 'Time is required',
  }),
});