import React, { useEffect } from 'react';
import './App.css';
import { StyledButton, StyledSubPar, StyledAdInfo, StyledContent, StyledHeader, StyledName, StyledHeading } from './styles/styles';
import { startGame, getMessagesForGame, solveMessage} from './services/gameService'
import { Welcome } from './pages/Welcome';
import { Modal, Button, message } from 'antd';
import { Instructions } from './components/Instructions/Instructions';
// import { Stats } from './components/Stats/Stats';
import { Shop } from './components/Shop/Shop';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { Badge, Popconfirm, Statistic } from 'antd';

const { Countdown } = Statistic;

// const PageLayout = styled.div`
//     background: #aaa;
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: center;
// `;

const StyledStats = styled.span`
  color: #fbbd47; 
  display: contents;
`;


const App = () => {
  const [gameData, setGameData] = React.useState('');
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameMessages, setGameMessages] = React.useState([]);
  const [adsToSolve, setAdsToSolve] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [gold, setGold] = React.useState(0);
  const [lives, setLives] = React.useState(0);
  // const [itemsInShop, setItemsInShop] = React.useState([]);
  
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const startGameApi = async () => {
    const { data }  = await startGame();
    console.log(data);
    setGameData(data);
    setGameStarted(true);
    setScore(data.score);
    setGold(data.gold);
    setLives(data.lives);
  }

  useEffect(() => {
    const getMessagesForGameApi = async () => {
      const { data} = await getMessagesForGame(gameData.gameId)
      if(data) {
        setGameMessages(data);
        console.log('NOW', data)
      }
    }
    
    getMessagesForGameApi();
  }, [gameData.gameId]);

  
  const solveMessageApi = async (adId) => {
    const { data } = await solveMessage(gameData.gameId, adId)
    setAdsToSolve(data);
    setIsModalVisible(true);
    if(data.success) {
      setScore(score + data.score);
      setLives(lives + data.lives);
      setGold(gold + data.gold)
    }
    gameMessages.filter(message => message.adId !== adId);
    console.log('this id: ', adId)
    console.log(gameMessages);
  }

  // const getItemsInShopApi = async () => {
  //   const { data } = await getItemsInShop(gameData.gameId);
  //   console.log(data);
  // }

  const confirm = (e) =>  {
    startGameApi();
  }

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      {!gameStarted && 
      <>
        <Welcome />
        
        <StyledButton onClick={startGameApi}> START </StyledButton>
        <Instructions style={{marginRight: '10px'}}  gold={gameData.gold} lives={gameData.lives} score={gameData.score} />        
      </>
      }

      {gameStarted &&
      <>
        <div className="container">
          <h2 className="game-name"> Game <StyledStats> {gameData.gameId} </StyledStats> has started!</h2>
          
          <p  className="lives"> Lives: <StyledStats> {lives} </StyledStats> </p>
          <p  className="gold"> Gold: <StyledStats> {gold} </StyledStats> </p>
          <p  className="score"> Score: <StyledStats> {score} </StyledStats> </p>
        </div>

        <div className="flex-row-container">
          {/* <div className="flex-row-item" style={{background: '#fbbd47'}}> <Stats /> </div> */}
          <div className="flex-row-item" style={{background: '#fbbd47'}}> 
            <Popconfirm placement="rightTop" onConfirm={confirm} title="Play again？" okText="Yes" cancelText="No">
              <StyledButton> Restart &nbsp; <i style={{marginLeft: '-15px'}} className="fas fa-redo"></i> </StyledButton> 
            </Popconfirm>            
          </div>
          <div className="flex-row-item" style={{background: '#fbbd47'}}> <Shop gameId={gameData.gameId} gold={gold} style={{width: '150px', textAlign: 'center', margin: 'auto'}}> <i  class="fas fa-shopping-cart"></i>  </Shop>  </div>
          <div className="flex-row-item-one game-name"> <StyledSubPar style={{mixBlendMode: 'difference', top: '40px'}}> Take on Challenges Below </StyledSubPar>  </div>
          {gameMessages.map((message) => {
              return (               
                  <div key={message.adId} className="flex-row-item" style={{height: '250px'}}> 
                  {message.reward < 20 ? <Badge.Ribbon placement="start" text="Maybe not" color="red"> </Badge.Ribbon> : null }
                  {message.reward > 20 && message.reward < 40 ? <Badge.Ribbon placement="start" text="Recommended" color="blue"> </Badge.Ribbon> : null }                    
                  {message.reward > 40 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                    <StyledHeader style={{marginTop: '2px'}}> {message.adId} </StyledHeader>                              
                      <StyledAdInfo> {message.message} </StyledAdInfo>
                      
                      <div style={{display: 'flex', justifyContent: 'center', margin: '-12px 0'}}>
                        <div style={{padding: '5px', marginRight: '5px'}}>
                          <StyledAdInfo> Probability: <span style={{fontWeight: 'bolder'}}> {message.probability} </span> </StyledAdInfo>
                        </div>
                        <div style={{padding: '5px'}}>
                          <StyledAdInfo> Reward:  <span style={{fontWeight: 'bolder'}}> {message.reward}  {message.reward > 30 ? '👍🏽'	: '👎🏽'} </span> </StyledAdInfo>
                        </div>
                      </div>                      
                      <hr  style={{borderColor: '#fbbd47'}} />
                    <Button onClick={() => solveMessageApi(message.adId)} style={{marginTop: '2px'}}> Solve this add  </Button>
                    <Countdown style={{position: 'relative', right: '-170px', top: '-15px', fontSize: '2px !important', color: '#e25822 !important'}} value={Date.now() + message.expiresIn * 1000} format={'ss'}  />                                                          
                    
                  </div>                         
                ) 
            })}          
        </div>

        <Modal transitionName="" maskTransitionName="" title="Challenge Result" visible={isModalVisible} onOk={handleOk} centered
          footer={[
            <Button style={{border: '1px solid #e25822'}} onClick={handleOk}> Ok </Button>
          ]}
        >
          {adsToSolve ?
            <>
              <h1> {adsToSolve.success ? <Confetti numberOfPieces={150} width={500} height={700}/> : 'Challenge failed'}  </h1>
              <StyledHeader style={{fontSize: '30px', textAlign: 'center'}}>{adsToSolve.message}</StyledHeader>
              <StyledAdInfo> Your score is {adsToSolve.score} </StyledAdInfo>
              <StyledAdInfo> Your highscore is {adsToSolve.highscore} </StyledAdInfo>
              <StyledAdInfo> You have {adsToSolve.gold} gold! </StyledAdInfo>            
              <StyledAdInfo> You have {adsToSolve.lives} lives </StyledAdInfo>
            </>
              : null                    
          }
        </Modal> 
      </>      
      }  
      {score > 1000 ? message.success("You reached 1K score!") : null}    
    </div>
  );
}

export default App;
