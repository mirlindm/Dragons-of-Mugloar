import styled from "styled-components";
import { Button } from 'antd';

export const StyledButton = styled(Button)`
width: 200px;
height: 50px;
background: transparent;
background-color: #fc7800;
border-radius: 3px;
border: 3px solid #000;
color: #fff;
font-size: larger;
margin: 10px 5px;
padding: 0.25em 1em;
font-family: Architects Daughter, cursive;

&:hover {
    font-size: 15px;
    background-color: #fc7800;;
    font-weight: bold;
    width: 220px;
    border: 3px solid #fc7800;;
    color: #fff;
    font-size: x-large;
    font-family: Architects Daughter, cursive;
}
`
export const StyledSubPar = styled.p`
    margin-top: 100px;
    font-weight: bold;
    font-size: 25px; 
    font-family: Architects Daughter;
    color: #fc7800;
    margin-bottom: 1px;
`;