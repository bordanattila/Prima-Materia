export const searchMagicCards = (query) => {
    return fetch(`https://api.magicthegathering.io/v1/cards?q=$color=blue`)
}