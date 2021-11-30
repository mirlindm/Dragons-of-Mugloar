import React from 'react';
import { Modal, Button } from 'antd';
import Confetti from 'react-confetti';
import { StyledHeader, StyledAdInfo, fireyDragonColor } from '../../styles/styles';

export const AdsModal = (props) => {

    const handleOk = () => {        
        props.setIsModalVisible(false)
      };

    return (
        <Modal 
          transitionName="" 
          maskTransitionName="" 
          title="Challenge Solving Result" 
          visible={props.isModalVisible}
          onOk={handleOk}
          centered
          closable={false}
          keyboard={false}
          maskClosable={true}
          footer={[
            <Button style={{border: `1px solid ${fireyDragonColor}`}} onClick={handleOk}>Ok</Button>
          ]}
        >
            <div>
              <h1> {props.adsToSolve.success ? <Confetti numberOfPieces={150} width={500} height={700}/> : <StyledHeader>Challenge failed</StyledHeader>} </h1>
              <StyledHeader style={{fontSize: '30px', textAlign: 'center'}}> {props.adsToSolve.message} </StyledHeader>
              <StyledAdInfo>Your score is {props.adsToSolve.score}</StyledAdInfo>
              <StyledAdInfo>Your highscore is {props.adsToSolve.highscore}</StyledAdInfo>
              <StyledAdInfo>You have {props.adsToSolve.gold} gold!</StyledAdInfo>            
              <StyledAdInfo>You have {props.adsToSolve.lives} lives</StyledAdInfo>
            </div>
        </Modal> 
    )
}