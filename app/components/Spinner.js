import React from 'react'

export default function Spinner() {
  return (
    <div class="flex justify-center items-center">
        <div class="w-10 h-10 ease-linear border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}
