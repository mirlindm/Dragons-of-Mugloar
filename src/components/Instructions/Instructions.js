import React from 'react';
import { Timeline, Popover } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { StyledParagraph } from '../../styles/styles';
import styled from 'styled-components';

const StyledLayout = styled.div`
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: 10%;
`;

export const Instructions = () => {

  const gameInstructions = (
    <Timeline mode="alternate">
      <Timeline.Item color="red">Press on START firey button</Timeline.Item>
      <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Game xxx has begun</Timeline.Item>
      <Timeline.Item color="red">
        View Stats (score, lives &amp; gold)
      </Timeline.Item>
      <Timeline.Item color="red">Solve Challenges</Timeline.Item>
      <Timeline.Item color="red"> Purchase items in the shop </Timeline.Item>
      <Timeline.Item color="red">Make sure to score higher than 1000!</Timeline.Item>
    </Timeline>
  ); 

  return (
    <StyledLayout>   
      <Popover content={gameInstructions} placement="bottom" title="How to play the game?" trigger="hover">
        <StyledParagraph>Find Game Instructions</StyledParagraph>
      </Popover>
    </StyledLayout>
  );
}
  
  