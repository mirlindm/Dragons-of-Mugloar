import React, { useEffect } from 'react';
import { StyledButton,
         StyledParagraph,
         StyledAdInfo,
         StyledHeader,
        fireyDragonColor,
        goldIshColor } from './styles/styles';
import { startGame, getMessagesForGame, solveMessage} from './services/gameService'
import { Welcome } from './pages/Welcome';
import { Modal, Button, message } from 'antd';
import { Stats } from './components/Stats/Stats';
import { Shop } from './components/Shop/Shop';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { Badge, Popconfirm, Statistic } from 'antd';
import { sortGameMessagesByReward } from './utils/utils';

const { Countdown } = Statistic;

const StyledStatsValues = styled.span`
  color: ${goldIshColor}; 
  display: contents;
`;

const StyledStatsLabels = styled.p`
  padding: 20px;
  color: #fff;
  font-family: Architects Daughter;
  font-size: x-large;
  font-weight: 700;
`;

const App = () => {
  const [gameData, setGameData] = React.useState('');
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameMessages, setGameMessages] = React.useState([]);
  const [adsToSolve, setAdsToSolve] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [gold, setGold] = React.useState(0);
  const [lives, setLives] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const startGameApi = async () => {
    const { data }  = await startGame();
    setGameData(data);
    setGameStarted(true);
    setScore(data.score);
    setGold(data.gold);
    setLives(data.lives);
  }

  useEffect(() => {

    // const getMessagesForGameApi = async () => {
    //   await getMessagesForGame(gameData.gameId)
    //   .then(response => {
    //     setGameMessages(response.data); 
    //     console.log(response.data);
    //   })
    //   .catch(e => console.log(e));
    // }
    
    getMessagesForGameApi();
  }, [gameData.gameId]);

  const getMessagesForGameApi = async () => {
    const { data } = await getMessagesForGame(gameData.gameId);
    if(data) {
      console.log('messages for the game:', data);        
      //setGameMessages(sortGameMessagesByReward(data));   
      setGameMessages(data.sort(sortGameMessagesByReward));
      //console.log("after sorting", data.sort((a, b) => (a.reward > b.reward ? 1 : -1)));  
    }
    //gameMessages.sort((firstObject, secondObject) => (firstObject.reward > secondObject.reward) ? 1 : -1);
    // console.log("gameMessages", gameMessages)
    //let x = gameMessages.sort((a, b) => (a.reward > b.reward ? 1 : -1));
    //console.log("sorted?", x)
    setTimeout(() => {
      console.log("after sorting", data.sort((a, b) => (a.reward > b.reward ? 1 : -1)));  
    }, 10000)
    
  }

  const solveMessageApi = async (adId) => {
    const { data } = await solveMessage(gameData.gameId, adId)
    setAdsToSolve(data);
    setIsModalVisible(true);
    if(data.success) {
      setScore(data.score);
      setLives(data.lives);
      setGold(data.gold);
      getMessagesForGameApi();
    } else {
      setScore(data.score);
      setLives(data.lives);
      setGold(data.gold);      
    }

    if(lives === 0 || data.lives === 0) {
      message.warning('Game Over. New Game Will begin shortly');
      startGameApi();
    }
    gameMessages.filter(message => message.adId !== adId);
    console.log('this id: ', adId)
    console.log('lives: ', data.lives)
    console.log(gameMessages);
  }

  const confirm = (e) =>  {
    startGameApi();
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {!gameStarted && 
      <div>
        <Welcome />
        <StyledButton onClick={startGameApi}>START</StyledButton>
        <br/>
        <Stats> Find Game Instructions </Stats>
        {/* <Instructions style={{marginRight: '10px'}} gold={gameData.gold} lives={gameData.lives} score={gameData.score} />         */}
      </div>
      }

      {gameStarted &&
      <div>
        <h2 className="flex-row-item-one game-name" style={{height: '70px', margin: '10px 50px 0 40px', borderRadius: '10px'}}> <StyledStatsLabels> Game <StyledStatsValues> {gameData.gameId} </StyledStatsValues> has started! </StyledStatsLabels> </h2>
        
        <div className="flex-row-container">                 
          <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item"> Lives: <StyledStatsValues> {lives} </StyledStatsValues> </StyledStatsLabels>
          <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item"> Gold: <StyledStatsValues> {gold} </StyledStatsValues> </StyledStatsLabels>
          <StyledStatsLabels style={{flex: '1 0 25%',  height: '80px'}} className="flex-row-item"> Score: <StyledStatsValues> {score} </StyledStatsValues> </StyledStatsLabels>

          <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
            <Popconfirm placement="rightTop" onConfirm={confirm} title="Play again？" okText="Yes" cancelText="No">
              <StyledButton> Restart &nbsp; <i style={{marginLeft: '-15px'}} className="fas fa-redo"> </i> </StyledButton> 
            </Popconfirm>            
          </div>

          <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
            <Shop gameId={gameData.gameId} gold={gold} style={{width: '150px', textAlign: 'center', margin: 'auto'}}> 
              <i  class="fas fa-shopping-cart"></i> 
            </Shop> 
          </div>

          <div className="flex-row-item-one game-name" style={{marginTop: '30px'}}> 
            <StyledParagraph style={{mixBlendMode: 'difference', top: '40px'}}>Take on Challenges Below</StyledParagraph>
          </div>
          
          {gameMessages.map(message => {
            return (               
              
                <div key={message.adId} className="flex-row-item" style={{height: '250px'}}> 
                  {message.reward < 20 ? <Badge.Ribbon placement="start" text="Maybe not" color="red"> </Badge.Ribbon> : null }
                  {message.reward > 20 && message.reward < 40 ? <Badge.Ribbon placement="start" text="Recommended" color="blue"> </Badge.Ribbon> : null }                    
                  {message.reward > 40 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                  {message.reward > 100 ? <Badge.Ribbon placement="start" text="Careful! Can be a trap!" color="black"> </Badge.Ribbon> : null }                    
                    
                  <StyledHeader style={{marginTop: '2px'}}> {message.adId} </StyledHeader>                              
                  <StyledAdInfo> {message.message} </StyledAdInfo>
                      
                  <div style={{display: 'flex', justifyContent: 'center', margin: '-12px 0'}}>
                      <div style={{padding: '5px', marginRight: '5px'}}>
                        <StyledAdInfo>Probability: <span style={{fontWeight: 'bolder'}}> {message.probability} </span> </StyledAdInfo>
                      </div>
                      <div style={{padding: '5px', position: 'relative', left: '100px'}}>
                        <StyledAdInfo>Reward: <span style={{fontWeight: 'bolder'}}> {message.reward}  {message.reward > 30 ? '👍🏽'	: '👎🏽'} </span> </StyledAdInfo>
                      </div>
                      <br/>
                      <div style={{position: 'relative', top: '75px', right: '140px'}}>
                        <hr style={{borderColor: `${goldIshColor}`}} />                    
                        <Button onClick={() => solveMessageApi(message.adId)} style={{marginTop: '2px'}}> Solve this add </Button>
                      </div>

                      
                  </div>                      
                    

                    {/* <Countdown style={{position: 'relative', right: '-170px', top: '-15px', fontSize: '2px !important', color: `${fireyDragonColor} !important`}} value={Date.now() + message.expiresIn * 1000} format={'ss'} />                     */}
                </div>                         
              ); 
            })}          
        </div>

        <Modal 
          transitionName="" 
          maskTransitionName="" 
          title="Challenge Result" 
          visible={isModalVisible} onOk={handleOk} 
          centered
          footer={[
            <Button style={{border: `1px solid ${fireyDragonColor}`}} onClick={handleOk}>Ok</Button>
          ]}
        >
          {adsToSolve ?
            <div>
              <h1> {adsToSolve.success ? <Confetti numberOfPieces={150} width={500} height={700}/> : <StyledHeader>Challenge failed</StyledHeader>} </h1>
              <StyledHeader style={{fontSize: '30px', textAlign: 'center'}}> {adsToSolve.message} </StyledHeader>
              <StyledAdInfo>Your score is {adsToSolve.score}</StyledAdInfo>
              <StyledAdInfo>Your highscore is {adsToSolve.highscore}</StyledAdInfo>
              <StyledAdInfo>You have {adsToSolve.gold} gold!</StyledAdInfo>            
              <StyledAdInfo>You have {adsToSolve.lives} lives</StyledAdInfo>
            </div>
            : null                    
          }
        </Modal> 
      </div>      
      }  
      {score > 1000 ? message.success("You reached 1K score!") : null}    
    </div>
  );
}

export default App;
