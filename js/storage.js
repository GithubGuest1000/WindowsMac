class FileSystem {
    constructor(filesys, drvlet) {
        if (filesys == "WebNTFS") {
            this.mkdir = function(dirname) {
                this.cache[dirname] = "DD::"
            }
            this.exists = function(filepath) {
                this.updatecache();
                var fres = false;
                Object.keys(this.cache).forEach((a) => {
                    if (a == filepath) {
                        fres = true
                    }
                });
                return fres
            }
            this.set = function(filename, data) {
                if (typeof data == "object") {
                    data = JSON.stringify(data)
                }
                this.cache[filename] = "FF::" + data;
                this.update()
            }
            this.get = function(filepath) {
                this.updatecache();
                var filedata = this.cache[filepath].slice(4)
                try {
                    filedata = JSON.parse(filedata)
                } catch (err) {
                    filedata = this.cache[filepath].slice(4)
                }
                return filedata;
            }
            this.listall = function() {
                this.updatecache();
                return this.cache
            }
            this.list = function(folder) {
                this.updatecache();
                return this.cache
            }

            this.del = function(f) {
                delete this.cache[f];
                this.update()
            }
            this.cache = {}
            this.update = function() {
                localStorage["Drive[" + drvlet + "]"] = JSON.stringify(this.cache)
            }
            this.updatecache = function() {
                this.cache = JSON.parse(localStorage["Drive[" + drvlet + "]"])
            }
            this.files = function() {
                return JSON.parse(localStorage["Drive[" + drvlet + "]"]);
            }

            // Startup
            if (typeof localStorage["Drive[" + drvlet + "]"] === "undefined") {
                localStorage["Drive[" + drvlet + "]"] = JSON.stringify({})
            }
            this.updatecache()

        } else {
            console.log('Boot Error: ', 'Imcompatible File System')

        }

    }
}
class Drive {
    constructor(drivename, filesystem, avsize, ussize, driveletter) {
        this.name = drivename
        this.filesystem = filesystem
        this.avalaible_size = avsize
        this.used_size = ussize
        this.filesys = new FileSystem(filesystem, driveletter)
    }
}
export var $store = {
    mount: null,
    drives: null
}
$store.mount = function(drivename, driveletter) {
    this.drives[driveletter] = new Drive(drivename, "WebNTFS", "10kb", "10kb", driveletter)
    return this.drives
}
$store.drives = {}
if (typeof localStorage['automount'] !== "undefined") {
    JSON.parse(localStorage['automount']).forEach((a) => {
        $store.mount(a.drivename, a.driveletter)
    })

}