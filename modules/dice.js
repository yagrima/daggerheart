import * as Dialog from "./dialog.js"

export async function _defaultCheck(){
    console.log("This is the dice roll.");
    //react to dialogue cancelling
    let checkOptions = await Dialog._getDefaultOptions();
    if(checkOptions.cancelled) return;
    //hier die Experiences?
    //hier Hope Die
    let hope = "a";
    //hier Fear Die
    let fear = "b";
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