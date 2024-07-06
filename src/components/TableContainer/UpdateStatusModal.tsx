import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import UpdateStatusFrom from './UpdateStatusFrom';

const UpdateStatusModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Update Status</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <UpdateStatusFrom />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
