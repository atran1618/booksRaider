import style from '../../styles/Banner.module.css';

export default function PerBookBox(props) {
    return (
        <div className='per-book-box'>
            <div className='bookCoverPlaceholder'>
                <img className='coverImage' alt="Book Cover" src={props.book.bookCover}/>
            </div>
            <div className={style['break']}></div>
            <b className='book-title'>
                {props.book.title}
            </b>
            <div className={style['break']}></div>
            <b className='book-author'>
                {props.book.author}
            </b>
            <div className={style['break']}></div>
            <b className='book-rating'>
                <b className='star'>★</b> {props.book.totalScore}/10
            </b>
            <div className={style['break']}></div>
            <b className='book-tags'>
                {props.book.pageCount} pages
            </b>
            <style jsx='true'>{`
                .bookCoverPlaceholder {
                    display: inline-block;
                    margin-top: 23px;
                    margin-left: 16px;
                    margin-right: 8px;
                    width: 93px;
                    height: 128px;
                    background: #D9D9D9;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .book-title {
                    position: relative;
                    display: inline-block;
                    top: calc(-113px - 20px);
                    left: 117px;
                    font-style: italic;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 18px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 180px;
                }
                .book-author {
                    position: relative;
                    display: inline-block;
                    top: calc(-113px - 20px);
                    left: 117px;
                    font-style: italic;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 18px;
                }
                .book-rating {
                    position: relative;
                    display: inline-block;
                    top: calc(-93px - 20px);
                    left: 117px;
                    font-style: italic;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 18px;
                }
                .book-tags {
                    position: relative;
                    display: inline-block;
                    top: calc(-83px - 20px);
                    left: 117px;
                    font-weight: 350;
                    font-style: italic;
                    font-size: 16px;
                    line-height: 10px;
                    align-items: center;
                }

                .per-book-box {
                    display: block;
                    /*flex-wrap: wrap;*/
                    margin:auto;
                    margin-top: 15px;
                    width: 309px;
                    height: 174px;
                    background-color: #FFFFFF;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 20px;
                }
                .star {
                    font-size: 21px;
                    color: gold;
                }
                .coverImage {
                    position: relative;
                    max-width: 100%;
                }
                `}
            </style>

        </div>
    )
}