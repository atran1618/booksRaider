export default function ForegroundBox(props) {
    return (
        <div className='center-info-box'>

            {props.children}

            <style jsx='true'>{`
                    .center-info-box {
                        display: block;
                        /*flex-wrap: wrap;*/
                        background-color: #F4F4F2;
                        height: 91vh;
                        width: 92%;
                        margin: auto;
                        margin-top: 56px;
                        overflow: scroll;
                        border-bottom-left-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }

                    #recent {
                        position: absolute;
                        width: 94px;
                        height: 30px;
                        left: 48px;
                        top: max(9.81%,80px);
                        background-color: white;
                        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                        border-width: 0px;
                        border-radius: 20px;
                        z-index: 5;
                    }
                    #my-books {
                        position: absolute;
                        width: 94px;
                        height: 30px;
                        left: 165px;
                        top: max(9.81%,80px);
                        background-color: white;
                        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                        border-width: 0px;
                        border-radius: 20px;
                        font-weight: 200;
                        z-index: 5;
                    }
                    #add {
                        position: absolute;
                        left: max(83.4%,265px);
                        right: 6.41%;
                        top: max(9.81%,80px);
                        bottom: 86.64%;
                        width: 30px;
                        height: 30px;
                        background-color: #4F7FDE;;
                        background-image: url("../public/AddButtonImage.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
                        border-radius: 5px;
                        border-width: 1px;
                        font-size: 24px;
                        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                        z-index: 5;
                    }
                    #start {
                        margin-top: 20%;
                    }
                `}
                </style>  
        </div>
    )
}