import React from 'react';
import axios from 'axios';
import './App.css';
import { api } from './constants';
import { StyledButton, StyledSubPar } from './styles/styles';
import { startGame } from './services/gameService'

function App() {
  const [gameData, setGameData] = React.useState('');
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameMessages, setGameMessages] = React.useState([]);

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
        setGameMessages(response.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <p style={{marginTop: '100px', fontWeight: 'bolder', fontSize: '100px', fontFamily: 'Architects Daughter', color: 'orange'}}>
        Dragons of Mugolar
      </p> 
      
      <StyledSubPar>
        Press Play to Begin
      </StyledSubPar>
      
      <StyledButton onClick={startGameApi}> Play Game </StyledButton>

      {gameStarted &&
      <> 
        <p> Game {gameData.gameId} has started! 
          You have {gameData.lives} lives, and {gameData.gold} gold! 
          <br/>
          <button onClick={getMessagesForGame}> Get Game Messages </button>
          <br/>
          {gameMessages.map((message) => {
            return (            
              <span key={message.adId} style={{width: '100px', display: 'block', margin: 'auto', marginTop: '2px', border: '3px solid black'}}> {message.adId} </span>        
            )
          })}

        </p>
        <h3 style={{position: 'relative', top: '600px'}}> Your score is: {gameData.score}  </h3>
      </>
      }
    </div>
  );
}

export default App;
