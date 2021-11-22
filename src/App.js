import React from 'react';
import axios from 'axios';
import './App.css';
import { api } from './constants';
import { StyledButton } from './styles/styles';
import { startGame } from './services/gameService'
import { Welcome } from './pages/Welcome';
import { Modal } from 'antd';

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

        <StyledButton onClick={startGameApi}> Play Game </StyledButton>
        <p style={{textDecoration: 'underline', color: '#fff'}}> Find Instructions </p>
      </>
      }

      {gameStarted &&
      <>
        <div className="container">
          <h2 className="game-name">Game {gameData.gameId} has started!</h2>
        </div>

        <div>
            <StyledButton style={{margin: 'auto'}} onClick={() => {getMessagesForGame(); showModal()}}> Show me Ads </StyledButton>
            
            {/* {gameMessages.map((message) => {
              return (            
                <span key={message.adId} style={{width: '10px', display: 'inline-block', margin: 'auto', marginTop: '2px', border: '3px solid black'}}> {message.adId} </span>        
              )
            })}    */}

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
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
