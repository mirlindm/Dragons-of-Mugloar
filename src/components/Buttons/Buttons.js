import React from 'react';
import { Popconfirm } from 'antd';
import { StyledButton } from '../../styles/styles';
import { Shop } from '../Shop/Shop';



export const Buttons = (props) => {
    return (
        <div className="flex-row-container">     
        <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
        <Popconfirm placement="rightTop"  title="Play again？" okText="Yes" cancelText="No">
          <StyledButton> Restart <span style={{marginRight: '30px'}} /> <i style={{marginLeft: '-15px'}} className="fas fa-redo nowrap"> </i> </StyledButton> 
        </Popconfirm>
      </div>

      <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
        <Shop  style={{width: '150px', textAlign: 'center', margin: 'auto'}}> 
          <i class="fas fa-shopping-cart"></i> 
        </Shop> 
      </div>
    </div>
    );
}