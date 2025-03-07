import React from 'react'
import Heder from '../componets/heder/Heder'
import PolicyList from '../componets/policy/PolicyList'

export default function Home() {
  return (
    <div>
      <Heder />
      <div className='h-full overflow-y-scroll'>
        <PolicyList />
      </div>
    </div>
  )
}
