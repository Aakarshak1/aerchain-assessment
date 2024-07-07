'use client';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import dayjs from 'dayjs';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AddTripModal from './AddTripModal';
import UpdateStatusModal from './UpdateStatusModal';
import { DataTable } from './DataTable';

import { columns, Trip } from './Columns';
import { data } from '@/data/TripData.json';

import { addTripFormSchema } from '@/utils/constant';
import AddTripForm from './AddTripForm';

const TableContainer = ({
  setSelectedRow,
  tripData,
  children,
}: {
  setSelectedRow: Dispatch<SetStateAction<Trip | undefined>>;
  tripData: Trip[];
  children: ReactNode;
}) => {
  return (
    <div className='flex w-full gap-10 justify-between overflow-x-auto'>
      <Card className='w-full h-[580px] rounded-md px-1 shadow'>
        <CardHeader className='flex flex-row items-center justify-between space-y-1 p-4'>
          <CardTitle className='text-lg'>Trip List</CardTitle>
          <div className='flex gap-3'>
            {/* <UpdateStatusModal />
            <AddTripModal>
              <AddTripForm addTripHandler={addTrip} />
            </AddTripModal> */}
            {children}
          </div>
        </CardHeader>
        <CardContent className='p-3 pt-0'>
          <DataTable columns={columns} data={tripData} setSelectedRow={setSelectedRow} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TableContainer;
