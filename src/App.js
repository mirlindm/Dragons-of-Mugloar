import React, { useEffect } from 'react';
import './App.css';
import { StyledButton, StyledSubPar } from './styles/styles';
import { startGame, getMessagesForGame, solveMessage} from './services/gameService'
import { Welcome } from './pages/Welcome';
import { Modal, Button, message } from 'antd';
import { Instructions } from './components/Instructions/Instructions';
// import { Stats } from './components/Stats/Stats';
import { Shop } from './components/Shop/Shop';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { Badge, Popconfirm } from 'antd';

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
    console.log(data);
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
          <div className="flex-row-item-one game-name"> <StyledSubPar style={{mixBlendMode: 'difference', top: '40px'}}> Solve Ads Below </StyledSubPar>  </div>
          {gameMessages.map((message) => {
              return (               
                  <div key={message.adId} className="flex-row-item"> 
                  {message.reward < 20 ? <Badge.Ribbon placement="start" text="Maybe not" color="red"> </Badge.Ribbon> : null }
                  {message.reward > 20 && message.reward < 40 ? <Badge.Ribbon placement="start" text="Recommended" color="blue"> </Badge.Ribbon> : null }                    
                  {message.reward > 40 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                    <p style={{marginTop: '2px'}}> {message.adId} </p>                                                            
                    <p className="card__apply">
                      Challenge: {message.message}
                      <br/>
                      Probability: {message.probability}
                      <br/>
                      Reward: <span style={{fontWeight: 'bolder'}}> {message.reward} {message.reward > 30 ? '👍'	: '👎'} </span>
                      <br/>
                      Expires in: {message.expires}

                      {/* <a className="card__link" href="#">Apply Now <i className="fas fa-arrow-right"></i></a> */}
                    </p>
                    <Button onClick={() => solveMessageApi(message.adId)} style={{marginTop: '2px'}}> Solve this add </Button>
                    
                  </div>                         
                ) 
            })}          
        </div>

        <Modal title="Result 🔥" visible={isModalVisible} onOk={handleOk} centered onCancel={handleCancel}>
          {adsToSolve ?
            <>
              <h1> {adsToSolve.success ? <Confetti numberOfPieces={150} width={500} height={700}/>  : 'Challenge failed'}  </h1>
              <h2 >{adsToSolve.message}</h2>
              <p> Current score: {adsToSolve.score} </p>
              <p> Current gold: {adsToSolve.gold} </p>
              <p> Current highscore: {adsToSolve.highscore} </p>
              <p> You have: {adsToSolve.lives} </p>
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
