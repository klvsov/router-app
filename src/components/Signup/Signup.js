import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../input/Input';
import './Signup.css';

const EMAIL_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_EXP = /(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
const NAME_EXP = /^[a-z]{3,}/i;

const Signup = ({ title }) => {
  const [email, setEmail] = useState('none');
  const [password, setPassword] = useState('none');
  const [sendMail, setSendMail] = useState(false);
  const [firstName, setFirstName] = useState('none');
  const [lastName, setLastName] = useState('none');
  const [successReg, setSuccesReg] = useState(false);

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

  const onChangeSendMail = () => {
    setSendMail((sendMail) => !sendMail);
  };

  const onChangeFirstName = (event) => {
    const nameValue = setValidate(event.target.value.trim(), NAME_EXP);
    nameValue ? setFirstName(event.target.value.trim()) : setFirstName('');
  };

  const onChangeLastName = (event) => {
    const nameValue = setValidate(event.target.value.trim(), NAME_EXP);
    nameValue ? setLastName(event.target.value.trim()) : setLastName('');
  };

  const onSignupHandler = () => {
    const regData = [];
    if (firstName && firstName !== 'none') {
      regData.push(firstName);
    }
    if (lastName && lastName !== 'none') {
      regData.push(lastName);
    }
    if (email && email !== 'none') {
      regData.push(email);
    }
    if (password && password !== 'none') {
      regData.push(password);
    }
    if (regData.length === 4) {
      localStorage.setItem(`user`, JSON.stringify(regData));
    }
    setSuccesReg(true);
  };

  return (
    <>
      {successReg ? <Redirect to="/main" /> : null}
      <div className="header">
        <div className="padlock">
          <img src="./assets/padlock.svg" alt="padlock" />
        </div>
        <h2 className="title">{title}</h2>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="controls">
          <Input
            text="First name *"
            changeHandler={onChangeFirstName}
            classNames={!firstName ? 'input-invalid' : null}
          />
          <Input
            text="Last name *"
            changeHandler={onChangeLastName}
            classNames={!lastName ? 'input-invalid' : null}
          />
        </div>
        <Input
          text="Email Address *"
          inputType="text"
          changeHandler={onChangeEmail}
          classNames={!email ? 'input-invalid' : null}
        />
        <Input
          text="Password *"
          inputType="password"
          changeHandler={onChangePassword}
          classNames={!password ? 'input-invalid' : null}
        />
        <Checkbox
          label="I want to receive inspiration, marketing promotions and updates via email"
          rememberMe={sendMail}
          onChangeHandler={onChangeSendMail}
        />
        <Button text={title} onClickHandler={onSignupHandler} />
        <div className="link">
          <Link to="/signin">Already have an account? Sign In</Link>
        </div>
      </form>
      <footer>
        <p>Copyright &copy; Your Website 2021</p>
      </footer>
    </>
  );
};

export default Signup;
