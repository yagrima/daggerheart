import * as Dialog from "./dialog.js"

export async function _defaultCheck(chardata){
    console.log("getting dice roll information"); 
    let checkOptions = await Dialog._getRollInformation(chardata);
    //Abbruch bei Schließen des Würfeldialogs
    if(checkOptions.cancelled) return;
    //hier die Experiences?

    //hier Hope Die
    console.log("Hope Die:"+checkOptions[0].hopedie);
    let hope = checkOptions[0].hopedie;

    //hier Fear Die
    console.log("Fear Die:"+checkOptions[0].feardie);
    let fear = checkOptions[0].feardie;
    
    //hier Advantage
    let advantage = "c";
    //hier Disadvantage
    let disadvantage = "d";
    return _dualityRoll(hope,fear,advantage,disadvantage);
}

export async function _dualityRoll(hope,fear,advantage,disadvantage){
    console.log(hope);
    console.log(fear);
    console.log(advantage);
    console.log(disadvantage);
}