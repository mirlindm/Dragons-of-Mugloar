import React, { useState } from 'react';
import { Drawer, Space } from 'antd';
import { fireyDragonColor, goldIshColor } from '../../styles/styles';
import { Instructions } from './Instructions';
import styled from 'styled-components'; 
import 'antd/dist/antd.css';

const StyledInstructionsLabel = styled.div`
    font-weight: bold;
    font-size: 25px; 
    font-family: Architects Daughter, cursive;
    background: -webkit-linear-gradient(${fireyDragonColor}, ${goldIshColor});
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent; 
    position: relative;
    z-index: 10;
    padding: 5px; 
    top: 300px;
    border-bottom: 2px solid orange;
    cursor: pointer;

    &:hover {  
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
      transform: scale(1.01);
    }
`;

export const InstructionsDrawer = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

   return (
    <div>
      <Space>
        <StyledInstructionsLabel onClick={showDrawer}>
           How to play the game?
        </StyledInstructionsLabel>
      </Space>
      
      <Drawer
        title="View your stats below"
        placement={"bottom"}
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Instructions />
      </Drawer>
    </div>
  );
};