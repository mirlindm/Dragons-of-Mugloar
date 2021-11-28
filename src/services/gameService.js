import { baseApi } from './baseService';

export const startGame = () => {
    const endpoint = 'game/start'; // no need for defining const and then using it, use directly,
                                    // replace elsewhere in the file too
    return baseApi.post(endpoint);
}

export const getMessagesForGame = (gameId) => {
    const endpoint = `${gameId}/messages`;
    return baseApi.get(endpoint);
}

export const solveMessage = (gameId, adId) => {
    const endpoint = `${gameId}/solve/${adId}`;
    return baseApi.post(endpoint);
} 

export const getItemsInShop = (gameId) => {
    const url = `${gameId}/shop`;
    return baseApi.get(url);
} 

export const purchaseItem = (gameId, itemId) => {
    const url = `${gameId}/shop/buy/${itemId}`;
    return baseApi.post(url);
}


