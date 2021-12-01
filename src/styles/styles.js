import styled from "styled-components";
import { Button } from 'antd';

export var fireyDragonColor = '#e25822';
export var goldIshColor = '#fbbd47';

export const StyledMainHeading = styled.h1`
    font-size: 130px;
    font-weight: bolder;    
    background: -webkit-linear-gradient(${goldIshColor}, ${fireyDragonColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Architects Daughter, cursive;
    position: relative;
    top: 100px;
    mix-blend-mode: difference;

    @media only screen and (max-width: 950px) {
        font-size: 100px;
        margin-bottom: 100px;
    }
`;

export const StyledParagraph = styled.p`    
    font-weight: bold;
    font-size: 25px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${fireyDragonColor}, ${goldIshColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: -40px 0 5px 0;
    position: relative;
    z-index: 10;
    padding: 5px; 
    top: 60px;
`;

export const StyledButton = styled(Button)`
    width: 250px;
    height: 80px;
    position: relative;
    display: inline-block;
    margin: auto;
    color: #ffffff;
    font-family: Architects Daughter, cursive;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    text-decoration: none;
    background-color: ${fireyDragonColor};
    padding: 20px 40px;
    margin-top: 50px;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    -moz-box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    box-shadow:inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    &:active {
        top:10px;
        background-color: ${fireyDragonColor} !important;
    
        -webkit-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
        -moz-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3pxpx 0 #915100;
        box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
    }

    &::after{
        content: "";
        height: 100%;
        width: 100%;
        padding: 4px;
        position: absolute;
        bottom: -15px;
        left: -4px;
        z-index: -1;
        background-color: #2B1800;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }

    &:hover {
        background-color: ${fireyDragonColor};;
        color: #fff;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    }

    &:focus {
        background-color: ${fireyDragonColor};;
        color: #fff;
    }
`;

export const StyledItemName = styled.p`    
    font-weight: bold;
    font-size: 25px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${fireyDragonColor}, ${fireyDragonColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
    position: relative;
    z-index: 10;
    padding: 5px;    
`;

export const StyledHeader = styled.p`    
    font-weight: bold;
    font-size: 20px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${goldIshColor}, ${goldIshColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
    position: relative;
    z-index: 10;
    padding: 5px;    
    margin-top: -10px;
`;

export const StyledContent = styled.p`    
    font-weight: bold;
    font-size: 20px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${fireyDragonColor}, ${fireyDragonColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
    position: relative;
    z-index: 10;
    padding: 5px;    
    margin-top: -10px;
    text-align: center;
`;

export const StyledAdInfo = styled.p`    
    font-weight: bold;
    font-size: 15px;     
    background: ${goldIshColor};
    z-index: 10;
    padding: 2px;    
    text-align: center;    
`;

export const StyledActionButton = styled(Button)`    
    width: 100px;
    height: 40px;
    position: relative;
    display: inline-block;
    margin: auto;
    margin-top: -10px;
    color: #ffffff;
    font-family: Architects Daughter, cursive;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    background-color: ${fireyDragonColor}; 

    &:hover {
        background-color: ${goldIshColor};
        color: #fff;
        border-color: ${goldIshColor};
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    }
`;