import React from 'react';
import { Popover, Button } from 'antd';

export const Instructions = () => {  
  const [clicked, setClicked] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const hide = () => {
    setClicked(false);
    setHovered(false);
  };

  const handleHoverChange = visible => {
    setClicked(false);
    setHovered(visible);
  };

  const handleClickChange = visible => {
    setClicked(visible);
    setHovered(false);
  };

    const hoverContent = <div>This is hover content.</div>;
    const clickContent = <div>This is click content.</div>;

  return(
      <Popover
        style={{ width: 500 }}
        content={hoverContent}
        title="Hover title"
        trigger="hover"
        visible={hovered}
        onVisibleChange={handleHoverChange}
      >
        <Popover
          content={
            <div>
              {clickContent}
              <a onClick={hide}>Close</a>
            </div>
          }
          title="Click title"
          trigger="click"
          visible={clicked}
          onVisibleChange={handleClickChange}
        >
           <Button style={{textDecoration: 'underline', color: '#fff'}}> Find Instructions </Button>
        </Popover>
      </Popover>
  );
}
