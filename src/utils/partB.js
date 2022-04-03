const getFiles = require('./files');

const getModules = async (moduleToGet) => {
    console.log("getModules: START")
    const directoryPath = __dirname + '/../../resources';
    let listOfUsers = await getFiles(directoryPath);
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

const getAverageGroup = async () => {

    let average = []
    let checked = []
    let modulesGroupA =  await getModules("content_module");
    console.log(modulesGroupA);
    let modulesGroupB = await getModules("auth_module");
    console.log(modulesGroupB);
    modulesGroupA.sort((a, b) => a.users.length - b.users.length);
    modulesGroupB.sort((a, b) => a.users.length - b.users.length);
    console.log(modulesGroupA);


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
    return average
};
module.exports = getAverageGroup
