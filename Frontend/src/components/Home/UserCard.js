import React from 'react';
import './Home.css'
const UserCard = ({user}) => {
    const {name, img, desc} = user
    return (
        <div className='card-style'>
            <div>
                <img className='image-style' src={img} height="200px" width="200px" alt="" />
            </div>
            <div className='text-start ms-3 p-3'>
                <h4>{name}</h4>
                <p><small>{desc}</small></p>
            </div>
        </div>
    );
};

export default UserCard;