export const searchMagicCards = (query) => {
    //check the data we are getting
    console.log(query);
    //make sure to factor in the semicolon before adding each new string -- because having a semi-colon hanging out at the end may cause fetch errors(?)
    const baseAPI = "https://api.magicthegathering.io/v1/cards?pageSize=20;contains=imageUrl"
    const cardName = query.cardName
    const cardType = query.cardType
    const subType = query.subType

    if(cardName) {
        let cardFetch = baseAPI + ";name=" + cardName;
    }
    if(cardType) {
        let cardFetch = baseAPI + ";types=" + cardType;
    }
    if(subType) {
        let cardFetch = baseAPI + ";subtypes=" + subType;
    }


    return cardFetch;
}


//https://api.magicthegathering.io/v1/cards?colors=b,r,w,g,;subtypes=cat;pageSize=20;contains=imageUrl

//color gets put in as "color" with w = white, b = black, u = blue, = g = green, and r = red
//multiple colors can be added, so a radio button would be best (colors=w,b,u,g,r)
//set up with conditions? if user enters 'colors' with a value, add to the fetch string, etc. so a conditional is needed for each query type.

//pagesize and contains=imageUrl will be fixed
//color might be difficult to return since it is in the single letter abrv. -- but color doesn't have to be returned -- or it can be rendered with conditionals (if(w){return "white"}..etc)

//subtypes is a really fun field, it should be included -- but it doesn't need to be in the graphQL? it is a means for searching, but what really needs to be saved? The image, the text, the name, the type.

//fetch(`https://api.magicthegathering.io/v1/cards?subtypes=cat;pageSize=20;contains=imageUrl`)

