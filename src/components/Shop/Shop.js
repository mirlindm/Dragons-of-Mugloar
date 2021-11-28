import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space, message } from 'antd';
import { getItemsInShop, purchaseItem } from '../../services/gameService';
import { StyledActionButton,
         StyledName,
         StyledContent,
         StyledButton
        } from '../../styles/styles';
import styled from 'styled-components';

const DrawerLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* border-right: 1px solid red;
  border-left: 1px solid red; */
  margin-top: 10px;
  
`;

const DrawerContent = styled.div`
  flex: 50%;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border-left: 5px solid #e25822;
  /* border-radius: 5px; */

  &:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
  }
`;

export const Shop = (props) => {
  const [visible, setVisible] = useState(false);
  const [itemsInShop, setItemsInShop] = React.useState([]);

  const getItemsInShopApi = async () => {
    const { data } = await getItemsInShop(props.gameId);
    if(data) {
      setItemsInShop(data);
      console.log("here", data);
    }
  }

  const purchaseItemApi = async (itemId, itemCost) => {
    if(props.gold < itemCost) {
      return message.warning("Insufficient Gold!");
    }
    const { data } = await purchaseItem(props.gameId, itemId);
    if (data) {
      console.log(data);
      message.success("Item Purchased!");      
    } 
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <StyledButton onClick={() => {showDrawer(); getItemsInShopApi()}}>
          Shop &nbsp;
          <i className="fas fa-shopping-cart"></i>
        </StyledButton>
      </Space>
      
      <Drawer
        title="Welcome to the dragon shop 🎁"
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
        <DrawerLayout>
          {itemsInShop.map((item) => {
            return(
              <DrawerContent key={item.id}>   
                <StyledName> {item.name} </StyledName>             
                <hr className="divider" />
                <StyledContent> Cost: {item.cost} </StyledContent>
                <StyledActionButton onClick={() => purchaseItemApi(item.id, item.cost)}> Buy 💰 </StyledActionButton>
              </DrawerContent>
            )
          })}
        </DrawerLayout>
      </Drawer>
    </>
  );
};