'use client';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DataTable } from './DataTable';
import { columns } from './Columns';

import { Trip } from '@/utils/constant';

type TableContainerProps = {
  tripData: Trip[];
  children: ReactNode;
  setSelectedRow: Dispatch<SetStateAction<Trip | undefined>>;
};

const TableContainer = ({ setSelectedRow, tripData, children }: TableContainerProps) => {
  return (
    <div className='flex w-full gap-10 justify-between overflow-x-auto'>
      <Card className='w-full h-[580px] rounded-md px-1 shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-1 p-4'>
          <CardTitle className='text-lg'>Trip List</CardTitle>
          <div className='flex gap-3'>{children}</div>
        </CardHeader>
        <CardContent className='p-3 pt-0'>
          <DataTable columns={columns} data={tripData} setSelectedRow={setSelectedRow} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TableContainer;
