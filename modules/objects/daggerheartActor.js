export default class daggerheartActor extends Actor {
    prepareData() {
        //if superceding the original method is needed
        super.prepareData();
    }

    prepareDerivedData() {
        const actorData = this.system;
        //if you need to handle different types of Actor
        this._preparePlayerCharacterData(actorData);
    }
   _preparePlayerCharacterData(actorData) {
        //calculate base values
        this._setCharacterValues(actorData);
    }
    async _setCharacterValues(data) {
        //math goes brrr! 
    }

    setNote(note) {
        //if we are going to work with notes
        this.update({ "system.note": note});
    }

    addLogEntry(entry) {
        //character event log, it's verbose, but for now... 
        let log = this.system.log;
        log.push(entry);
        this.update({ "system.log": log});
    }

}