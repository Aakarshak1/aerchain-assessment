'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { DialogClose, DialogFooter } from '../ui/dialog';

import { transporterOption, updateStatusFrom } from '@/utils/constant';

const UpdateStatusFrom = () => {
  const form = useForm<z.infer<typeof updateStatusFrom>>({
    resolver: zodResolver(updateStatusFrom),
  });

  function onSubmit(values: z.infer<typeof updateStatusFrom>) {
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-wrap flex-col gap-4'>
        <FormField
          control={form.control}
          name='transporter'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[300px] mt-2'>
              <FormLabel
                htmlFor='input-with-label'
                className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1 '>
                Transporter
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className='placeholder:text-gray-500'
                        placeholder='Select Transporter '
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transporterOption.map((transporter, index) => (
                      <SelectItem key={index} value={transporter}>
                        {transporter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  */}

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
