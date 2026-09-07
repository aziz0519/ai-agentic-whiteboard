import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

function CreateNewBoardDialog() {

  const [workspaceName, setWorkspaceName] = useState("");

  const handleCreateBoard=()=>{
    if (workspaceName.trim() === ""  || workspaceName?.length > 30){

        toast.add({
            type:"error",
            title: "Invalid Workspace Name",
            description: "Please enter a valid workspace name (1-30 characters)."
        })


    }
  }

  return (
        <Dialog>
        <DialogTrigger>
            <Button className="w-full">
                <Plus /> Create New Board
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="text-lg font-bold">Whiteboard Workspace Title</DialogTitle>
            </DialogHeader>
            <div>
                <label>Enter Workspace Name</label>
                <Input placeholder='Workspace Name' className='mt-1'
                onChange={(e) => setWorkspaceName(e.target.value)} />
            </div>
              <DialogFooter>
            <DialogClose>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
            disabled={workspaceName?.length == 0} 
            onClick={handleCreateBoard}>Create</Button>
        </DialogFooter>
        </DialogContent>
      
        </Dialog>
  )
}

export default CreateNewBoardDialog
