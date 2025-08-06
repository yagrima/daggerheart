import * as Dice from "./dice.js"
import * as Dialog from "./dialog.js"

export  async function _dualityRollPrep(chardata){
    console.log("This is the dice roll preparation."); 
    console.log(chardata.experiences1);
    //which attribute starts the roll
 
    Dice._defaultCheck(chardata);
}