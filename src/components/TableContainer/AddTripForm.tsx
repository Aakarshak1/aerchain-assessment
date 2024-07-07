'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { transporterOption, addTripFormSchema } from '@/utils/constant';

type addTripValues = z.infer<typeof addTripFormSchema>;

type addTripFromProps = {
  addTripHandler: (values: addTripValues) => void;
};

const AddTripForm = ({ addTripHandler }: addTripFromProps) => {
  const form = useForm<z.infer<typeof addTripFormSchema>>({
    resolver: zodResolver(addTripFormSchema),
    defaultValues: {
      tripId: '',
      source: '',
      dest: '',
    },
  });

  function onSubmit(values: z.infer<typeof addTripFormSchema>) {
    addTripHandler(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5 flex flex-wrap flex-col gap-4'>
        <div className='flex flex-row justify-between w-full gap-5 mt-2'>
          <FormField
            control={form.control}
            name='tripId'
            render={({ field }) => (
              <FormItem className='relative space-y-0 w-[270px]'>
                <FormLabel
                  htmlFor='input-with-label'
                  className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500 before:content-["*"] before:text-red-500 before:-ml-1'>
                  Trip ID
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete='off'
                    id='input-with-label'
                    placeholder='Trip ID'
                    className='pr-9 text-foreground focus:border-primary focus-visible:ring-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='transporter'
            render={({ field }) => (
              <FormItem className='relative space-y-0 w-[270px]'>
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
        </div>

        <div className='flex flex-row justify-between w-full gap-5'>
          <FormField
            control={form.control}
            name='source'
            render={({ field }) => (
              <FormItem className='relative space-y-0 w-[270px]'>
                <FormLabel
                  htmlFor='input-with-label'
                  className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1 '>
                  Source
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete='off'
                    id='input-with-label'
                    placeholder='Source'
                    className='pr-9 text-foreground focus:border-primary focus-visible:ring-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dest'
            render={({ field }) => (
              <FormItem className='relative space-y-0 w-[270px]'>
                <FormLabel
                  htmlFor='input-with-label'
                  className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1 '>
                  Destination
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete='off'
                    id='input-with-label'
                    placeholder='Destination'
                    className='pr-9 text-foreground focus:border-primary focus-visible:ring-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem className='relative space-y-0  w-[270px]'>
              <FormLabel
                htmlFor='input-with-label'
                className='absolute left-3 -top-2 bg-background px-1 text-xs text-gray-500  before:content-["*"] before:text-red-500 before:-ml-1'>
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete='off'
                  type='number'
                  id='input-with-label'
                  placeholder='Phone'
                  className='pr-9 text-foreground focus:border-primary focus-visible:ring-transparent hide-arrow'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className='flex justify-end gap-2'>
          <DialogClose asChild>
            <Button type='button' variant={'outline'}>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' className='w-[120px] bg-blue-500'>
            Add Trip
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddTripForm;
