import style from '../../styles/Banner.module.css';

export default function AdminContent() {
    return (
        <div>
            <div className='bookCoverPlaceholder'>
                
            </div>
            <div className={style['break']}></div>
            <b className='book-cover'>
                Book Cover
            </b>
            <div className={style['break']}></div>
            <b className='book-title'>
                Book Title:
            </b>
            <input id='title'/>
            <div className={style['break']}></div>
            <b className='book-num'>
                ISBN:
            </b>
            <input id='num'/>
            <div className={style['break']}></div>
            <b className='book-author'>
                Author:
            </b>
            <input id='author'/>
            <div className={style['break']}></div>
            <b className='book-pub'>
                Publisher:
            </b>
            <input id='pub'/>
            <div className={style['break']}></div>
            <b className='book-year'>
                Year Published:
            </b>
            <input id='year'/>
            <div className={style['break']}></div>
            <b className='book-pages'>
                # of Pages:
            </b>
            <input id='pages'/>
            <div className={style['break']}></div>
            <b className='book-summary'>
                Book Summary:
            </b>
            <div className={style['break']}></div>
            <textarea id='summary'/>
            <style jsx='true'>{`
                .bookCoverPlaceholder {
                    display: inline-block;
                    margin-top: 12px;
                    margin-left: calc(50% - 47px);
                    width: 93px;
                    height: 128px;
                    background: #D9D9D9;
                    border-radius: 10px;
                }
                .book-cover {
                    margin-left: calc(50% - 41px);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-title {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-num {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-author {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-pub {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-year {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-pages {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                .book-summary {
                    margin-left: calc(8%);
                    width: 111px;
                    height: 22px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                }

                input {
                    margin-top: 0px;
                    margin-left: calc(8%);
                    margin-bottom: 27px;
                    width: 58%;
                    height: 28px;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    text-align: center;
                    background: #FDFDFD;
                    border: 1px solid #9F9F9F;
                    border-radius: 20px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
                }

                textarea {
                    font-size: 16px;
                    line-height: 22px;
                    border: 1px solid #9F9F9F;
                    border-radius: 20px;
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
                }

                textarea {
                    text-align: left;
                    padding: 15px;
                }

                #title {
                    margin-left: 16px;
                }

                #num {
                    margin-left: 52px;
                }

                #author {
                    margin-left: 36px;
                }

                #pub {
                    margin-left: 18px;
                }

                #year {
                    margin-left: 8%;
                    width: 124px;
                }

                #pages {
                    margin-left: 27.5%;
                    width: 38px;
                }

                #summary {
                    margin-left: 26px;
                    width: 76%;
                    height: 160px;
                }
                `}
            </style>

        </div>
    )
}