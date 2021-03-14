import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import Input from '../input/Input';

import './Signin.css';

const EMAIL_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_EXP = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;

const Signin = ({ title }) => {
  const getRegData = JSON.parse(localStorage.getItem('user'));
  const isRemember = localStorage.getItem('rememberMe');

  const [email, setEmail] = useState(isRemember ? getRegData[2] : 'none');
  const [password, setPassword] = useState(isRemember ? getRegData[3] : 'none');
  const [remember, setRemember] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [regError, setRegError] = useState(false);

  const setValidate = (text, exp) => {
    return exp.test(text);
  };

  const onChangeEmail = (event) => {
    const emailValue = setValidate(event.target.value.trim(), EMAIL_EXP);
    emailValue ? setEmail(event.target.value.trim()) : setEmail('');
  };

  const onChangePassword = (event) => {
    const passValue = setValidate(event.target.value.trim(), PASSWORD_EXP);
    passValue ? setPassword(event.target.value.trim()) : setPassword('');
  };

  const onChangeRemember = () => {
    setRemember((remember) => !remember);
  };

  const onSigninHandler = () => {
    const regData = JSON.parse(localStorage.getItem('user'));
    if (remember) {
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('rememberMe');
    }
    if (regData && email === regData[2] && password === regData[3]) {
      setIsLogged(true);
    } else {
      !isLogged ? setRegError(true) : setRegError(false);
    }
  };

  return (
    <>
      {isLogged ? <Redirect to="/main" /> : null}
      <div className="header">
        <div className="padlock">
          <img src="./assets/padlock.svg" alt="padlock" />
        </div>
        <h2 className="title">{title}</h2>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          inputType="text"
          text={isRemember && getRegData ? getRegData[2] : 'Email Address *'}
          changeHandler={onChangeEmail}
          classNames={!email ? 'input-invalid' : null}
        />
        <Input
          inputType="password"
          text={isRemember && getRegData ? getRegData[3] : 'Password *'}
          changeHandler={onChangePassword}
          classNames={!password ? 'input-invalid' : null}
        />
        <Checkbox
          label="Remember me"
          rememberMe={remember}
          onChangeHandler={onChangeRemember}
        />
        <p style={{ color: 'red', fontSize: '1.5rem' }}>
          {regError ? 'This user is not registered!' : null}
        </p>
        <Button text={title} onClickHandler={onSigninHandler} />
        <div className="links">
          <Link to="/main">Forgot password?</Link>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </form>
      <footer>
        <p>Copyright &copy; Your Website 2021</p>
      </footer>
    </>
  );
};

export default Signin;
