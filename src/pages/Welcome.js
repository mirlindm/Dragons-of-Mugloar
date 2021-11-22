import React from 'react';
import { StyledSubPar } from '../styles/styles';


export const Welcome = () => {
    return (
        <>
            <p style={{marginTop: '100px', fontWeight: 'bolder', fontSize: '100px', fontFamily: 'Architects Daughter', color: '#fc7800'}}>
                Dragons of Mugolar
            </p> 
            
            <StyledSubPar>
                Hit Play to Slay
            </StyledSubPar>
        </>
    )
}