import React from 'react'

function Error({error}) {
  return (
    <p className='error' style={{marginBottom: "10px"}}>
    <span> 💥 </span> {error}
    </p>
  )
}

export default Error
