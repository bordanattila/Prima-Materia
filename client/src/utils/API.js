export const searchMagicCards = (name, type, subtype, supertype, setname, colors) => {
    // the heroku url is to remedy the 'Access-Control-Allow-Origin' errrors from CORS. This was not an issue during the construction of this application, but became one around March 2023.
    return fetch(`https://api.magicthegathering.io/v1/cards?pageSize=20;contains=imageUrl;random=true;name=${name};types=${type};supertypes=${supertype};subtypes=${subtype};setName=${setname};colors=${colors}`, { mode: "cors" });

}

export const mysteryCardSearch = () => {
    return fetch(`https://api.magicthegathering.io/v1/cards?pageSize=1;contains=imageUrl;random=true`, { mode: "cors" })
}

