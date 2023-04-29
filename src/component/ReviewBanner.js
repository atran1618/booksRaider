import style from '../styles/ReviewBanner.module.css';
import Stars from '../component/Stars';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewBanner(props) {
    const [userData, setUserData] = useState([]);
    const [date, setDate] = useState();

    useEffect(() => {
        async function getUserData(userID) {
            const response = await fetch(`http://localhost:3001/users/${userID}`)
            const data = await response.json();
            setUserData(data);
            setDate(userData.createdAt.replace(/^(\d{4}-\d{2}-\d{2}).*/, "$1"));
        }

        getUserData(props.userID)
    }, [props.userID, userData.createdAt])



    return (
        <div className={style.container}>
            <Link to={`/Profile/${userData._id}`}>
                <p className={style.text}>{userData.username}</p>
            </Link>
            <Stars rating={props.score}/>
            <p className={style.pub}>{date}</p>
        </div>
    )
}