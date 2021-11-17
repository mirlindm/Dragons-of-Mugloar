import styled from "styled-components";
import { Button } from 'antd';

export const StyledButton = styled(Button)`
width: 100px;
height: 50px;
background: transparent;
border-radius: 3px;
border: 3px solid #000;
color: #000;
margin: 1em 1em;
padding: 0.25em 1em;

&:hover {
    font-size: 15px;
    font-weight: bold;
    width: 150px;
    border: 3px solid orange;
    color: black;
    font-family: Architects Daughter, cursive;
}
`
export const StyledSubPar = styled.p`
    margin-top: '100px';
    font-weight: 'bolder';
    font-size: '100px'; 
    font-family: Architects Daughter;
    color: orange;
`;