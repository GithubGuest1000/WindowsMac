var coolUsers = JSON.parse(localStorage.getItem("users")) || {
    "Administrator": {
        pass: null,
        rights: "all"
    }
}
var setd = JSON.parse(localStorage.getItem("set-options")) || ["--enable-logon"]

function openDialog(title, id, content, button) {
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
onload = function() {
    if ($store.drives["M:"].filesys.get('config.json').skipbootscreen) {
        return;
    } //PONTENTIAL BRUH MOMENT! THIS WILL DISABLE BOOTSCREEN, BUT WILL NOT ENABLE THE SYSTEM "HIDDEN LOGON" OR SAFE MODE
    setTimeout(function() {
        loaded = document.body.innerHTML
        onload = null;
        document.body.innerHTML = `<centeralize><img src="https://seeklogo.com/images/W/windows-10-icon-logo-5BC5C69712-seeklogo.com.png"><br><h3 style="font-family: Bloody, monospace;">Windows Mac
[BETA] </h3><br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=100 width=100></img></centeralize>`
        setTimeout(function() {
            startDucking()
        }, 9000) //its 9 sec Robloxian: ok oh and im changed font dont return it!
    }, 0);
}

function startDucking() {
    if (!setd.includes("--enable-logon")) {
        if (!setd.includes("--safe-mode")) {
            $store.mount('WinMACStartup', 'S:')
            if ($store.drives["S:"].filesys.exists('startup.js')) {
                try {
                    eval(String($store.drives["S:"].filesys.get("startup.js"))) //Convert to string.
                } catch {
                    document.body.innerHTML = loaded + '<br><small><div class="footer" style="float: right">Safe Mode</div></small>';
                    openDialog("Auto safe-mode", "sfm", "The Startup script was not working correctly. The system was automatically switched to safe mode.")
                }
            }
            document.body.innerHTML = loaded;
        } else {
            document.body.innerHTML = loaded + '<br><small><div class="footer" style="float: right">Safe Mode</div></small>';
            openDialog("Safe-mode", "sfm", "The Safe-mode toggled using the setting --safe-mode. The system was manually switched to safe mode.")
        }
        return;
    }
    if (!setd.includes("--safe-mode")) {
        $store.mount('WinMACStartup', 'S:')
        if ($store.drives["S:"].filesys.exists('startup.js')) {
            try {
                eval(String($store.drives["S:"].filesys.get("startup.js"))) //Convert to string.
            } catch {
                document.body.innerHTML = loaded + '<br><small><div class="footer" style="float: right">Safe Mode</div></small>';
                openDialog("Auto safe-mode", "sfm", "The Startup script was not working correctly. The system was automatically switched to safe mode.")
            }
        }
        document.body.innerHTML = loaded;
    } else {
        document.body.innerHTML = loaded + '<br><small><div class="footer" style="float: right">Safe Mode</div></small>';
        openDialog("Safe-mode", "sfm", "The Safe-mode toggled using the setting --safe-mode. The system was manually switched to safe mode.")
    }
    var c = ""
for (var user in coolUsers){
  c = c + '<button onclick="processUser(\''+user + '\')">'+user+"</button>"
}
processUser = function(user){
  processUser = null;
  if (coolUsers[user].pass == null){
   document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>Welcome back!</centeralize>`
   setTimeout(function(){
     window.username = user;
     document.body.innerHTML = loaded;
   }, 10000)
  }else{
   processUser = function(pass){
     processUser = null;
     if (coolUsers[user].pass == pass){
document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>Welcome back!</centeralize>`
   setTimeout(function(){
     window.username = user;
     document.body.innerHTML = loaded;
   }, 10000)

     }else{
       document.body.innerHTML = `<centeralize>===BETA LOGON===<br><img src="https://i.imgur.com/Hco0aDe.gif" heigth=50 width=50></img> <h3>${user}</h3><br>oops, safeguard says that: "You shall not pass."</centeralize>`
     }
   }
   document.body.innerHTML = `<centeralize>===BETA LOGON===<br><h3>${user}</h3><input type="password" id=impass placeholder="Enter Password" required></input> <button onclick="processUser(impass.value)"> Let me in! </button>`;
  }
}
    document.body.innerHTML = `<centeralize>===BETA LOGON===<br>Choose an User<br>${c}</centeralize>`;
}
