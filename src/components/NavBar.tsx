import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  BellIcon,
  ChevronDown,
  SettingsIcon,
  CircleHelpIcon,
  LayoutDashboardIcon,
} from 'lucide-react';

import Logo from '../../public/Aerchain-logo.webp';
import GmailLogo from '../../public/gmail2.png';

const NavBar = () => {
  return (
    <div className='flex w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 justify-between '>
        <nav className='gap-4 text-sm font-medium flex flex-row items-center'>
          <Image src={Logo} width={150} height={50} alt='Aerchain logo' priority />
          <Link href='#' className='flex items-center gap-2 font-semibold text-base'>
            <span className='sr-only'>Aerchain</span>
          </Link>
          <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground flex items-center'>
            <LayoutDashboardIcon className='px-0.5 mr-0.5' />
            Module
          </Link>
          <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground flex items-center'>
            Purchase Order
            <ChevronDown className='px-0.5 mr-0.5 h-5' />
          </Link>
          <Link href='#' className='text-muted-foreground transition-colors hover:text-foreground'>
            Invoices
          </Link>
          <Link
            href='#'
            className='text-muted-foreground transition-colors hover:text-foreground flex items-center'>
            Budget
            <ChevronDown className='px-0.5 mr-0.5 h-5' />
          </Link>
        </nav>

        <div className='flex items-center gap-5'>
          <div className='flex gap-4'>
            <CircleHelpIcon className='text-blue-400 cursor-pointer' />
            <div className='relative flex'>
              <BellIcon className='text-blue-400 cursor-pointer' />
              <span className='bg-red-400 text-white rounded-lg text-xs top-0 right-0 absolute h-3 w-3'></span>
            </div>
            <SettingsIcon className='text-blue-400 cursor-pointer' />
          </div>

          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary' size='icon' className='w-[120px] gap-1'>
                  <Image height={50} width={30} src={GmailLogo} alt='gmail logo' />
                  Gmail
                  <span className='sr-only'>Toggle menu</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Menu Item</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
