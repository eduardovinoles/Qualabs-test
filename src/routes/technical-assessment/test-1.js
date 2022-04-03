
const path = require("path");
const fs = require("fs");

const getFiles = () => {
    const directoryPath = __dirname + "/../../../resources";
    files = fs.readdirSync(directoryPath);

    let listOfUsers = [];

    files.forEach((file) => {
        let rawdata = fs.readFileSync(path.join(directoryPath, file));
        let userProviders = JSON.parse(rawdata);
        userProviders.originFile = "./" + file;
        listOfUsers.push(userProviders);
    });

    return listOfUsers;
};

//new users list with filename and modules
const getUsers = () => {
    let listOfUsers = getFiles();
    let users = [];
    listOfUsers.forEach((file) => {
        users.push({
            file: file.originFile,
            modules: [file.provider.content_module, file.provider.auth_module],
        });
    });
    return users;
};

const getModules = (moduleToGet) => {
 
    let listOfUsers = getFiles();
    let result = [];
    listOfUsers.forEach((user) => {
        // tries to get the module in case it already exists
        let module = result.find((m) => m.module == user.provider[moduleToGet]);
        // console.log("user.provider", user.provider);
        if (!module) {
            // Module didn't exists yet, so we create one.
            module = {
                module: user.provider[moduleToGet],
                users: [],
            };
            result.push(module);
        }

        module.users.push(user.originFile);
    });

    return result;
};

let modulesGroupA = getModules("content_module");
let modulesGroupB = getModules("auth_module");

modulesGroupA.sort((a, b) => a.users.length - b.users.length);
modulesGroupB.sort((a, b) => a.users.length - b.users.length);

let average = []
let checked = []
const getCoverageScore = () => {

    modulesGroupA.forEach((groupA) => { // single module-user group
        groupA.users.forEach((user) => { //single user
            modulesGroupB.forEach((groupB) => {
                if (groupB.users.includes(user)) {
                    if (!checked.includes(groupA.module) && !checked.includes(groupB.module)) {
                        average.push({
                            user,
                            modules: [groupA.module, groupB.module]
                        })
                        checked.push(groupA.module)
                        checked.push(groupB.module)
                    }
                }
            })
        })
    })

};

getCoverageScore()
console.log(average);
