export const sortGameMessagesByReward = (a, b) => {
    return a.reward > b.reward ? -1 : 1;
}