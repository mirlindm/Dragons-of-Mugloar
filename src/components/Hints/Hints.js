import React from 'react';
import { TextLoop } from 'react-text-loop-next';
import { Alert } from 'antd';

export const Hints = () => {
    return (                
        <div className="flex-row-container">
            <div className="flex-row-item-one game-name" style={{marginTop: '30px'}}> 
                <Alert banner type="info" className="hints" showIcon={false}
                    message={
                    <TextLoop mask>
                        <div>Monitor your stats! Buy Healing Poition to increase lives!</div>
                        <div>Make sure to avoid TRAPS!</div>
                        <div>Be careful with <span className="hints-probability"> Gamble, Suicide Mission </span> probability ads!</div>
                        <div>Target <span className="hints-probability"> Walk in the park, Sure Thing, Quite Likely </span> probability ads!</div>
                    </TextLoop>
                    }                               
                />
            </div>
        </div>
    );
}