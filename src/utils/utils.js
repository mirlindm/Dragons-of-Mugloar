export const sortGameMessagesByReward = (ad1, ad2) => {
    return computeAdScore(ad1) > computeAdScore(ad2) ? -1 : 1;
}

const adProbabilities = {
    'Sure thing': 0.95,
    'Walk in the park' : 0.9,
    'Piece of cake' : 0.8,
    'Quite likely' : 0.7,
    'Hmmm...': 0.5,
    'Rather detrimental' : 0.3,
    'Suicide mission' : 0.2,
    'Impossible': 0.1,
}

export const getProbability = (probability) => {
    return adProbabilities[probability] !== undefined ? adProbabilities[probability] : 0.5;
}

export const computeAdScore = (ad) => {
    return getProbability(ad.difficulty) * (1 + Math.sqrt(ad.reward)) / ad.expiresIn;
}