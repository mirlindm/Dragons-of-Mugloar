import React, { useEffect, useState } from 'react';
import { StyledButton,
         StyledParagraph,
         StyledAdInfo,
         StyledHeader,
         goldIshColor, 
         StyledActionButton 
        } from './styles/styles';
import { startGame, getMessagesForGame, solveMessage } from './services/gameService'
import { Welcome } from './pages/HomePage/Welcome';
import { Stats } from './pages/GameStats/Stats';
import { message } from 'antd';
import { InstructionsDrawer } from './pages/Instructions/InstructionsDrawer';
import { Badge } from 'antd';
import { sortGameMessagesByReward, computeAdScore } from './utils/utils';
import { Buttons } from './components/Buttons/Buttons';
import { AdsModal } from './components/Modal/AdsModal';

const App = () => {
  const [gameData, setGameData] = useState('');
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameMessages, setGameMessages] = useState([]);
  const [adsToSolve, setAdsToSolve] = useState([]);
  const [normalizedAdScores, setNormalizedAdScores] = useState([]);
  const [score, setScore] = useState(0);
  const [gold, setGold] = useState(0);
  const [lives, setLives] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const startGameApi = async () => {
    const { data }  = await startGame();
    console.log("game started: ", data);
    setGameData(data);
    setHasGameStarted(true);
    setScore(data.score);
    setGold(data.gold);
    setLives(data.lives);
  }

  useEffect(() => {

    // const getMessagesForGameApi = async () => {
    //   await getMessagesForGame(gameData.gameId);
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
      const filteredAds = data.filter(message => !message.adId.endsWith('='));

      setGameMessages(filteredAds.sort(sortGameMessagesByReward));

      // console.log("Normalized ad scores1: ", normalizedAdScores);
      // setNormalizedAdScores(gameMessages.map(message => computeAdScore(message)));

      // console.log("Normalized ad scores2: ", normalizedAdScores);
      // setNormalizedAdScores(normalizedAdScores / Math.max(...normalizedAdScores));
      // console.log("Normalized ad scores3: ", normalizedAdScores);
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
    }, 10000);
    
  }

  const solveMessageApi = async (adId) => {
    const { data } = await solveMessage(gameData.gameId, adId);

    if(data) {
      console.log("solved: ", data);
      setAdsToSolve(data);
      setIsModalVisible(true);

      if(data.success) {
        setScore(data.score);
        setLives(data.lives);
        setGold(data.gold);      
      } else {
        setScore(data.score);
        setLives(data.lives);
        setGold(data.gold);
      }
      getMessagesForGameApi();
  
      if(data.lives === 1) {
        message.warning('Only 1 life remaining. Consider purchasing a healing potion from the shop!');
      }
  
      if(data.lives === 0) {
        message.warning('Game Over. New Game Will begin shortly ... ');
        startGameApi();
      }
  
      if(data.score >= 1000) {
        message.success('Congrats! You reached 1K score! Keep it up!');      
      }
    }
  }

  return (
    <div>
      {!hasGameStarted && 
        <div>
          <Welcome />
          <StyledButton onClick={startGameApi}>START</StyledButton>          
          <InstructionsDrawer />
        </div>
      }

      {hasGameStarted &&
      <div>
        <Stats gameId={gameData} score={score} gold={gold} lives={lives} />          
        <Buttons gold={gold} setGold={setGold} setLives={setLives} gameId={gameData.gameId} startGameApi={startGameApi} />

        <div className="flex-row-container">
          <div className="flex-row-item-one game-name" style={{marginTop: '30px'}}> 
            <StyledParagraph style={{mixBlendMode: 'difference', top: '40px'}}>Take on Challenges Below</StyledParagraph>
          </div>
          
          {gameMessages.map((message,key) => {
            console.log(key, ' normalized score ', normalizedAdScores[key])
            return (                             
                <div key={message.adId} className="flex-row-item" style={{height: '300px'}}> 
                  {console.log("Ad computed score:", computeAdScore(message))}
                  {normalizedAdScores[key] < 0.4 ? <Badge.Ribbon placement="start" text="Maybe not" color="red"> </Badge.Ribbon> : null }
                  {normalizedAdScores[key] >= 0.8 ? <Badge.Ribbon placement="start" text="Recommended" color="blue"> </Badge.Ribbon> : null }                    
                  {normalizedAdScores[key] > 0.6 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                  {normalizedAdScores[key] > 0.95 ? <Badge.Ribbon placement="start" text="Careful! Can be a trap!" color="black"> </Badge.Ribbon> : null }                    
                    
                  <StyledHeader style={{marginTop: '2px'}}> {message.adId} </StyledHeader>                              
                  <StyledAdInfo> {message.message} </StyledAdInfo>
                      
                  <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column', }}>
                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Probability: <span style={{fontWeight: 'bolder'}}> {message.probability} </span> </StyledAdInfo>
                      </div>

                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Reward: <span style={{fontWeight: 'bolder'}}> {message.reward} </span> </StyledAdInfo>
                      </div>

                      <div style={{position: 'relative', top: '10px'}}>
                        <StyledActionButton style={{width: '200px', height: '30px', backgroundColor: `${goldIshColor}`}} onClick={() => solveMessageApi(message.adId)} > Solve this add </StyledActionButton>
                      </div>
                  </div>

                </div>
              ); 
            })}          
        </div>      
        <AdsModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} adsToSolve={adsToSolve} />         
      </div>      
      }
    </div>
  );
}

export default App;
