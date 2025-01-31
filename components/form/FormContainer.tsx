'use client'
import { ReactNode } from "react"
import { useActionState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { actionFunction } from "@/utils/types"

const initialState = {
    message:''
};


const FormContainer = ({action,children}:{action:actionFunction,children:ReactNode}) => {
    const {toast} = useToast()
    const [state,formAction] = useActionState(action,initialState)
    console.log('state ja',state)
    useEffect(()=>{
        if(state.message){
            toast({description:state.message})
        }

    },[state])



  return (
    <form action={formAction}>
        {children}
    </form>
  )
}
export default FormContainer