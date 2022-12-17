export const searchMagicCards = (name, type, subtype, supertype, setName, colors) => {

return fetch(`https://api.magicthegathering.io/v1/cards?pageSize=20;contains=imageUrl;random=true;name=${name};types=${type};supertypes=${supertype};subtypes=${subtype};setName=${setName};colors=${colors}`)

}

export const mysteryCardSearch = () => {
    return fetch(`https://api.magicthegathering.io/v1/cards?pageSize=1;contains=imageUrl;random=true`)
}

