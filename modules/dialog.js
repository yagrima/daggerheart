const api = foundry.applications.api;
const fields = foundry.applications.fields;
const handlebars = foundry.applications.handlebars;

export async function _getRollInformation(chardata){
    let editedReponse;
    let event = {};
    let dialog = {};
    let button = {};
    const template = "systems/daggerheart/templates/dialog/standard-roll-dialog.hbs"
    const content = await handlebars.renderTemplate(template,chardata)
    const response = api.DialogV2.prompt({
        content,
        ok: {
            callback: (event, button, dialog)  => [{
                "attributebonus": button.form.elements.attributebonus.value,
                "hopedie": button.form.elements.hopedie.value,
                "feardie": button.form.elements.feardie.value,
                "advantage": button.form.elements.advantage.value,
                "disadvantage": button.form.elements.disadvantage.value
            }],
            label: game.i18n.localize("DAGGERHEART.dialog.std"),
            "icon": "fa-solid fa-dice-d12"
        },
        window: {
                title: game.i18n.localize("DAGGERHEART.dialog.title")
        }
    }) 
    return response;
} 
 