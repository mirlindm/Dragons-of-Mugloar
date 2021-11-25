import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Space, message } from 'antd';
import { getItemsInShop, purchaseItem } from '../../services/gameService';
import { StyledButton } from '../../styles/styles';
import styled from 'styled-components';

const DrawerLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
  margin-top: 10px;
`;

const DrawerContent = styled.div`
  flex: 50%;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid red;
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
      return message.warning("Not enough gold!");
    }
    const { data } = await purchaseItem(props.gameId, itemId);
    if (data) {
      console.log(data);
      message.success("Item bought");      
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
              <h2 style={{color: '#f76707', fontSize: '20px'}}> {item.name} </h2>
              <p> {item.id} </p>
              <hr />
              <p> Cost: {item.cost} </p>
              <Button onClick={() => purchaseItemApi(item.id, item.cost)}> Buy 💰 </Button>

            </DrawerContent>
            )
          })}
        </DrawerLayout>
      </Drawer>
    </>
  );
};