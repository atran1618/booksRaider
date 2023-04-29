import { Banner } from '../component/Banner';
import ForegroundBox from '../component/mobile_exclusives/ForegroundBox';
import AdminContent from '../component/mobile_exclusives/AdminContent';
import Cover from '../component/Cover';
import style from '../styles/AdminPanel.module.css';
import { Link } from 'react-router-dom';

import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';

export const AdminPanel = (props) => {
    const isMobile = useCheckMobileScreen();
    if(!isMobile)
    {
        return (
        <div className={style.container}>
            <Banner/>
            <div className={style.bookContainer}>
                <div className={style.cover}>
                    <Cover count={1} src='https://m.media-amazon.com/images/I/51HSkTKlauL._SY291_BO1,204,203,200_QL40_ML2_.jpg'/>
                    <div className={style.textcover}>Book Cover</div>
                </div>
                <form className={style.form}>
                    <label className={style.text}>Book Title:  </label>
                    <input className={style.mediuminput} type="text" title = "title"/>
                    <br></br>
                    <label className={style.text}>Author:  </label>
                    <input className={style.mediuminput} type="text" title = "author"/>
                    <br></br>
                    <label className={style.text}>Publisher:  </label> 
                    <input className={style.mediuminput} type="text" title = "publisher"/>
                    <br></br>
                    <label className={style.text}>Year Published:  </label>
                    <input className={style.input} type="text" title = "yearPublished"/>
                    <br></br>
                    <label className={style.text}># of Pages:  </label> 
                    <input className={style.input} type="text" title = "#pages"/>
                    <br></br>
                    <label className={style.text}>Book Summary:  </label>
                    <textarea className={style.largeinput} type="text" title = "summary"></textarea>
                    <br></br>
                    <Link to='/Book'>
                        <button className={style.return}type = "return">Back to book</button>
                    </Link>
                    <Link to='/Book'>
                        <button className={style.update}type = "update">Publish/Update</button>
                    </Link>
                </form>
            </div>
        </div>

    )}
    return (
        <div>
            <Banner  {...props}/>
            <ForegroundBox>
                <AdminContent/>
            </ForegroundBox>
            <style jsx='true'>{`

            `}
            </style>
        </div>
    )
}