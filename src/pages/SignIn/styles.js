/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  min-width:300px;
  display:flex;
  margin:auto;
  flex-direction:column;
  align-items:center;
  background:linear-gradient(#6b61b1, white);
  div{
    height:50%;
    img{
      object-fit:contain;
      height:100%;
    }
    margin-bottom:2em;
  }
  p {
    color: red;
  }
  label{
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    input{
      width:30%;
    }
  }
  button{
    margin-top:2em;
    border:none;
    border-radius:4px;
    width:30%;
    height:3em;
    background-color:var(--lightGreen);
    color:var(--strongGreen);
  }
`;
