import React from 'react';

function Error({className = 'font-bold text-red-500', message}) {
    return (
        <span className={className}>{message}</span>
    );
}

export default Error;