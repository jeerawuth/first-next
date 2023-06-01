import React from 'react'

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
        <div className="w-10 h-10 ease-linear border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}
