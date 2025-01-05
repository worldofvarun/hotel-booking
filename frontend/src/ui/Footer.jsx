import React from 'react';

function Footer() {
    return (
        <div className={'bg-blue-800 py-4'}>
            <div className={'container mx-auto flex justify-between items-center'}>
                <span className={'text-3xl text-white font-bold tracking-tighter'}>
                    MernHolidays.com
                </span>
                <span className={'text-white font-bold tracking-tighter flex gap-4'}>
                    <p className={'cursor-pointer'}>Privacy Policy</p>
                    <p className={'cursor-pointer'}>Instagram</p>
                </span>
            </div>
        </div>
    );
}

export default Footer;