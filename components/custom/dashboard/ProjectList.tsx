"use client"
import { Button } from '@/components/ui/button';
import { Folder } from 'lucide-react';
import React, { useState } from 'react'

function ProjectList() {

  const [projectList, setProjectList] = useState([]);

  return (
    <div>
      {projectList.length === 0 ? (

        <div className='flex flex-col items-center p-10 border rounded-xl mt-10 gap-3'>
          <Folder className='h-12 w-12' />
          <h2>No Projects Found</h2>
          <Button>+ Create New Board</Button>          
        </div>

      ): <div> 
        {/* Project list */}
        </div>}
    </div>
  )
}

export default ProjectList
