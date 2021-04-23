/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { auth } from '../../context/EnsembleApi'
import { useContextProvider } from '../../context/Context';
import { Container } from './styles';
import chatter from '../../assets/svgs/question.svg'
import ensemble from '../../assets/svgs/ensemble.svg'

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });
  const { Auth, setAuth } = useContextProvider();
  const history = useHistory();


  useEffect(()=>{
    if(!Auth.token){
      const user = sessionStorage.getItem('user')
      clearInterval()
      if(user){
        setAuth(JSON.parse(user))
      }
    }else{
      history.push('/')
    }
  },[Auth, history, setAuth])
  
  async function validate() {
    setErrors({ username: false, password: false });
    let valid = true;
    const schema = yup.object().shape({
      username: yup
        .string()
        .required(),
      password: yup
        .string()
        .min(8)
        .required(),
    });

    await schema
      .validate({ username, password }, { abortEarly: false })
      .catch((err) => {
        if (err instanceof yup.ValidationError) {
          const errorMessages = {};

          err.inner.forEach((error) => {
            errorMessages[error.path] = error.message;
          });

          setErrors(errorMessages);
          valid = false;
        }
      });

    return valid;
  }

  async function handleSubmit() {
    const valid = await validate();
    
    if (valid) {
      const res = await auth({username, password})
      if(res.authToken){
        sessionStorage.setItem('user', JSON.stringify({token:res.authToken, username:username}))
        setAuth({token:res.authToken, username:username})
      }else{
        setErrors({unauthorizedUser:'Login or password do not match'})
      } 
    }
  }

  return (
    <Container>
      <div><img src={ensemble}/></div>
      {errors.unauthorizedUser ? <p>{errors.unauthorizedUser}</p> : ''}
      <label>
        Login
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {errors.username ? <p>{errors.username}</p> : ''}
      </label>
      <label>
        Password
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {errors.password ? <p>{errors.password}</p> : ''}
      </label>
      <button onClick={handleSubmit}>SignIn</button>
    </Container>
  );
}

export default SignIn;
