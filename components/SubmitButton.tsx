import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
// import { ButtonProps } from './ui/button'

interface ButtonProps {
    
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const SubmitButton = ({className,isLoading,children}:ButtonProps) => {
  return (
    <Button type="submit" className={className ?? 'shad-primary-btn w-full'} disabled={isLoading}>

        {isLoading ? (
            <div className='flex items-center gap-4'>
                <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className='animate-spin'

                />
                Loading...!
            </div>
        ):children}
    </Button>
    
    
  )
}

export default SubmitButton