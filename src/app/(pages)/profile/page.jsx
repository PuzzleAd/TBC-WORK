import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className='w-full h-full flex items-center justify-center gap-6'>
      <Image 
      src="/Profile-photo.jpg"
      alt='Profile-photo'
      width={200}
      height={300}
      className='rounded-lg'
      />
      <div className='flex flex-col gap-6'>
        <h1>Giorgi Isaakadze</h1>
        <h3>Nickname: GAMER123</h3>
        <h3>Level: 85</h3>
        <h3>Armor: Vorpal Light</h3>
        <h3>Weapon: Mamba Edge Dual Daggers</h3>
        <h3 className='text-[red]'>Top Dagger on Server</h3>
      </div>
    </div>
  )
}
