export const searchMagicCards = () => {
    return fetch(`https://api.magicthegathering.io/v1/cards?q=$color=blue`)
}