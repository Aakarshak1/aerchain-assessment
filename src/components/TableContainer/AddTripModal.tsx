import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ReactNode } from 'react';

type AddTripModalProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (args: boolean) => void;
};
const AddTripModal = ({ children, open, onOpenChange }: AddTripModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='bg-blue-500 px-5'> Add Trip</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px] 600px pb-2'>
        <DialogHeader>
          <DialogTitle>Add Trip</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-2'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTripModal;
