import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type UpdateStatusModalProps = {
  isEmpty: boolean;
  children: ReactNode;
  open: boolean;
  onOpenChange: (args: boolean) => void;
};

const UpdateStatusModal = ({ isEmpty, children, open, onOpenChange }: UpdateStatusModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'outline'} disabled={isEmpty}>
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-2'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
