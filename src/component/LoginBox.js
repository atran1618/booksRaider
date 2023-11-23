import { Link } from 'react-router-dom';
import style from '../styles/Box.module.css';
import $ from "jquery";
import '../styles/global.css';

export const LoginBox = (props) => {
  
    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                //setResult(data); //I dont now if data recieved is asynch
                console.log("Succesful submit of: " + data);
                
            },
        });
        props.onFormSwitch('home');
    };
  const id = "655ebbbb326d22fb28b511c2"
  return (
    <div className={style.background}>
      <div className={style.stuff}>
        {/*The Login form has 2 fields, Username/Email and Password*/}
        <div>
          <form
            className={style.form}
            //action="http://localhost:8000/test.php"
            method="post"
            onSubmit={(event) => handleSumbit(event)}
          > {/*port 3001*/}
            <h2 className={style.Sign}> {/*Moved inside div so it can be centered w. the form itself*/}
              Login
            </h2>
            <input id='username' name="username"
              placeholder='Username / Email' 
              className={style.input}
              />
            <br />
            <input id='password' type="password" name="password"
              placeholder='Password' className={style.input}/>
            <br />
            <Link to={`/Home/${id}`}>
              <button className={style.submit} type="submit">Submit</button> {/* onClick={() => props.onFormSwitch('home')}*/}
            </Link>
            <h3 id={style.text}>Don't have an account?</h3>
            <Link to='/Signup'>
              <button className={style['link-btn']} to='/Signup'>Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}