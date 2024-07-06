import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import AddTripModal from './AddTripModal';
import UpdateStatusModal from './UpdateStatusModal';

const TableContainer = () => {
  return (
    <div className='flex w-full gap-10 justify-between'>
      <Card className='w-full h-[500px] rounded-md px-1 shadow'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-lg'> Trip List</CardTitle>
          <div className='flex gap-3'>
            <UpdateStatusModal />
            <AddTripModal />
          </div>
        </CardHeader>
        <CardContent>table here</CardContent>
      </Card>
    </div>
  );
};

export default TableContainer;
