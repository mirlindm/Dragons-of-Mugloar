import React from 'react';
import axios from 'axios';
import './App.css';
import { api } from './constants';
import { StyledButton, StyledHeading } from './styles/styles';
import { startGame } from './services/gameService'
import { Welcome } from './pages/Welcome';
import { message, Modal } from 'antd';
import { Instructions } from './components/Instructions/Instructions';
import { Stats } from './components/Stats/Stats';
import { Shop } from './components/Shop/Shop';


const App = () => {
  const [gameData, setGameData] = React.useState('');
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameMessages, setGameMessages] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const startGameApi = async () => {
    const { data }  = await startGame();
    console.log(data);
    setGameData(data);
    setGameStarted(true);
  }

  const solveMessage = async (adId) => {
    const { data } = await solveMessage(gameData.gameId, adId)

    console.log(data);
  }

  const getMessagesForGame = () => {
    const url = `${gameData.gameId}/messages`;
    axios.get(api + url)
      .then(response => {console.log("Messages: ", response.data);    
        setGameMessages(response.data);
      })
      .catch(err => console.log(err))
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

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
          <h2 className="game-name">Game {gameData.gameId} has started!</h2>
        </div>

        <div>
            <StyledButton style={{width: '350px', margin: 'auto'}} onClick={() => {getMessagesForGame(); showModal()}}> Show me Ads </StyledButton>
            <Stats />
            <Shop style={{width: '150px', textAlign: 'center', margin: 'auto'}}> <i class="fas fa-shopping-cart"></i> </Shop>          

            <Modal title="Ads available 🔥" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
            {gameData.score < 500 ? <StyledHeading style={{fontSize: '20px', mixBlendMode: 'difference', margin: 'auto', textAlign: 'center', top: '0px'}}> Consider solving a more rewarding ad </StyledHeading> : <p> Consider a less rewarding ad </p> }
             {gameMessages.map((message) => {
              return (               
                  <div class="card card-1" onClick={solveMessage(message.adId)}>                    
                    <h2 class="card__title">Message Id: {message.adId}</h2>
                      {/* <div class="card__icon"><i class="fas fa-bolt"></i></div>
                      <p class="card__exit"><i class="fas fa-times"></i></p> */}
                    
                    <p class="card__apply">
                      Message: {message.message}
                      <br/>
                      Probability: {message.probability}
                      <br/>
                      Reward: <span style={{fontWeight: 'bolder'}}> {message.reward} {message.reward > 30 ? '👍'	: '👎'} </span>
                      <br/>
                      Expires in: {message.expires}

                      {/* <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a> */}
                    </p>
                  </div>                         
                ) 
            })}
            </Modal> 
        </div>

        <div className="container"> 
          <p  className="lives"> {gameData.lives} lives </p>
          <p  className="gold"> {gameData.gold} gold </p>
          <p  className="score">Your score: {gameData.score}</p>
        </div>

        
      </>
      }
    </div>
  );
}

export default App;
