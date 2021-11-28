import { sortGameMessagesByReward } from './utils';

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



