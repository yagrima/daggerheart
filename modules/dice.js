import * as Dialog from "./dialog.js"

export async function _defaultCheck(chardata){
    //console.log("chardata:"+JSON.stringify(chardata));
    console.log("getting dice roll information"); 
    let checkOptions = await Dialog._getRollInformation(chardata);

    //Abbruch bei Schließen des Würfeldialogs
    if(checkOptions.cancelled) return;
    //hier der Attributsbonus
    let attributebonus = checkOptions[0].attributebonus;

    //hier die Experiences?

    //hier Hope Die
    let hope = checkOptions[0].hopedie;

    //hier Fear Die
    let fear = checkOptions[0].feardie;
    
    //hier Advantage
    let advantage = checkOptions[0].advantage;

    //hier Disadvantage
    let disadvantage = checkOptions[0].disadvantage;

    
    return _dualityRoll(chardata,attributebonus,hope,fear,advantage,disadvantage);
}

export async function _dualityRoll(chardata,attributebonus,hope,fear,advantage,disadvantage){
    console.log(`${attributebonus}/${hope}/${fear}/${advantage}/${disadvantage}`);
    const template = "systems/daggerheart/templates/chat/standard-roll-dialog.hbs"; 

    let hopeResult = await _rollSimpleDie(hope); 
    let fearResult = await _rollSimpleDie(fear); 
    let advantageResult = await _rollAdvantageDie(advantage); 
    let disadvantageResult = await _rollAdvantageDie(disadvantage); 

    let isHope = hopeResult.total > fearResult.total;
    let isFear = hopeResult.total < fearResult.total;
    let isCrit = hopeResult.total === fearResult.total;
    //bei Gelegenheit Handling für fehlerhafte Eingaben für attributebonus ergänzen
    let total = hopeResult.total + fearResult.total + advantageResult - disadvantageResult + parseInt(attributebonus);
    console.log(total);
    let attributebonusText = parseInt(attributebonus) < 0 ? ""+parseInt(attributebonus) : "+"+parseInt(attributebonus);
    console.log(attributebonusText);

    let templateContext = {
        name: chardata.name,
        attributebonus: attributebonusText,
        hope: hopeResult.total,
        fear: fearResult.total,
        advantage: advantageResult,
        disadvantage: disadvantageResult,
        isHope: isHope,
        isFear: isFear,
        isCrit: isCrit,
        total: total
    }
    console.log(JSON.stringify(templateContext));
    let chatData = {
        user: game.user.id,
        speaker: "Dummy",
        sound: CONFIG.sounds.dice,
        content: await foundry.applications.handlebars.renderTemplate(template,templateContext)
    }
    ChatMessage.create(chatData);
}
export async function _rollAdvantageDie(dicecode){
    if(dicecode.includes("d") && dicecode.split("d")[1].length > 0)
        return (await _rollSimpleDie("d"+advantage.split("d")[1])).result;
    return 0;
}
export async function _rollSimpleDie(dicecode){
    let dicecodeResult = new Roll("1"+dicecode,{});
    return dicecodeResult.evaluate();
}