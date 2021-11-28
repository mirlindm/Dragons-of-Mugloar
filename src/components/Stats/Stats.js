import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space } from 'antd';
import { StyledButton } from '../../styles/styles';

export const Stats = (props) => {
  const [visible, setVisible] = useState(false);

    useEffect(()  => {
        console.log("Props", props.name) // please remove all Console.log before submitting
    })

  const showDrawer = () => {// func is just delegating call to another func, please consider using showDrawer directly
    setVisible(true);
  };

  const onClose = () => {// func is just delegating call to another func, please consider using onClose directly
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
       <div className="container"> {/*I recommend making this container and sub p's into separate dedicated component*/}
          <p  className="lives"> {props.lives} lives </p>
          <p  className="gold"> {props.gold} gold </p>
          <p  className="score">Your score: {props.score}</p>
          
        </div>
      </Drawer>
    </>
  );
};