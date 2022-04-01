/*
resultado = [u1, u2, u3]
processed = ['module_1', 'module_2', 'module_3', 'module_4', 'module_5']

[
      {
        file: 'u1',
        modulos: [ 'module_1', 'module_2' ]
      }, // Score 2
      {
        file: 'u2',
        modulos: [ 'module_3', 'module_4' ]
      }, // Score 2
      {
        file: 'u3',
        modulos: [ 'module_1', 'module_5' ]
      }, // Score 1
      {
        file: 'u4',
        modulos: [ 'module_1', 'module_3' ]
      } // Score 0
]
return resultado
*/

const path = require('path');
const fs = require('fs');



const getFiles = (directoryPath) => {
    files = fs.readdirSync(directoryPath);
    
    let listOfUsers = []
    
    files.forEach((file) => {

        let rawdata = fs.readFileSync(path.join(directoryPath,file));
        let userProviders = JSON.parse(rawdata);
        userProviders.originFile = "./" + file
        listOfUsers.push(userProviders)          
    });
  
    return listOfUsers
  
}

const getUsers = () => {
    const directoryPath = __dirname + '/../../../resources';
    let listOfUsers = getFiles(directoryPath)
    let users = []
    listOfUsers.forEach((file) => {
        users.push({
            "file": file.originFile,
            "modules": [
                file.provider.content_module,
                file.provider.auth_module
            ]
        })
    });
    return users
}


// Returns 0, 1, or 2 counting how many modules the user has that hasnt been processed
const getCoverageScore = (user, procesed) => {
    let modules = user.modules.filter(x => !procesed.includes(x))
    return modules.length
}

let users = getUsers()

let response = []
let processed = []

let maxScore = 0
do {
    maxScore = 0
    let bestUser

    for(user of users) {
        let userScore = getCoverageScore(user, processed) 
        console.log("userScore", userScore)
        if(userScore > maxScore){ 
            maxScore = userScore
            bestUser = user
            if(maxScore >= 2) continue
        }        
    } 
    console.log("maxScore", maxScore)
    console.log("bestUser", bestUser)
    if(bestUser){ // If we determin this user is a good test, we add those modules to processed
        response.push(bestUser)
        processed.push(...bestUser.modules)
    }
    
} while(maxScore > 0)


console.log(processed.sort())
console.log(response)

