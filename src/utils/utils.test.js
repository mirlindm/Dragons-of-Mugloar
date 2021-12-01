import { sortGameMessagesByReward, getProbability } from './utils';

const gameMessages = [
    {
        reward: 4,
        probability: 'Likely',
        message: 'Help test this function',
        id: 'first'
    },
    {
        reward: 6,
        probability: 'Very likely',
        message: 'Help test this module',
        id: 'second'
    },
    {
        reward: 10,
        probability: 'Sure thing!',
        message: 'Help test this project',
        id: 'third'
    }
]

test('Should sort incoming game messages by the reward property', () => { 
    expect(gameMessages.sort(sortGameMessagesByReward)).toEqual([
        {
            reward: 10,
            probability: 'Sure thing!',
            message: 'Help test this project',
            id: 'third'
        },
        {
            reward: 6,
            probability: 'Very likely',
            message: 'Help test this module',
            id: 'second'
        },
        {
            reward: 4,
            probability: 'Likely',
            message: 'Help test this function',
            id: 'first'
        }
    ]);
});

test('Last element after sorting should have the lowest reward', () => { 
    expect(gameMessages.sort(sortGameMessagesByReward).pop()).toEqual(
        {
            reward: 4,
            probability: 'Likely',
            message: 'Help test this function',
            id: 'first'
        } 
    );
});

test('First element after sorting should have the highest reward', () => { 
    expect(gameMessages.sort(sortGameMessagesByReward).shift()).toEqual(
        {
            reward: 10,
            probability: 'Sure thing!',
            message: 'Help test this project',
            id: 'third'
        }
    );
});



const adProbabilities = {
    'Sure thing': 0.95,
    'Walk in the park' : 0.9,
    'Piece of cake' : 0.8,
    'Quite likely' : 0.7,
    'Rather detrimental' : 0.2,
    'Suicide mission' : 0.1,
    'Unknown': undefined
}

test('Ads with undefined probability get assigned a default one', () => {    
    expect(getProbability(adProbabilities)).toEqual(0.5);
});



