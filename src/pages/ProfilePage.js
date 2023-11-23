
import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';
import { Banner } from '../component/Banner';
import { ProfilePicture } from '../component/ProfilePicture';
import style from '../styles/ProfilePage.module.css';
import { ReviewList } from '../component/ReviewList';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export const ProfilePage = (props) => {
    const isMobile = useCheckMobileScreen();
    const [userData, setUserData] = useState([]);
    let { userID, otherID } = useParams();
    let actualUserID;
    if(otherID !== undefined) {
        actualUserID = userID;
        userID = otherID;
    }

    useEffect(() => {
        async function getUserData(userID) {
            const response = await fetch(`https://books-raider-backend.onrender.com/users/${userID}`)
            const data = await response.json();
            setUserData(data);
        }

        getUserData(userID)
    }, [userID])
    if (!isMobile) {
        return (
            <div>
                <Banner userID={otherID !== undefined ? actualUserID : userID}/>
                <div className={style.container}>
                    <div className={style.topContainer}>
                        <div className={style.user}>
                            <div className={style.picture}>
                                <ProfilePicture />
                            </div>
                            <div className={style.userInfo}>
                                <p className={style.userText}>{userData.username}</p>
                                <p className={style.userText}>Written {userData.reviewCount} reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.bottomContainer}>
                        <div className={style.reviewText}>
                            <p className={style.reviewStyle}>Reviews</p>
                        </div>
                        <div className={style.reviews}>
                            <ReviewList count={userData.reviewCount} reviewsID={userData.reviews} otherID={otherID}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}