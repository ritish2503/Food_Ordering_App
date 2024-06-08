import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className='error'>
            <h1>OOOPSS! Something Went Wrong...</h1>
            <h3>{err.status} : {err.statusText}</h3>
            <h4>{err.data}</h4>
        </div>
    )
}

export default Error;