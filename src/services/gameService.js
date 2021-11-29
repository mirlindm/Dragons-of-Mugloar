import { baseApi } from './baseService';

export const startGame = () => {
    return baseApi.post('game/start');
}

export const getMessagesForGame = (gameId) => {
    return baseApi.get(`${gameId}/messages`);
}

export const solveMessage = (gameId, adId) => {
    return baseApi.post(`${gameId}/solve/${adId}`);
} 

export const getItemsInShop = (gameId) => {
    return baseApi.get(`${gameId}/shop`);
} 

export const purchaseItem = (gameId, itemId) => {
    return baseApi.post(`${gameId}/shop/buy/${itemId}`);
}


