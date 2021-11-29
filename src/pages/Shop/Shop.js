import React, { useState } from 'react';
import { Drawer, Space, message } from 'antd';
import { getItemsInShop, purchaseItem } from '../../services/gameService';
import { StyledActionButton,
         StyledName,
         StyledContent,
         StyledButton
        } from '../../styles/styles';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const DrawerLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const DrawerContent = styled.div`
  flex: 50%;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border-left: 5px solid #e25822;

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
      console.log("items in shop", data);
    }
  }

  const purchaseItemApi = async (itemId, itemCost) => {
    if(props.gold < itemCost) {
      return message.warning("Insufficient Gold!");
    }
    const { data } = await purchaseItem(props.gameId, itemId);
    if (data) {    
      message.success("Item Purchased!");
      console.log("Item Purchased", data)
      props.setGold(props.gold - itemCost);
      props.setLives(data.lives);
    }
  }

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <StyledButton onClick={() => {setVisible(true); getItemsInShopApi()}}>
          Shop <span style={{marginRight: '20px'}} />
          <i className="fas fa-shopping-cart"></i>
        </StyledButton>
      </Space>
      
      <Drawer
        title="All the things you need 🎁"
        placement={"right"}
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <DrawerLayout>
          {itemsInShop.map((item) => {
            return(
              <DrawerContent key={item.id}>   
                <StyledName> {item.name} </StyledName>             
                 <hr className="divider" />
                <StyledContent>Cost: {item.cost}</StyledContent>
                <StyledActionButton onClick={() => purchaseItemApi(item.id, item.cost)}>Purchase</StyledActionButton>
              </DrawerContent>
            )
          })}
        </DrawerLayout>
      </Drawer>
    </>
  );
};