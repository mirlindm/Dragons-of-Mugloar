import { api } from '../constants';
import axios from 'axios';

export const startGame = () => {
    const url = 'game/start';
    return axios.post(api + url);
}

export const getMessagesForGame = () => {
    const url = ':gameId/messages';
    axios.get(api + url);
}

export const solveMessage = (gameId, adId) => {
    const url = `${gameId}/solve/${adId}`;
    axios.post(api + url);
}  

export const itemsInShop = (gameId) => {
    const url = `${gameId}/shop`;
    axios.get(api + url);
} 

export const purchaseItem = (gameId, itemId) => {
    const url = `${gameId}/shop/buy/${itemId}`;
    axios.get(api + url);
} 