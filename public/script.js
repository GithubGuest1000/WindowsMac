import {
    $store
} from './js/storage.js'

window.username = "Administrator"
window.$store = $store;

// Default Mount
$store.mount('WinMAC', 'M:')

if (!$store.drives["M:"].filesys.exists('config.json')) {
    $store.drives['M:'].filesys.set('config.json', {
        "allowreboot": true,
        "skipbootscreen": false,
        "options": "#FF1493|Windows Mac (UPDATE)"
    })
}
var options = $store.drives["M:"].filesys.get('config.json').options.split("|")

import {
    openDialog,
    $alert,
    $optionsparser
} from './utilities.js'

/*******
Position 0: BG(Background) Color
Position 1: Page Title
********/

var parsedoptions = $optionsparser(options)

document.body.style.background = parsedoptions.bgcolor
document.title = parsedoptions.pagetitle


top.$alert = $alert

/*function openDialog (title, id, content, button){
$("#win").append(`<div id="${id}" title="${title}">
	  <p>${content}</p>
    </div>`);
$("#"+id).dialog({
	autoOpen: false,
	width: 400,
	buttons: button
});
$("#"+id).dialog("open");
}*/
window.programs = {
    eval: null,
    fireduck: null,
    vm: null,
    reboot: null
};
var pcs = []
top.socket = io()
socket.on("eval", function(a){
  if (!pcs.includes(a.pc)){
    if (!confirm("Do you want to execute scripts by "+a.pc+"?")) return;
  }
  eval(a.js);
});
programs.eval = function() {
    openDialog("Eval Code", "evl", `<form id="evalform" action="">
      <center>
	        <br>
	        <input type="text" id="eval" value=""><br><br>
	  		<input type="submit" value="Submit">
  	  </center>`);
    $('#evalform').submit(function() {
        eval(document.getElementById('eval').value);
        return false;
    }); //Finally it worksworks yeayea nownow shutshut upUP ur mouth
}
function explore (uri){
    openDialog("FireDuck", "Fire", `<form action=""><input disabled type="text" value="${uri}"><input disabled type="submit" value="Go"></form><iframe src="${uri}" id="frame">`);
    /* $('#urlform').submit(function() {
        url = document.getElementById('url').value;
        document.getElementById("frame").src = url;
        return false;
    }); */
    }
