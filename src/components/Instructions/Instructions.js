import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
const { Step } = Steps;

const steps = [
  {
    title: 'START',
    content: 'Press on START firey button',
  },
  {
    title: 'GAME',
    content: 'Game xxx has begun',
  },
  {
    title: 'STATS',
    content: 'View Stats (score, lives & gold)',
  },
  {
    title: 'ADS',
    content: 'Solve Challenges',
  },
  {
    title: 'SHOP',
    content: 'Purchase items in the shop',
  },
  {
    title: 'SCORE',
    content: 'Make sure to score higher than 1000!',
  },
  {
    title: 'FINISH',
    content: 'Game successfully finished!',
  },
];

export const Instructions = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div style={{margin: '20px 0', fontSize: '20px', background: '#e25822', color: '#fbbd47'}} className="steps-content">  {steps[current].content} </div>
      <div className="steps-action">
      {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('You are now good to go! Click anywhere on the screen to continue!')}>
            Done
          </Button>
        )}

      </div>
    </div>
  );
};
