import React from 'react';

function RatingFilter({onChange, ratings}) {
    return (
        <div>
            <h3 className={'text-xl font-semibold'}>Property Rating</h3>
            <div className={'flex flex-col mt-5'}>
                {['1', '2', '3', '4', '5'].reverse().map((value, index) => (
                    <label key={index} className={'flex items-center gap-1'}>
                        <input type={'checkbox'} checked={ratings.includes(value)} value={value}
                               onChange={onChange}/>
                        {`${value} Stars`}
                    </label>
                ))}
            </div>
            </div>
    )}

export default RatingFilter;