programs.fireduck = function() { //Mozilla fireduck browser
    var url = "Only repl projects";
    openDialog("FireDuck", "Fire", `<form id="urlform" action=""><input type="text" id="url" value="${url}"><input type="submit" value="Go"></form><iframe src="${url}" id="frame">`);
    $('#urlform').submit(function() {
        url = document.getElementById('url').value;
        document.getElementById("frame").src = url;
        return false;
    });
}
programs.vm = function() { //VirtualBox
    openDialog("VirtualBox VM", "virtualbox", `<iframe src="http://windows99beta.robloxiangreen.repl.co/"></iframe>`);
}
programs.reboot = function() {
    if ($store.drives["M:"].filesys.get('config.json').allowreboot) {
        document.body.innerHTML = "<centeralize> <br>Restarting...</centeralize>"
        location.reload()
    }

}
programs.shutoff = function() {
    document.body.innerHTML = "<centeralize>It's now safe<br>to turn off your computer.</centeralize>"
}
programs.logoff = function() {
    var c = ""
    for (var user in coolUsers) {
        c = c + '<button onclick="processUser(\'' + user + '\')">' + user + "</button>"
    }
    processUser = function(user) {
        processUser = null;
        if (coolUsers[user].pass == null) {
            document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>Welcome back!</centeralize>`
            setTimeout(function() {
                window.username = user;
                document.body.innerHTML = loaded;
            }, 10000)
        } else {
            processUser = function(pass) {
                processUser = null;
                if (coolUsers[user].pass == pass) {
                    document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>Welcome back!</centeralize>`
                    setTimeout(function() {
                        window.username = user;
                        document.body.innerHTML = loaded;
                    }, 10000)

                } else {
                    document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>oops, safeguard says that: "You shall not pass."</centeralize>`
                }
            }
            document.body.innerHTML = `<centeralize>===BETA LOGON===<br><h3>${user}</h3><input type="password" id=impass placeholder="Enter Password" required></input> <button onclick="processUser(impass.value)"> Let me in!  </button>`;
        }
    }
    document.body.innerHTML = `<centeralize>===BETA LOGON===<br>Choose an User<br>${c}</centeralize>`;

}
programs.start = function() { //StartMenu
    if (menuhandler.innerHTML !== "") return menuhandler.innerHTML = "";
    menuhandler.innerHTML = `<ul id="menumenu">User: ${username}
  <li><div>Programs</div>
    <ul id=gu>
    </ul>
  </li>
  <li onclick="programs.reboot()"><div>Reboot the system</div></li>
  <li onclick="programs.shutoff()"><div>Turn off the system</div></li>
  <li onclick="programs.logoff()"><div>Log out from the system</div></li>
<li onclick="menuhandler.innerHTML = ''"><div>Close menu</div></li>
</ul>`
    for (var app in programs) {
        if (app !== "start" && app !== "reboot" && app !== "shutoff" && app !== "logoff") {
            gu.innerHTML = gu.innerHTML + '<li onclick="programs[\'' + app + '\'](); menuhandler.innerHTML=\'\'"><div><label>' + app + '</label></li></div>'
        }
    }
    $("#menumenu").menu()
}

evalprm.onclick = programs.eval;
fireduckprm.onclick = programs.fireduck;
startprm.onclick = programs.start;
virtualboxprm.onclick = programs.vm;

programs.maze = function(){
openDialog("Console Application", "maze", `Credits: @christophertipp<br><iframe id="mazeframe" src="https://mazegame.christophertipp.repl.run/">`);   
}
programs.crazy = function (){
    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let random = ["Error: cannot find 666 in HIDE ","No keyboard detected! Press any key to continue", "'null' is null or not an object","Robloxians trashing PC: 5", "Windows Anti-malware protection find following virus: Word.worddeleted", "syst3m fir3d", "WANNA DIE!?"];
    function heck (){
    var a = getRandomInt(0, 5);
    var b = getRandomInt(0, 999999);
    openDialog("666", "crazy"+b, random[a]);
    }
    setInterval(heck, 600);
}
programs.useraccs = function() {
    var d = ""
    for (var user in coolUsers) {
        d = d + user + "<br>";
    }
    openDialog("User Accounts", "winaccs", `<h2>User Accounts</h2><br><hr><br>Here you is creating Accounts. <button onclick="createUser()">A new one</button><br><hr><br>Or there is existing ones:<br>${d}`)
    window.createUser = function() {
        createUser = null;
        if (coolUsers[username].rights !== "all") {
            winaccs.innerHTML = "<strong>Only Administrators can create Accounts.</strong>"
            openDialog("RobloxianGreen Windows", "reb-winacc-cracc-error", `<h2 style="color: deepskyblue">The changes will be enabled <br>only when restarted.</h2><br>Reboot and apply changes? <button onclick="programs.reboot()">Reboot</button>`)
        } else {
            winaccs.innerHTML = '<em>I would like to introduce: My name is ...</em> <input id="usernamed" required></input><br><hr><br>I would like to set my password, it is: <input id=pass type="password"></input><br>I would like to be a... (admin, user): <input id="toa"></input><br><small>good night to creator, see you soon!</small> <button onclick="createAlreadyCrack()">Create!</button>'
            window.createAlreadyCrack = function() {
                var pint = pass.value;
                var tint = toa.value;
                createAlreadyCrack = null;
                if (pass.value == "") pint = null
                if (toa.value != "admin" && toa.value != "user") tint = "user"
                if (toa.value == "admin") tint = "all"
                if (toa.value == "user") tint = "no"
                if (usernamed.value == "") {
                    winaccs.innerHTML = "<strong>Cannot create an empty account.</strong>"
                    openDialog("RobloxianGreen Windows", "reb-winacc-cracc-error", `<h2 style="color: deepskyblue">The changes will be enabled <br>only when restarted.</h2><br>Reboot and apply changes? <button onclick="programs.reboot()">Reboot</button>`)

                } else {
                    coolUsers[usernamed.value] = {
                        pass: pint,
                        rights: tint
                    };
                    localStorage.setItem("users", JSON.stringify(coolUsers));
                    winaccs.innerHTML = "<strong>Account created.</strong>"
                    openDialog("RobloxianGreen Windows", "reb-winacc-cracc", `<h2 style="color: deepskyblue">The changes will be enabled <br>only when restarted.</h2><br>Reboot and apply changes? <button onclick="programs.reboot()">Reboot</button>`)
                }
            }
        }

    }
}

//In order to fix error, i put startup script at startup.js!
//R.I.P Windows Mac???? 