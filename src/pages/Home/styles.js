import styled from 'styled-components'

const Container = styled.div`
    display:grid;
    height:100vh;
    grid-template-columns:10px 1fr 10px;
    grid-template-rows: 10% 1fr 20%;
    @media only screen and (min-width:700px){
        grid-template-columns:100px 1fr 100px;
    }
    header{
        grid-column:2/3;
        grid-row:1/2;
        display:flex;
        justify-content:flex-end;
        align-items: center;
        button{
            border:none;
            border-radius:4px;
            background:var(--lightGreen);
            height:7vh;
            width:20vh;
            font-size:1.2em;
            color:var(--strongGreen);
            display:flex;
            align-items:center;
            justify-content:center;
            img{
                padding-left:1em;
                object-fit:contain;
                height:80%;
            }
        }
    }
    main{
        max-width:100%;
        grid-column:2/3;
        grid-row:2/3;
        overflow-y:scroll;
        scroll-behavior:smooth;
        ul{
            max-width:100%;
            list-style:none;
            display:flex;
            flex-direction:column;
            li{
                display:flex;
                max-width:100%;
                line-height:2em;
                text-transform:capitalize;
               
                &:nth-child(odd){
                    background-color:#6b61b1;
                    color:white;
                }
                .date{
                    font-size:.8em;
                    color:#555
                }
                p{
                    display:flex;
                    justify-content:flex-start;
                    flex-grow: 1;
                    max-width:100%;
                    span{
                        min-width:30%;
                    }
                    .message{
                        padding-left:2em;
                        overflow-wrap:break-word;
                        min-width:70%;
                    }
                }
                .self{
                    color:#6b61b1;
                    justify-content:space-between;
                    font-weight:bold;
                    background-color:var(--lightGreen);
                    .date{
                        font-weight:400;
                    }
                    .message{
                        font-weight:400;
                        padding-left:4em;
                    }
                }
            }
            
            
        }
    } 
    footer{
        grid-column:2/3;
        grid-row:3/4;
        display:flex;
        align-items:center;
        justify-content:space-between;
        textarea{
            resize:none;
            width:80% !important;
            height:10vh;
        }
        button{
            border:none;
            border-radius:4px;
            background:var(--lightGreen);
            height:10vh;
            width:20%;
            font-size:1.2em;
            color:var(--strongGreen);
            display:flex;
            align-items:center;
            justify-content:center;
            img{
                padding-left:1em;
                object-fit:contain;
                height:80%;
            }
        }
    }

`

export {Container}