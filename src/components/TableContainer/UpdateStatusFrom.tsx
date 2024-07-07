'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import dayjs from 'dayjs';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { DialogClose, DialogFooter } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Trip, statusOption, updateStatusFromSchema, getCurrentStatusCode } from '@/utils/constant';

type UpdateStatusFormProps = {
  rowData: Trip;
  updateTrip: (args: Trip) => void;
};

const UpdateStatusFrom = ({ rowData, updateTrip }: UpdateStatusFormProps) => {
  const form = useForm<z.infer<typeof updateStatusFromSchema>>({
    resolver: zodResolver(updateStatusFromSchema),
    defaultValues: {
      // @ts-ignore
      status: rowData?.currenStatus ?? 'Booked',
    },
  });

  function onSubmit(values: z.infer<typeof updateStatusFromSchema>) {
    const updateRowData = {
      ...rowData,
      currenStatus: values.status,
      currentStatusCode: getCurrentStatusCode(values.status),
      lastPingTime: dayjs(values.time).toISOString(),
    };

    if (values.status === 'Delivered') {
      updateRowData.tripEndTime = dayjs(values.time).toISOString();
    }

    updateTrip(updateRowData as Trip);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-wrap flex-col gap-4'>
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[300px] mt-2'>
              <FormLabel
                htmlFor='input-with-label'
                className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1 '>
                Status
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className='placeholder:text-gray-500'
                        placeholder='Select Status '
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOption.map((status, index) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[300px] mt-2'>
              <FormLabel
                htmlFor='input-with-label'
                className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1 '>
                Time
              </FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity='minute'
                  hourCycle={24}
                  shouldForceLeadingZeros
                  showClearButton={false}
                  onJsDateChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <div className='flex justify-end gap-4'>
            <DialogClose asChild>
              <Button type='button' variant={'outline'}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' className='w-[120px] bg-blue-500'>
              Update Status
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateStatusFrom;
