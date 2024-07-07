'use client';
import Link from 'next/link';
import { ArrowUpDown, FilterIcon } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

import { calculateAndFormatETA, calculateTATStatus } from '@/utils/convertDate';
import { transporterOption } from '@/utils/constant';
import { cn } from '@/lib/utils';

export type Trip = {
  _id: string;
  tripId: string;
  transporter: string;
  tripStartTime: string;
  currentStatusCode: string;
  currentStatus: string;
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

export const columns: ColumnDef<Trip>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='ml-2'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'tripId',
    header: ({ column }) => {
      return (
        <div className='text-center'>
          <Button
            variant='ghost'
            className='px-1 h-5 focus-visible:ring-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Trip Id
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const tripId: string = row.getValue('tripId');
      return (
        <div className='w-[125px] truncate text-blue-500 font-medium'>
          <Link href={`/${tripId}`}>{tripId}</Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'transporter',
    header: ({ column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2 text-sm'>
          Transporter
          <Button
            variant='ghost'
            className='px-0.5 py-0 h-5 focus-visible:ring-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            <ArrowUpDown className='ml-1 h-4 w-4' />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => column.setFilterValue('')}
                className='text-sm cursor-pointer text-center outline-none transition-colors focus:bg-accent focus:text-accent-foreground py-1.5 font-medium'>
                Clear Filter
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {transporterOption.map((transporter, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={column.getFilterValue() === transporter}
                  onCheckedChange={() => column.setFilterValue(transporter)}>
                  {transporter}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const transporter: string = row.getValue('transporter');
      return <div className='text-center'>{transporter}</div>;
    },
  },
  {
    accessorKey: 'source',
    header: ({ column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2'>
          <Button
            variant='ghost'
            className='px-0.5 py-0 h-5  focus-visible:ring-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Source
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <Input
                className=' focus-visible:ring-transparent'
                value={column.getFilterValue() as string}
                onChange={(event) => column.setFilterValue(event.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: 'dest',
    header: ({ column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2'>
          <Button
            variant='ghost'
            className='px-0.5 py-0 h-5  focus-visible:ring-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Destination
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0  focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <Input
                className=' focus-visible:ring-transparent'
                value={column.getFilterValue() as string}
                onChange={(event) => column.setFilterValue(event.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
    cell: ({ row }) => {
      const dest: string = row.getValue('dest');
      return <div className='text-center'>{dest}</div>;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2 text-sm'>
          Phone
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <Input
                className=' focus-visible:ring-transparent'
                value={column.getFilterValue() as string}
                onChange={(event) => column.setFilterValue(event.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: 'etaDays',
    header: ({ column }) => {
      return (
        <div className='w-[150px] flex items-center justify-center text-center'>
          <Button
            variant='ghost'
            className='px-1 text-center h-4  focus-visible:ring-transparent'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ETA
            <ArrowUpDown className='ml-1 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const etaDate = calculateAndFormatETA(row.original);
      return <div>{etaDate}</div>;
    },
  },
  {
    accessorKey: 'distanceRemaining',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='px-1 text-center  focus-visible:ring-transparent'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Distance Remaining
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const distanceRemaining: number = row.getValue('distanceRemaining');
      return <div className='text-center'>{distanceRemaining}</div>;
    },
  },
  {
    accessorKey: 'currentStatus',
    header: ({ column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2 text-sm'>
          Trip Status
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => column.setFilterValue('')}
                className='text-sm cursor-pointer text-center outline-none transition-colors focus:bg-accent focus:text-accent-foreground py-1.5 font-medium'>
                Clear Filter
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                key='Booked'
                checked={column.getFilterValue() === 'Booked'}
                onCheckedChange={() => column.setFilterValue('Booked')}>
                Booked
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key='In Transit'
                checked={column.getFilterValue() === 'In Transit'}
                onCheckedChange={() => column.setFilterValue('In Transit')}>
                In Transit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key='Reached'
                checked={column.getFilterValue() === 'Reached Destination'}
                onCheckedChange={() => column.setFilterValue('Reached Destination')}>
                Reached
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key='Delivered'
                checked={column.getFilterValue() === 'Delivered'}
                onCheckedChange={() => column.setFilterValue('Delivered')}>
                Delivered
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      let rowValue: string = row.getValue('currentStatus');
      rowValue = rowValue === 'Reached Destination' ? 'Reached' : rowValue;

      return (
        <div>
          <Badge
            variant='secondary'
            className={cn('font-medium w-[80px]', {
              'text-zinc-600': rowValue === 'Reached',
              'bg-blue-50 text-blue-700': rowValue === 'Booked',
              'bg-green-100 text-green-700': rowValue === 'Delivered',
              'bg-orange-100 text-orange-500': rowValue === 'In Transit',
            })}>
            {rowValue}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'TAT Status',
    header: ({ table, column }) => {
      return (
        <div className='text-left flex items-center cursor-pointer px-2 text-sm focus-visible:ring-transparent'>
          TAT Status
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-4 w-4 p-0 focus-visible:ring-transparent'>
                <span className='sr-only'>Open Filter</span>
                <FilterIcon
                  className={cn('ml-0 h-4 w-4', {
                    'text-blue-400': column.getIsFiltered(),
                    'text-gray-500': !column.getIsFiltered(),
                  })}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => column.setFilterValue('')}
                className='text-sm cursor-pointer text-center outline-none transition-colors focus:bg-accent focus:text-accent-foreground py-1.5 font-medium'>
                Clear Filter
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                key='Delayed'
                checked={column.getFilterValue() === 'Delayed'}
                onCheckedChange={() => column.setFilterValue('Delayed')}>
                Delayed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key='Ontime'
                checked={column.getFilterValue() === 'Ontime'}
                onCheckedChange={() => column.setFilterValue('Ontime')}>
                Ontime
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                key='Other'
                checked={column.getFilterValue() === 'Other'}
                onCheckedChange={() => column.setFilterValue('Other')}>
                Other
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const tatStatus = calculateTATStatus(row.original);
      return tatStatus === filterValue;
    },
    cell: ({ row }) => {
      const TATStatus = calculateTATStatus(row.original);
      return (
        <div>
          <Badge
            variant='secondary'
            className={cn('font-medium w-[70px]', {
              'text-zinc-600': TATStatus === 'Other',
              'bg-green-100 text-green-700': TATStatus === 'Ontime',
              'bg-orange-100 text-orange-500': TATStatus === 'Delayed',
            })}>
            {TATStatus}
          </Badge>
        </div>
      );
    },
  },
];
