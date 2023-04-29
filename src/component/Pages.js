import style from '../styles/Pages.module.css';

export default function Pages(props) {

    // change this if you wnat to see the maximum amount of
    // buttons you can see at a time
    const maxVisibleButtons = 5;

    //Get the range of the buttons that is going to be shown
    const getPageNumbers = () => {
        let delta = Math.floor(maxVisibleButtons / 2);
        let left = props.currentPage - delta + (maxVisibleButtons % 2 ? 0: 1);
        let right = props.currentPage + delta;

        if (props.currentPage <= delta) {
            right = maxVisibleButtons;
        }else if (props.currentPage >= props.totalPages - delta) {
            left = props.totalPages - maxVisibleButtons + 1;
            right = props.totalPages;
        }

        const range = [];

        for (let i = 1; i <= props.totalPages; i++) {
            if((i >= left && i <= right)) {
                range.push(i);
            }
        }

        return [range, left, right];
    };

    const handleClick = (pageNumber) => {
        props.setCurrentPage(pageNumber);
    }

    // How to render the buttons
    const renderButton = () => {
        const pageNumbers = getPageNumbers();


        return (
            <>
                {(pageNumbers[1]) > 1 && (
                    <>
                        <button className={style.buttons} onClick={() => handleClick(1)}>1</button>
                        {props.currentPage > maxVisibleButtons / 2 + 1 && <span className={style.space}>...</span>}
                    </>
                )}

                {pageNumbers[0].map((pageNumber) => (
                    <button 
                      key={pageNumber}
                      onClick={() => handleClick(pageNumber)}
                      className={props.currentPage === pageNumber ? style.active : style.buttons}
                    >
                        {pageNumber}
                    </button>
                ))}

                {(pageNumbers[2]) < [props.totalPages] && (
                    <>
                        {(props.currentPage < props.totalPages - maxVisibleButtons / 2 - 1) && <span className={style.space}>...</span>}
                        <button className={style.buttons} onClick={() => handleClick(props.totalPages)}>{props.totalPages}</button>
                    </>
                )}
            </>
        )
    }

    return (
        <div className={style.container}>
            {renderButton()}
        </div>
    )
}