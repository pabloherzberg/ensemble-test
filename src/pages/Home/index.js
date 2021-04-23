/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useContextProvider } from '../../context/Context';
import { feedNotification, postOnFeed, getFeed } from '../../context/EnsembleApi'

import {Container} from './styles'

import logout from '../../assets/svgs/exit.svg'
import chat from '../../assets/svgs/chat.svg'

function Home() {
  const { Auth, setAuth } = useContextProvider()
  const [message, setMsg] = useState('')
  const [posts, setPosts] = useState({})
  const [notifications, setNotifications] = useState({})
  const [startSeq, setStartSeq] = useState(1)
  const [limit, setLimit] = useState(100)
  const [order, setOrder] = useState('asc')
  const history = useHistory();

  const mainRef = useRef(null)

  let update = null

  useEffect(() => {
    if (!Auth.token){
      history.push('/signin');
    }else{
      update =  setInterval(() => {
                  feed()
                  if(mainRef.current !== null && Auth){
                    mainRef.current.scrollTo(0, mainRef.current.scrollTopMax)
                  }
                }, 5000);
    }
  }, [Auth]);

  useEffect(()=>{
    if(mainRef.current !== null){
      mainRef.current.scrollTo(0, mainRef.current.scrollTopMax)
    }
  },[posts])
  

  const getNotification = async () =>{
    const authToken = Auth.token

    const res = await feedNotification({authToken})
    setNotifications(res)
  }

  const handleSend = async ()=>{
    const authToken = Auth.token
    setMsg('')

    const res = await postOnFeed({authToken, message})
    if(res){
      feed()
      if(mainRef.current !== null){
        mainRef.current.scrollTo(0, mainRef.current.scrollTopMax)
      }
    }
  }

  const feed = async ()=>{
    const authToken = Auth.token

    const res = await getFeed({authToken, startSeq, limit, order})
    setPosts(res)
  }

  const logOut = ()=>{
    sessionStorage.clear()
    clearInterval(update)
    setAuth(false)
    history.push('/signin')
  }
  

  return <Container >
          <header>
            <button onClick={logOut}>Exit <img src={logout}/> </button>
          </header>
          <main ref={mainRef}>
            <ul>
              {
                posts.posts?
                  posts.posts.map((post, index)=>(
                    <li key={index}>
                      <p className={post.user === Auth.username? 'self':'friend'}>
                        <span>{post.user === Auth.username? 'Myself': post.user}: <span className='date'>{new Date(post.date).toLocaleString()}</span></span>
                        <span className='message'>{post.message}</span>
                      </p>
                    </li>
                  ))
                  :''
              }
            </ul>
          </main>
          <footer>
            <textarea name="message" onChange={e=>setMsg(e.target.value)} value={message}></textarea>
            <button onClick={handleSend}>Talk <img src={chat}/></button>
          </footer>
        </Container>;
}

export default Home;
