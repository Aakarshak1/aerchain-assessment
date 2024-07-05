import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import CircularProgression from './CircularProgression';

const CardContainer = () => {
  return (
    <div className='flex w-full gap-10 justify-between'>
      <Card className='w-[300px] h-[100px] rounded-md p-2 shadow'>
        <CardTitle className='text-lg font-normal ml-2 text-gray-600'>Total trips</CardTitle>
        <CardContent className='p-2 pt-5 font-medium text-2xl'>18,033</CardContent>
      </Card>
      <Card className='w-[380px] h-[100px] rounded-md p-2 flex shadow'>
        <CardContent className='w-[200px]'>
          <CardTitle className='text-lg font-normal ml-2 text-gray-600'>Delivered</CardTitle>
          <CardContent className='p-2 pt-5 font-medium text-2xl'>18,033</CardContent>
        </CardContent>
        <Separator orientation='vertical' />
        <CardContent>
          <CircularProgression />
          <CardContent className='p-1 font-normal text-xs'>Ontime: 1,23,456</CardContent>
        </CardContent>
      </Card>
      <Card className='w-[460px] h-[100px] rounded-md flex shadow'>
        <CardContent className='w-[180px] bg-red-200'>
          <CardTitle className='text-lg font-normal text-red-600 pt-2'>Delayed</CardTitle>
          <CardContent className='p-2 pt-5 font-medium text-md'>18,033</CardContent>
        </CardContent>
        <Separator orientation='vertical' className='bg-red-600' />
        <CardContent className='w-[140px]'>
          <CardTitle className='text-lg font-normal pt-2 text-gray-600'>In Transit</CardTitle>
          <CardContent className='pl-0 pt-5 flex items-center gap-2'>
            <p className='font-medium'>18,033</p>
            <p className='bg-blue-200 text-xs py-0.5 px-1 rounded text-blue-600'>72%</p>
          </CardContent>
        </CardContent>
        <Separator orientation='vertical' />
        <CardContent className='w-[140px]'>
          <CardTitle className='text-lg font-normal pt-2 text-gray-600'>Delivered</CardTitle>
          <CardContent className='pl-0 pt-5 flex items-center gap-2'>
            <p className='font-medium'>18,033</p>
            <p className='bg-blue-200 text-xs py-0.5 px-1 rounded text-blue-600'>72%</p>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardContainer;
