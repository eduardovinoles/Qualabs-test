const getFiles = require('../utils/files');

//from the provided module type we create a list of modules with the corresponding users
const getModules = async (moduleToGet) => {

    const directoryPath = __dirname + '/../../resources';
    let listOfUsers = await getFiles(directoryPath);
    let result = [];

    listOfUsers.forEach((user) => {
        // tries to get the module in case it already exists
        let module = result.find((m) => m.module == user.provider[moduleToGet]);
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
//get the users group that consumes all the modules 
const getAverageGroup = async () => {

    let average = []
    let checked = []
    let modulesGroupA = await getModules("content_module");
    let modulesGroupB = await getModules("auth_module");
    //sort the modules groups to start the list from the module with fewer users
    modulesGroupA.sort((a, b) => a.users.length - b.users.length);
    modulesGroupB.sort((a, b) => a.users.length - b.users.length);
   //loop from modules group A with fewer users to group B with fewer users 
   //to find the "average" users group that consumes all the modules 
    modulesGroupA.forEach((groupA) => { 
        groupA.users.forEach((user) => { 
            modulesGroupB.forEach((groupB) => {
                if (groupB.users.includes(user)) {
                    //if the current modules are not stored in checked list we push the user and modules to average list 
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
