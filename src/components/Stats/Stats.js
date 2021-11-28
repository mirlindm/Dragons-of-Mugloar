import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space } from 'antd';
import { fireyDragonColor, goldIshColor } from '../../styles/styles';
import { Ins } from '../Instructions/Ins';
import styled from 'styled-components'; 

const StyledInstructionsLabel = styled.div`
    font-weight: bold;
    font-size: 25px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${fireyDragonColor}, ${goldIshColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
    margin-top: 50px;
    position: relative;
    z-index: 10;
    padding: 5px; 
    top: 60px;
    border-bottom: 2px solid orange;
    cursor: pointer;

    &:hover {  
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
      transform: scale(1.01);
    }
`;

export const Stats = (props) => {
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
        <StyledInstructionsLabel onClick={showDrawer}>
           Find Game Instructions
        </StyledInstructionsLabel>
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
        <Ins />
      </Drawer>
    </>
  );
};