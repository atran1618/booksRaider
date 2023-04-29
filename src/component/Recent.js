import style from '../styles/Recent.module.css';
import Cover from '../component/Cover';

export default function Recent(props) {
    console.log(`What's in book ${JSON.stringify(props.books)}`)
    return(
        <div className={style.inline}>
            <h1 className={style.text}>Recent</h1>
            <div className={style.container}>
                <div className={style.cover}>
                    {props.books.length === 2 ? (
                        <Cover count={2} src={[props.books[0].bookCover, props.books[1].bookCover]}
                                userID={props.userID} _id={[props.books[0]._id, props.books[1]._id]}/>
                    ) : (
                        props.books.length === 1 ? (
                            <Cover count={1} src={props.books[0].bookCover} userID={props.userID}
                                    _id={[props.books[0]._id]}/>
                        ) : (
                            <Cover count={0} src userID={props.userID}/>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}