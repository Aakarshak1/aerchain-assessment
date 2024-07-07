import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import UpdateStatusFrom from './UpdateStatusFrom';
import { Trip } from '@/utils/constant';
import { ReactNode } from 'react';

const UpdateStatusModal = ({
  isEmpty,
  children,
  open,
  onOpenChange,
}: {
  isEmpty: boolean;
  children: ReactNode;
  open: boolean;
  onOpenChange: (args: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* <Button variant={'outline'} disabled={isEmpty}> */}
        <Button variant={'outline'}>Update Status</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          {/* <UpdateStatusFrom rowData={selectedRowData} /> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
