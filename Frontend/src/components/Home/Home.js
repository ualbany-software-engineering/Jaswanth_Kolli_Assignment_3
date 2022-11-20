import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import UserCard from './UserCard';
import './UserCard'
const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3005/api/v1/users")
        .then(res => res.json())
        .then(result => setUsers(result))
    },[])
    return (
        <div>
            <Container>
                <div className="card-container">
                {
                    users?.map(user => <UserCard key={user._id} user={user}></UserCard>)
                }
                </div>
            </Container>
        </div>
    );
};

export default Home;