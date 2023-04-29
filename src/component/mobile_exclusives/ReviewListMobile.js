
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
        if(props.user.reviews.length < 1 || loadingData1 === false)
            setLoadingData1(false);
        else
        {
            fetch(`http://localhost:3001/reviews/${props.user.reviews[0]}`)
            .then(res => res.json())
            .then((result) => {
                fetch(`http://localhost:3001/books/${result.bookID}`)
                .then(res => res.json())
                .then((result) => {
                    setData(data => [...data,result])
                    setLoadingData1(false);
                },(error) => {setError(error);
                })
             },(error) => {setError(error);
            })
        }
        if(props.user.reviews.length < 2)
            setLoadingData2(false);
        else
        {
            fetch(`http://localhost:3001/reviews/${props.user.reviews[1]}`)
            .then(res => res.json())
            .then((result) => {
                
                fetch(`http://localhost:3001/books/${result.bookID}`)
                .then(res => res.json())
                .then((result) => {
                    setData(data => [...data,result])
                    setLoadingData2(false);
                },(error) => {setError(error);
                })
             },(error) => {setError(error);
            })
        }
        if(props.user.reviews.length < 3)
            setLoadingData3(false);
        else
        {
            fetch(`http://localhost:3001/reviews/${props.user.reviews[2]}`)
            .then(res => res.json())
            .then((result) => {
                
                fetch(`http://localhost:3001/books/${result.bookID}`)
                .then(res => res.json())
                .then((result) => {
                    setData(data => [...data,result])
                    setLoadingData3(false);
                },(error) => {setError(error);
                })
             },(error) => {setError(error);
            })
        }

        if(props.user.reviews.length < 4 || loadingData1 === false)
            setLoadingData4(false);
        else
        {
            fetch(`http://localhost:3001/reviews/${props.user.reviews[3]}`)
            .then(res => res.json())
            .then((result) => {
                
                fetch(`http://localhost:3001/books/${result.bookID}`)
                .then(res => res.json())
                .then((result) => {
                    setData(data => [...data,result])
                    setLoadingData4(false);
                },(error) => {setError(error);
                })
             },(error) => {setError(error);
            })
        }
        if(props.user.reviews.length < 5)
            setLoadingData5(false);
        else
        {
            fetch(`http://localhost:3001/reviews/${props.user.reviews[4]}`)
            .then(res => res.json())
            .then((result) => {
                
                fetch(`http://localhost:3001/books/${result.bookID}`)
                .then(res => res.json())
                .then((result) => {
                    setData(data => [...data,result])
                    setLoadingData5(false);
                },(error) => {setError(error);
                })
             },(error) => {setError(error);
            })
        }

        
        if(error != null)
        {
            console.log(error);
        }
    }, [error,loadingData1, loadingData2, loadingData3, loadingData4, loadingData5, props.user.recentBooks])

    
    let containers = []
    for (let i = 0; i < props.user.reviews.length; i++){
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