import React from 'react';
import { Timeline, Popover } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { StyledSubPar } from '../../styles/styles';

export const Instructions = () => {

  const gameInstructions = (
    <Timeline mode="alternate">
      <Timeline.Item color="red">Press on START firey button</Timeline.Item>
      <Timeline.Item color="red">Game xxx has begun</Timeline.Item>
      <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
        View Stats (score, lives &amp; gold)
      </Timeline.Item>
      <Timeline.Item color="red">View all Ads. Purchase any ad</Timeline.Item>
      <Timeline.Item color="red"> Purchase items, as needed </Timeline.Item>
      <Timeline.Item color="red">Score higher than 1000!</Timeline.Item>
    </Timeline>
  ) 

  return (
    <div style={{position: 'absolute', left: '20%', right: '20%', bottom: '10%'}}>   
      <Popover content={gameInstructions} placement="bottom" title="Not sure how to play the game?" trigger="hover">
        <StyledSubPar>Find Instructions</StyledSubPar>
      </Popover>
    </div>

  )
}
  
  