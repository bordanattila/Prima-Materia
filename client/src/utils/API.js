export const searchMagicCards = () => {
    return fetch(`https://api.magicthegathering.io/v1/cards?subtypes=merfolk;pageSize=20;contains=imageUrl`)
}


//https://api.magicthegathering.io/v1/cards?colors=b,r,w,g,;subtypes=cat;pageSize=20;contains=imageUrl

//color gets put in as "color" with w = white, b = black, u = blue, = g = green, and r = red
//multiple colors can be added, so a radio button would be best (colors=w,b,u,g,r)
//set up with conditions? if user enters 'colors' with a value, add to the fetch string, etc. so a conditional is needed for each query type.

//pagesize and contains=imageUrl will be fixed
//color might be difficult to return since it is in the single letter abrv. -- but color doesn't have to be returned -- or it can be rendered with conditionals (if(w){return "white"}..etc)

//subtypes is a really fun field, it should be included -- but it doesn't need to be in the graphQL? it is a means for searching, but what really needs to be saved? The image, the text, the name, the type.


