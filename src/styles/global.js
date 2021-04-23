import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    --gray:#c4c4c4;
    --strongGreen:#257e05;
    --lightGreen:#c7ffa6;
    
    background: #ffffff;
    font-size:18px;
    font-weight:400;
    color:#000;
    font-family:'Poppins', sans-serif;
}

`;
