export function openDialog(title, id, content, button) {
    $("#win").append(`<div id="${id}" title="${title}">
	  <p>${content}</p>
    </div>`);
    $("#" + id).dialog({
        autoOpen: false,
        width: 400,
        buttons: button
    });
    $("#" + id).dialog("open");
}
export function $alert(text) {
    var id = Math.random().toString(32).substring(2)
    $("#win").append(`<div id="${id}" title="Alert">
	  <p>${text}</p>
    </div>`);
    $("#" + id).dialog({
        autoOpen: false,
        width: 400
    });
    $("#" + id).dialog("open");
}
export function $optionsparser(unparsed) {
    var parsed = {}
    parsed.bgcolor = unparsed[0]
    parsed.pagetitle = unparsed[1]

    return parsed;
}