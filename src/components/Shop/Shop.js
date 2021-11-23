import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space, Radio } from 'antd';
import { StyledButton } from '../../styles/styles';

export const Shop = (props) => {
  const [visible, setVisible] = useState(false);

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
        <i class="fas fa-shopping-cart"></i>
        </StyledButton>
      </Space>
      
      <Drawer
        title="Your stats for the game"
        placement={"right"}
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