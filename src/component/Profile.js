import pfp from '../public/pfp.svg';
import style from '../styles/Profile.module.css';
import { useState } from 'react';
import Popup from './Popup';

export default function Profile(props) {
    const [clicked, setClicked] = useState(false);

    function popUp() {
        setClicked(!clicked);
    }

    return (
        <div>
            <img src={pfp} alt='profile pic' onClick={popUp}
               className={style.profile}/>
            {clicked && <Popup userID={props.userID}/>}
        </div>
    )
}