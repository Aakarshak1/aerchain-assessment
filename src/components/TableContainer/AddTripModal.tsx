import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import AddTripForm from './AddTripForm';

const AddTripModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-blue-500 px-5'> Add Trip</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px] 600px pb-2'>
        <DialogHeader>
          <DialogTitle>Add Trip</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-2'>
          <AddTripForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTripModal;
