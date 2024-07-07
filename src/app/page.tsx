'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';

import CardContainer from '@/components/CardContainer/CardContainer';
import TableContainer from '@/components/TableContainer/TableContainer';
import AddTripModal from '@/components/TableContainer/AddTripModal';
import UpdateStatusModal from '@/components/TableContainer/UpdateStatusModal';
import AddTripForm from '@/components/TableContainer/AddTripForm';
import UpdateStatusFrom from '@/components/TableContainer/UpdateStatusFrom';

import { Trip } from '@/components/TableContainer/Columns';

import { data } from '@/data/TripData.json';
import { addTripFormSchema, updateStatusFrom } from '@/utils/constant';

type TripValues = z.infer<typeof addTripFormSchema>;
type UpdateData = z.infer<typeof updateStatusFrom>;

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

export default function Home() {
  const [tripData, setTripData] = useState<Trip[]>(data);
  const [addTripModalOpen, setAddTripModal] = useState<boolean>(false);
  const [updateStatusModalOpen, setUpdateStatusModal] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<Trip>();

  const addTrip = (newTrip: TripValues) => {
    setTripData((prevTripData) => {
      const newTripObject: Trip = {
        ...newTrip,
        _id: nanoid(),
        phoneNumber: Number(newTrip.phoneNumber),
        createdAt: dayjs().toISOString(),
        tripStartTime: dayjs().toISOString(),
        currentStatusCode: 'BKD',
        currenStatus: 'Booked',
        etaDays: 0,
        distanceRemaining: 0,
        tripEndTime: '',
        sourceLatitude: 0,
        sourceLongitude: 0,
        destLatitude: 0,
        destLongitude: 0,
        lastPingTime: '',
      };
      return [newTripObject, ...prevTripData];
    });
    setAddTripModal(false);
  };

  const updateTrip = (updatedData: Trip) => {
    const updatedTripData = tripData.map((trip) =>
      trip._id === updatedData._id ? updatedData : trip
    );
    setTripData(updatedTripData);
    setUpdateStatusModal(false);
  };

  return (
    <main className='flex flex-col gap-4 bg-muted/40 p-5'>
      <CardContainer tripData={tripData} />
      <TableContainer tripData={tripData} setSelectedRow={setSelectedRowData}>
        <UpdateStatusModal
          isEmpty={selectedRowData === undefined}
          open={updateStatusModalOpen}
          onOpenChange={setUpdateStatusModal}>
          <UpdateStatusFrom rowData={selectedRowData} updateTrip={updateTrip} />
        </UpdateStatusModal>
        <AddTripModal open={addTripModalOpen} onOpenChange={setAddTripModal}>
          <AddTripForm addTripHandler={addTrip} />
        </AddTripModal>
      </TableContainer>
    </main>
  );
}
