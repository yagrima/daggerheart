const handlebars = foundry.applications.handlebars;

export async function _getDefaultOptions(){
    //bitte Template des Pop-up-Fensters hier eingeben
    const template = "";
    const html = await handlebars.renderTemplate(template,{});

    //hier muss ein Promise verarbeitet werden
    return new Promise(resolve => {
        const data = {}; //hier fehlt Inhalt
        new Dialog(data,null).render(true);
    });
}