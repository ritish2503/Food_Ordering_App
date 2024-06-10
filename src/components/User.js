import React, { useState } from 'react';

const User = ({name}) => {
    const [count, setCount] = useState(0);
  return (
    <div className='user-card'>
        <h2>Name : {name}</h2>
        <h3>Location : Bengaluru</h3>
        <h3>Count : {count}</h3>
        <button onClick={() => setCount(count+1)}>Increase Count</button>
    </div>
  )
}

export default User;