import React from 'react';
import { goldIshColor } from '../../styles/styles'; 
import styled from 'styled-components';

const StyledStatsValues = styled.span`
  color: ${goldIshColor}; 
  display: contents;
`;

const StyledStatsLabels = styled.p`
  padding: 20px;
  color: #fff;
  font-family: Architects Daughter;
  font-size: x-large;
  font-weight: 700;
`;

const StyledGameIntro = styled.h1`
    height: 70px;
    margin: 10px 50px 0 40px;
    border-radius: 10px;
`;

export const Stats = (props) => {
    return (
        <div>
            <StyledGameIntro className="flex-row-item-one game-name" > <StyledStatsLabels>Game <StyledStatsValues> {props.gameId} </StyledStatsValues> has started!</StyledStatsLabels> </StyledGameIntro>            
            <div className="flex-row-container">                 
              <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item">Lives: <StyledStatsValues> {props.lives} </StyledStatsValues> </StyledStatsLabels>
              <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item">Score: <StyledStatsValues> {props.score} </StyledStatsValues> </StyledStatsLabels>
              <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item">Gold: <StyledStatsValues> {props.gold} </StyledStatsValues> </StyledStatsLabels>
            </div>
        </div>
    );
}