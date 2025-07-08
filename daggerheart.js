import { DAGGERHEART } from "./modules/config.js";

Hooks.once("init", async () => {

    console.log("DAGGERHEART | Initalizing Daggerheart Core System");

    // Setting up the Global Configuration Object
    CONFIG.DAGGERHEART = DAGGERHEART;
    CONFIG.INIT = true;

    // Register custom Sheets and unregister the start Sheets
    // Items.unregisterSheet("core", ItemSheet);
    // Actors.unregisterSheet("core", ActorSheet);

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
        // "systems/daggerheart/templates/partials/template.hbs",
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