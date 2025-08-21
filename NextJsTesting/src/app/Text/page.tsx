import React, { useState } from 'react'

export default function page() {
  const [data, setData] = useState("")
  return (
    <div>
      This is a simple Next.js page
      <img title='simple img1' src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw0Sgm7EqNKKkK-lMFYRA7jN&ust=1755776557604000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOi1lsOnmY8DFQAAAAAdAAAAABAE" alt="simple image" />
      <input type="text" placeholder='enter your name' name='yadnesh'/>
      <input type="text" value={data} onChange={(e)=>setData(e.target.value)} />
      <button onClick={() => setData("updated data")}>click me</button>
      <h1>{data}</h1>
    </div>
  )
}
