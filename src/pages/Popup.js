import { Banner } from '../component/Banner';
import ForegroundBox from '../component/mobile_exclusives/ForegroundBox';
import { Link } from 'react-router-dom';
import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';
import { Navigate } from 'react-router';
import { useParams } from 'react-router-dom';

export const Popup = (props) => {
    const isMobile = useCheckMobileScreen();
    const { userID } = useParams();
    if(!isMobile)
    {
        return (<Navigate to="/Home" />);
    }
    return (
        <div>
            <Banner userID={userID}/>
            
            <ForegroundBox>
                <Link to={`/Home/${userID}`} > {/*This will have to be changed to profile*/}
                    <button className='nav-buttons'>
                        <b className='nav-text'>My Reviews</b>
                    </button>
                </Link>
                <Link to={`/Users/${userID}`}>
                    <button className='nav-buttons'>
                        <b className='nav-text'>Books</b>
                    </button>
                </Link>
                <Link to={`/SearchUser/${userID}`}>
                <button className='nav-buttons'>
                    <b className='nav-text'>Users</b>
                </button>
                </Link>
                <Link to='/' >
                    <button className='nav-buttons'>
                        <b className='nav-text'>Logout</b>
                    </button>
                </Link>
            </ForegroundBox>
            <style jsx='true'>{`
            .nav-buttons {
                box-sizing: border-box;
                text-align: left;

                margin-top: -1px;
                margin-left: 0px;
                width: 100%;
                height: 54px;
                background: #FFFFFF;
                border: 1px solid #000000;
            }

            .nav-text {

                margin-left: 12px;

                font-style: normal;
                font-weight: 400;
                font-size: 21px;
                line-height: 54px;

                color: #000000;

            }
            `}
            </style>
        </div>
    )
}