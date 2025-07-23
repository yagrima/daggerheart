const apps = foundry.applications;
export default class daggerheartPCSheet extends apps.api.HandlebarsApplicationMixin(apps.sheets.ActorSheetV2) {
    sheetContext = {};

    //https://foundryvtt.com/api/classes/foundry.applications.sheets.ActorSheetV2.html#default_options
    //https://foundryvtt.com/api/classes/foundry.applications.api.DocumentSheetV2.html#default_options
    //https://foundryvtt.wiki/en/development/api/applicationv2#parts
    static DEFAULT_OPTIONS = {
        actions: {
            _roll: daggerheartPCSheet._roll
        },
        classes: ["daggerheart", "sheet", "characterSheet"],
        form: { 
            submitOnChange: true,
            closeOnSubmit: false
        },
        position: {//die Größe ist variabel
                width: 860
        },
        tag: "form" //die Alternative wäre div ... also form ist richtig! -> löst _onSubmitForm und _onChangeForm aus
    }

    static PARTS = {
        limited: { template: "systems/daggerheart/templates/sheets/character/limited.hbs" },
        body: { template: "systems/daggerheart/templates/sheets/character/body.hbs" },
        footer: { template: "systems/daggerheart/templates/sheets/character/footer.hbs" }
    }

    get title() {
        /*hier folgt später etwas elaboriertes für Alexis, Slyborne Fairy/Fungril Syndicate Level 1 als Titel und optionalem Entfernen falls Bestandteile fehlen, also 0 sind
        let ancestry = "";
        let community = "";
        let subclass = "";
        let level = "";*/
        //if(this.actor.ancestry>0)
        return this.actor.name;
    }
            
    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        //was zeige ich bei limited
        if (this.document.limited) options.parts = ["limted","footer"]
        //was zeige ich in jedem anderen Fall
        else options.parts = ["body"];
    }
    
    /** @override */
    async _prepareContext(options) {
        //create basic model with data to input into HTML via Handlebars        
        const baseData = await super._prepareContext();
        let context = {
            //who are you, these are booleans
            owner: baseData.document.isOwner,
            isGM: baseData.user.isGM,
            //your permissions
            editable: baseData.editable,
            //your data, objects
            config: CONFIG.DAGGERHEART,
            actor: baseData.document,
            system: baseData.document.system,
            items: baseData.document.items,
            effects: baseData.document.effects
        };

        //Funktionen, die sonst auch in daggerheartActor.js sein könnten
        //context = this.calculateExperiance(context);
        
        this.sheetContext = context;
        return context;
    }
    
    /** @override */
    //finishing the initialisation = this method
    //Memo: Ich habe die Tabs umbenannt!
    _onRender(context, options) {
        const maintab = new apps.ux.Tabs({navSelector: ".maintab", contentSelector: ".content", initial: "maintab1"});
        maintab.bind(this.element);
        const sidetab = new apps.ux.Tabs({navSelector: ".sidetab", contentSelector: ".sidecontent", initial: "sidetab1"});
        sidetab.bind(this.element);
        // this.element.querySelector("input[name=something]").addEventListener("click", /* ... */); < irgenwie sowas?
    } 
    async _roll(event, target) {
        // @param {PointerEvent} event - The originating click event
        // @param {HTMLElement} target - the capturing HTML element which defined a [data-action]
        console.log(this); // logs the specific application class instance
        console.log("asdf");
    }
}