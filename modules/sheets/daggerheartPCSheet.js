const apps = foundry.applications;
export default class daggerheartPCSheet extends apps.api.HandlebarsApplicationMixin(apps.sheets.ActorSheetV2) {
    sheetContext = {};

    //https://foundryvtt.com/api/classes/foundry.applications.sheets.ActorSheetV2.html#default_options
    //https://foundryvtt.com/api/classes/foundry.applications.api.DocumentSheetV2.html#default_options
    static DEFAULT_OPTIONS = {
        actions: {},
        classes: ["daggerheart", "sheet", "characterSheet"],
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        position: {
            width: 650
        },
        tag: "form", //"pcActorSheet" verifizieren, ob das wirklich etwas tut
        /*window:{
            controls:{
                icon:""
            }
        }*/
    }

    //https://foundryvtt.wiki/en/development/api/applicationv2#parts
    static PARTS = {
        header: { template: "systems/daggerheart/templates/sheets/character/header.hbs" },
        sidebar: { template: "systems/daggerheart/templates/sheets/character/body.hbs" },
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
        if (this.document.limited) options.parts = ["header","footer"]
        //was zeige ich in jedem anderen Fall
        else options.parts = ["header", "sidebar","footer"];
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
    }


    /*calculateExperiance(context) {
        let earndExp = context.system.experience.earndExp;
        let competence = context.system.experience.competence;
        let spentExp = 0;
        let level = 0;

        // Calculate Level
        level = ( Math.ceil( (earndExp / 1000) * CONFIG.NETHER.compLvlMultiplier[competence]) - 1);
        context.system.experience.spentExp = spentExp;
        context.system.experience.level = level;
        return context;
    }*/
}