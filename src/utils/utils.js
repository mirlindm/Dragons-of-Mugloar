export const sortGameMessagesByReward = (ad1, ad2) => {
    return computeAdScore(ad1) > computeAdScore(ad2) ? -1 : 1;
}

const adProbabilities = {
    'Sure thing': 0.95,
    'Walk in the park' : 0.9,
    'Piece of cake' : 0.8,
    'Quite likely' : 0.7,
    'Rather detrimental' : 0.2,
    'Suicide mission' : 0.1,
}

const getProbability = (probability) => {
    return adProbabilities[probability] !== undefined ? adProbabilities[probability] : 0.5;
}

export const computeAdScore = (ad) => {
    const gameScore = 999;
    console.log(ad.probability, ' ', getProbability(ad.probability))
    return gameScore < 1000 ? getProbability(ad.difficulty) * (2 + Math.log(ad.reward)) : getProbability(ad.difficulty) * (1 + Math.sqrt(ad.reward)) / ad.expiresIn;
}