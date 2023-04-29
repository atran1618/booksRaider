
import style from '../../styles/BooksList.module.css';
import { useState, useEffect } from 'react';
import PerBookBox from './PerBookBox';

export default function BooksList(props) {
    const [data, setData] = useState([]);
    const [loadingData1, setLoadingData1] = useState(true);
    const [loadingData2, setLoadingData2] = useState(true);
    const [loadingData3, setLoadingData3] = useState(true);
    const [loadingData4, setLoadingData4] = useState(true);
    const [loadingData5, setLoadingData5] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(props.user.recentBooks.length < 1 || loadingData1 === false)
            setLoadingData1(false);
        else
        {
            fetch(`http://localhost:3001/books/${props.user.recentBooks[0]}`).then(res => res.json()).then((result) => {setData(data => [...data,result]);setLoadingData1 (false); },(error) => {setError(error);})
        }

        if(props.user.recentBooks.length < 2 || loadingData2 === false)
            setLoadingData2(false);
        else
        {
            fetch(`http://localhost:3001/books/${props.user.recentBooks[1]}`).then(res => res.json()).then((result) => {setData(data => [...data,result]);setLoadingData2 (false); },(error) => {setError(error);})
        }

        if(props.user.recentBooks.length < 3 || loadingData3 === false)
            setLoadingData3(false);
        else
        {
            fetch(`http://localhost:3001/books/${props.user.recentBooks[2]}`).then(res => res.json()).then((result) => {setData(data => [...data,result]);setLoadingData3 (false); },(error) => {setError(error);})
        }

        if(props.user.recentBooks.length < 4 || loadingData4 === false)
            setLoadingData4(false);
        else
        {
            fetch(`http://localhost:3001/books/${props.user.recentBooks[3]}`).then(res => res.json()).then((result) => {setData(data => [...data,result]);setLoadingData4 (false); },(error) => {setError(error);})
        }

        if(props.user.recentBooks.length < 5 || loadingData5 === false)
            setLoadingData5(false);
        else
        {
            fetch(`http://localhost:3001/books/${props.user.recentBooks[4]}`).then(res => res.json()).then((result) => {setData(data => [...data,result]);setLoadingData5 (false); },(error) => {setError(error);})
        }
        
        if(error != null)
        {
            console.log(error);
        }
    }, [error,loadingData1, loadingData2, loadingData3, loadingData4, loadingData5, props.user.recentBooks])

    
    let containers = []
    for (let i = 0; i < props.user.recentBooks.length; i++){
        const content = (loadingData1 || loadingData2 || loadingData3 || loadingData4 || loadingData5) ? '...loading' : <PerBookBox book = {data[i]}/>;
        containers.push(
        <>
            <div className={style['break']}></div>
            {content}
        </>
        )
    }
    return <div className={style.mobileContainer}>{containers}</div>
}