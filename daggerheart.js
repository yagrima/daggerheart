import { DAGGERHEART } from "./modules/config.js";
import daggerheartActor from "./modules/objects/daggerheartActor.js";
import daggerheartPCSheet from "./modules/sheets/daggerheartPCSheet.js";

Hooks.once("init", async () => {

    console.log("DAGGERHEART | Initalizing Daggerheart Core System");

    //setting up the Global Configuration Object
    CONFIG.DAGGERHEART = DAGGERHEART;
    CONFIG.INIT = true;
    CONFIG.Actor.documentClass = daggerheartActor;

    // Register custom Sheets and unregister the start Sheets
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "daggerheart", daggerheartPCSheet, { types: ["Player Character"], makeDefault: true, label: "DAGGERHEART.PCSheet"});
    // Items.unregisterSheet("core", ItemSheet);

    // Load all Partial-Handlebar Files
    preloadHandlebarsTemplates();

    // Register Additional Handelbar Helpers
    registerHandlebarsHelpers();  
});

Hooks.once("ready", async () => {

    // Finished Initalization Phase and release lock
    CONFIG.INIT = false;

    // Only execute when run as Gamemaster
    if(!game.user.isGM) return;  
    //every function written here is only available for GM use ... whyever this would be needed
});

function preloadHandlebarsTemplates() {

    const templatePaths = [
        "systems/daggerheart/templates/sheets/character/partials/origin.hbs",
        "systems/daggerheart/templates/sheets/character/partials/background.hbs",
        "systems/daggerheart/templates/sheets/character/partials/domain.hbs",
        "systems/daggerheart/templates/sheets/character/partials/items.hbs",
        "systems/daggerheart/templates/sheets/character/partials/progression.hbs",
        "systems/daggerheart/templates/sheets/character/partials/notes.hbs",
        "systems/daggerheart/templates/sheets/character/partials/header.hbs" 
    ];
    
    return loadTemplates(templatePaths);
};

function registerHandlebarsHelpers() {
    Handlebars.registerHelper("equals", function(v1, v2) { return (v1 === v2)});
    Handlebars.registerHelper("contains", function(element, search) { return (element.includes(search))});
    Handlebars.registerHelper("concat", function(s1, s2, s3 = "") { return s1 + s2 + s3;});
    Handlebars.registerHelper("isGreater", function(p1, p2) { return (p1 > p2)});
    Handlebars.registerHelper("isEqualORGreater", function(p1, p2) { return (p1 >= p2)});
    Handlebars.registerHelper("ifOR", function(conditional1, conditional2) { return (conditional1 || conditional2)});
    Handlebars.registerHelper("doLog", function(value) { console.log(value)});
    Handlebars.registerHelper("toBoolean", function(string) { return (string === "true")});
    Handlebars.registerHelper('for', function(from, to, incr, content) {
        let result = "";
        for(let i = from; i < to; i += incr)
            result += content.fn(i);
        return result;
    });
    Handlebars.registerHelper("times", function(n, content) { 
        let result = "";
        for(let i = 0; i < n; i++)
            result += content.fn(i);
        return result;
    });
    Handlebars.registerHelper("notEmpty", function(value) {
        if (value == 0 || value == "0") return true;
        if (value == null|| value  == "") return false;
        return true;
    });
}


/* -------------------------------------------- */
/*  General Functions                           */
/* -------------------------------------------- */