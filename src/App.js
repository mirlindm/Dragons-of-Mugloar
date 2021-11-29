import React, { useEffect, useState } from 'react';
import { StyledButton,
         StyledParagraph,
         StyledAdInfo,
         StyledHeader,
        fireyDragonColor,
        goldIshColor, 
        StyledActionButton } from './styles/styles';
import { startGame, getMessagesForGame, solveMessage } from './services/gameService'
import { Welcome } from './pages/Welcome';
import { Stats } from './pages/Stats';
import { Modal, Button, message } from 'antd';
import { InstructionsDrawer } from './components/Instructions/InstructionsDrawer';
import { Shop } from './components/Shop/Shop';
import Confetti from 'react-confetti';
import { Badge, Popconfirm } from 'antd';
import { sortGameMessagesByReward, computeAdScore } from './utils/utils';
import { Buttons } from './components/Buttons/Buttons';

const App = () => {
  const [gameData, setGameData] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMessages, setGameMessages] = useState([]);
  const [adsToSolve, setAdsToSolve] = useState([]);
  const [score, setScore] = useState(0);
  const [gold, setGold] = useState(0);
  const [lives, setLives] = useState(0);
  // const [maxComputedScore, setMaxComputedScore] = React.useState(0);
  // const [adScore, setAdScore] = React.useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

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
      const filteredData = data.filter(message => !message.adId.endsWith('='))
      setGameMessages(filteredData.sort(sortGameMessagesByReward));
      // setMaxComputedScore(computeAdScore(filteredData));

      // setGameMessages(data.sort(computeAdScore(score, data.probability, data.reward, data.expiresIn)));

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
      getMessagesForGameApi(); 
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
        <InstructionsDrawer> Find Game Instructions </InstructionsDrawer>
        {/* <Instructions style={{marginRight: '10px'}} gold={gameData.gold} lives={gameData.lives} score={gameData.score} />         */}
      </div>
      }

      {gameStarted &&
      <div>
        <Stats gameId={gameData} score={score} gold={gold} lives={lives} />  
        <Buttons />
        <div className="flex-row-container">                 
          <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
            <Popconfirm placement="rightTop" onConfirm={confirm} title="Play again？" okText="Yes" cancelText="No">
              <StyledButton> Restart <span style={{marginRight: '30px'}} /> <i style={{marginLeft: '-15px'}} className="fas fa-redo nowrap"> </i> </StyledButton> 
            </Popconfirm>            
          </div>

          <div className="flex-row-item" style={{background: 'none', border: 'hidden', marginTop: '-40px'}}> 
            <Shop gameId={gameData.gameId} gold={gold} style={{width: '150px', textAlign: 'center', margin: 'auto'}}> 
              <i class="fas fa-shopping-cart"></i> 
            </Shop> 
          </div>

          <div className="flex-row-item-one game-name" style={{marginTop: '30px'}}> 
            <StyledParagraph style={{mixBlendMode: 'difference', top: '40px'}}>Take on Challenges Below</StyledParagraph>
          </div>
          
          {gameMessages.map(message => {
            return (               
              
                <div key={message.adId} className="flex-row-item" style={{height: '300px'}}> 
                {console.log("Ad computed score:", computeAdScore(message))}
                  {computeAdScore(message) < 2 ? <Badge.Ribbon placement="start" text="Maybe not" color="red"> </Badge.Ribbon> : null }
                  {computeAdScore(message) >= 2 && computeAdScore(message) < 3  ? <Badge.Ribbon placement="start" text="Recommended" color="blue"> </Badge.Ribbon> : null }                    
                  {computeAdScore(message) > 40 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                  {computeAdScore(message) > 100 ? <Badge.Ribbon placement="start" text="Careful! Can be a trap!" color="black"> </Badge.Ribbon> : null }                    
                    
                  <StyledHeader style={{marginTop: '2px'}}> {message.adId} </StyledHeader>                              
                  <StyledAdInfo> {message.message} </StyledAdInfo>
                      
                  <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column', }}>
                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Probability: <span style={{fontWeight: 'bolder'}}> {message.probability} </span> </StyledAdInfo>
                      </div>

                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Reward: <span style={{fontWeight: 'bolder'}}> {message.reward}  {message.reward > 30 ? '👍🏽'	: '👎🏽'} </span> </StyledAdInfo>
                      </div>
                      <div style={{position: 'relative', top: '10px'}}>
                      <StyledActionButton style={{width: '200px', height: '30px', backgroundColor: `${goldIshColor}`}} onClick={() => solveMessageApi(message.adId)} > Solve this add </StyledActionButton>
                      </div>
                      
                      {/* <div style={{position: 'relative', top: '75px', right: '140px'}}> */}
                        {/* <hr style={{borderColor: `${goldIshColor}`}} />                     */}
                        
                      {/* </div> */}
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
