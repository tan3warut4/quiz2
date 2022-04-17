import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <div className='bg-slate-200 pb-10 shadow'>
        <div className='pt-5'>
          <span className='m-3 tracking-wider'>
            Filter here
          </span>
        </div>
        <div>
          <input
            value={filter || ''}
            onChange={e => setFilter(e.target.value)}
            className='shadow rounded p-1 m-3 ' />
        </div>
      </div>

    </>

  )
}
