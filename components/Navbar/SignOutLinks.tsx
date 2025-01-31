'use client'
import { SignOutButton } from '@clerk/nextjs'
import { useToast } from "@/hooks/use-toast"

import { Button } from '../ui/button'
const SignOutLinks = () => {
    const { toast } = useToast()

const handleLogout = ()=>{
    toast({description:"Logout Successfully"})
}

  return (
    <SignOutButton redirectUrl='/'>
        <Button
        className='w-full text-left' 
        onClick={handleLogout}>
            Logout
        </Button>
    </SignOutButton>
  )
}
export default SignOutLinks