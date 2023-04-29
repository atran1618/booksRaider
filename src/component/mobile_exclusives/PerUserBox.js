import style from '../../styles/Banner.module.css';

export default function PerUserBox(props) {
    return (
        <div className='per-user-box'>
            <div className='user-profile-picture'>

            </div>
            <div className={style['break']}></div>
            <b className='user-name'>
                {props.book.username}
            </b>
            <div className={style['break']}></div>
            <b className='review-count'>
                {props.book.reviewCount} reviews
            </b>
            <style jsx='true'>{`
                .user-profile-picture {
                    display: inline-block;
                    margin-top: 12px;
                    margin-left: 16px;
                    margin-right: 8px;
                    width: 63px;
                    height: 63px;
                    background: #D9D9D9;
                    border-radius: 10px;
                }

                .user-name {
                    position: relative;
                    display: inline-block;
                    top: calc(-50px - 20px);
                    left: 90px;
                    font-style: italic;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 18px;
                }
                .review-count {
                    position: relative;
                    display: inline-block;
                    top: calc(-46px - 20px);
                    left: 90px;
                    font-style: italic;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 18px;
                }

                .per-user-box {
                    display: block;
                    /*flex-wrap: wrap;*/
                    margin:auto;
                    margin-top: 15px;
                    width: 309px;
                    height: 87px;
                    background-color: #FFFFFF;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 20px;
                }
                `}
            </style>

        </div>
    )
}