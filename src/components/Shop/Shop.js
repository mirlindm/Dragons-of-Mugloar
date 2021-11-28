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
      return message.warning("Not enough gold!");
    }
    const { data } = await purchaseItem(props.gameId, itemId);
    if (data) {
      console.log(data);
      message.success("Item bought");      
    } 
  }

  const showDrawer = () => { // func is just delegating call to another func, please consider using setVisible directly
    setVisible(true);
  };

  const onClose = () => { // func is just delegating call to another func, please consider using onClose directly
    setVisible(false);
  };

  return (
    <>
      <Space>
        <StyledButton onClick={() => {showDrawer(); getItemsInShopApi()}}>
          Shop &nbsp;{/*// Do not use '&nbsp'. Consider a better approach
          like here http://zuga.net/articles/css-an-alternative-to-nbsp/,
           Replace elsewhere in the code too*/} .
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
              {/* <h2 style={{color: '#f76707', fontSize: '20px'}}> {item.name} </h2> */} {/*Remove unnecessary code*/}
              {/* <StyledShopItemsContent> {item.id} </StyledShopItemsContent> */}
              <hr className="divider" />
              <StyledContent> Cost: {item.cost} </StyledContent>
              <StyledActionButton onClick={() => purchaseItemApi(item.id, item.cost)}> Buy 💰 </StyledActionButton> {/*Make the Dollar sign into a component*/}

            </DrawerContent>
            )
          })}
        </DrawerLayout>
      </Drawer>
    </>
  );
};