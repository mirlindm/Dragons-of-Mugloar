import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space } from 'antd';
import { StyledButton } from '../../styles/styles';

export const Stats = (props) => {
  const [visible, setVisible] = useState(false);
  // const [placement, setPlacement] = useState('right');

    useEffect(()  => {
        console.log("Props", props.name)
    })

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <StyledButton onClick={showDrawer}>
          Stats &nbsp; <i className="fas fa-thermometer"></i> 
        </StyledButton>
      </Space>
      
      <Drawer
        title="View your stats below"
        placement={"bottom"}
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
       <div className="container"> 
          <p  className="lives"> {props.lives} lives </p>
          <p  className="gold"> {props.gold} gold </p>
          <p  className="score">Your score: {props.score}</p>
          
        </div>
      </Drawer>
    </>
  );
};