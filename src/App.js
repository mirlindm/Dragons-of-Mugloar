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
import gibberish from 'gibberish-detector';

const App = () => {
  const [gameData, setGameData] = useState({});
  const [score, setScore] = useState(0);
  const [gold, setGold] = useState(0);
  const [lives, setLives] = useState(0);

  const [gameAds, setGameAds] = useState([]);
  const [adsToSolve, setAdsToSolve] = useState([]);
  // const [normalizedAdScores, setNormalizedAdScores] = useState([]);

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasScoreReachedThousand, setHasScoreReachedThousand ] = useState(true);

  const updateStats = data => {
    setScore(data.score);
    setGold(data.gold);
    setLives(data.lives);
  }

  const startGameApi = async () => {
    const { data }  = await startGame();
    setGameData(data);
    setHasGameStarted(true);
    updateStats(data);
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
    
    getAdsForGameApi();
  }, [gameData.gameId]);

  const getAdsForGameApi = async () => {
    const { data } = await getMessagesForGame(gameData.gameId);
    if(data) {                   
      const filteredAds = data.filter(ad => !ad.adId.endsWith('=') && gibberish.detect(ad.message) < 10);
      console.log("Filtered:", filteredAds)
      
      //const removeGibberishAds = filteredAds
      
      setGameAds(filteredAds.sort(sortGameMessagesByReward));
    }
  }

  // const normalizeAdsScore = () => {    
  //   setNormalizedAdScores(gameAds.map(ad => computeAdScore(ad)));
  //   // console.log("computed each ad score: ", normalizedAdScores);

  //   setNormalizedAdScores(normalizedAdScores / Math.max(...normalizedAdScores));
  //   // console.log("Normalized each ad score: ", normalizedAdScores);
  // }

  const solveMessageApi = async (adId) => {
    const { data } = await solveMessage(gameData.gameId, adId);

    if(data) {
      console.log("solved: ", data);
      setAdsToSolve(data);
      setIsModalVisible(true);
      updateStats(data);   
      getAdsForGameApi();
  
      if(data.lives === 1) {
        message.warning('Only 1 life remaining. Consider purchasing a healing potion from the shop!');
      }
  
      if(data.lives === 0) {
        message.warning('Game Over. New Game Will begin shortly ... ');
        startGameApi();
      }
  
      if(hasScoreReachedThousand && data.score >= 1000) {  
        message.success('Congrats! You reached 1K score! Keep it up!');
        setHasScoreReachedThousand(false);
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
        <Stats gameId={gameData.gameId} score={score} gold={gold} lives={lives} />          
        <Buttons gold={gold} setGold={setGold} setLives={setLives} gameId={gameData.gameId} startGameApi={startGameApi} />

        <div className="flex-row-container">
          <div className="flex-row-item-one game-name" style={{marginTop: '30px'}}> 
            <StyledParagraph style={{mixBlendMode: 'difference', top: '40px'}}>Take on Challenges Below</StyledParagraph>
          </div>
          
          {gameAds.map((ad, key) => {
            // console.log(key, ' normalized score ', normalizedAdScores[key])
            return (                             
                <div key={ad.adId} className="flex-row-item" style={{height: '300px'}}> 
                {console.log(ad, "key: ", key)}
                  {/* {console.log(ad, "Ad computed score:", computeAdScore(ad))} */}
                  {ad.reward >= 130 ? <Badge.Ribbon className="trap-ad" placement="start" text="ISSA TRAP!!!" color="black"> </Badge.Ribbon> : null }
                  {key > 7 ? <Badge.Ribbon placement="start" text="Perhaps Later!" color="red"> </Badge.Ribbon> : null }
                  {key < 3 ? <Badge.Ribbon placement="start" text="Recommended!" color="blue"> </Badge.Ribbon> : null }                    
                  {key < 5 && key >=3 ? <Badge.Ribbon placement="start" text="Go for it" color="gold"> </Badge.Ribbon> : null }                    
                  {/* {normalizedAdScores[key] > 0.95 ? <Badge.Ribbon placement="start" text="Careful! Can be a trap!" color="black"> </Badge.Ribbon> : null }                     */}
                    
                  <StyledHeader style={{marginTop: '2px'}}> {ad.adId} </StyledHeader>                              
                  <StyledAdInfo> {ad.message} </StyledAdInfo>
                      
                  <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Probability: <span style={{fontWeight: 'bolder'}}> {ad.probability} </span> </StyledAdInfo>
                      </div>

                      <div style={{margin: '0 150px' }}>
                        <StyledAdInfo>Reward: <span style={{fontWeight: 'bolder'}}> {ad.reward} </span> </StyledAdInfo>
                      </div>

                      <div style={{position: 'relative', top: '10px'}}>
                        <StyledActionButton style={{width: '200px', height: '30px', backgroundColor: `${goldIshColor}`}} onClick={() => solveMessageApi(ad.adId)}>Solve this add</StyledActionButton>
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
