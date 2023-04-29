import style from '../styles/ProfilePicture.module.css';
import { useState } from 'react';

export const ProfilePicture = (props) => {
    const [src, setSrc] = useState('https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg')
    const [popUp, setPopUp] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    function handleClick() {
        setPopUp(!popUp)
    }

    function handleFormSubmit(event) {
        event.preventDefault();
    }

    function handleFileInputChange(event) {
        const selectedFile = event.target.files[0]
        setFile(selectedFile);
        if(selectedFile === undefined) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    }

    return (
        <div className={style.profile}>
            <img className={style.image} src={src} alt='profile' onClick={handleClick}/>
            {popUp && (
                <div className={style.popUpBackground}>
                    <form className={style.form} onSubmit={handleFormSubmit}>
                        <input 
                          type="file"
                          accept="image/*"
                          className={style.input}
                          onChange={handleFileInputChange}
                        />
                        {previewUrl && (
                            <img src={previewUrl} alt="profile preview"
                              className={style.preview}
                            />
                        )}
                        <button type="submit" className={style.upload}>Upload</button>
                    </form>
                </div>
            )}
        </div>
    )
}