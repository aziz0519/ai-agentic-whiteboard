"use client"
import React from 'react'
import axios from 'axios'

function Provider({ children }:{ children: React.ReactNode}) {

    const CreateNewUser = async () => {
        const result = await axios.post('/api/users');

        console.log(result.data);
    }
  return (
    <div>
      { children }
    </div>
  )
}

export default Provider
