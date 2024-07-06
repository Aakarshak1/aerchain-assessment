import { z } from 'zod';

export const transporterOption = ['Blue dart', 'DHL', 'DTDC', 'FedEx', 'Delhivery'] as const;

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
  destination: z.string().min(1, {
    message: 'Destination is required.',
  }),
  phone: z.number().min(10, {
    message: 'Invalid phone number. it should be max 10 number',
  }),
});


export const updateStatusFrom = z.object({
  transporter: z.enum(transporterOption, {
    message: 'Transporter is required.',
  }),
  time: z.date({
    message: 'Time is required',
  }),
});