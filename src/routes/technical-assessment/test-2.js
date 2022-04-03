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

    let content = [
        {name:'authz.provider_1',
        group:[]},
        {name:'authz.provider_2',
        group:[]},
        {name:'authz.provider_3',
        group:[]},
        {name:'authz.provider_4',
        group:[]},
        
    ]

    listOfUsers.forEach(user => {
        //console.log(user)
            let module = content.find((m) => m.name == user.provider.content_module);
            module.group.push(user.originFile)
        })
    
   
    return content
}

let groupA = getUsers()

let usersByAuthZ = getUsers()
usersByAuthZ.sort((a, b) => a.group.length - b.group.length);

console.log(usersByAuthZ)

// const res = Object.keys(groupA)
//                   .sort((a,b)=>groupA[b].length - groupA[a].length)
//                   .reduce((acc, key)=>((acc[key]=groupA[key]), acc),{});

//console.log(res)
// Returns 0, 1, or 2 counting how many modules the user has that hasnt been processed
// const getCoverageScore = (user, procesed) => {
//     let modules = user.modules.filter(x => !procesed.includes(x))
//     return modules.length
// }

// let users = getUsers()

// let response = []
// let processed = []
// let maxScore = 0

// do {
//     maxScore = 0
//     let bestUser

//     for(user of users) {
//         let userScore = getCoverageScore(user, processed) 
//         //console.log("userScore", userScore)
//         if(userScore > maxScore){ 
//             maxScore = userScore
//             bestUser = user
//             //if(maxScore >= 2) continue
//         }        
//     } 
//     //console.log("maxScore", maxScore)
//     //console.log("bestUser", bestUser)

//     if(bestUser){ // If we determin this user is a good test, we add those modules to processed
//         response.push(bestUser)
//         processed.push(...bestUser.modules)
//     }
    
// } while(maxScore > 0)

// if(processed.length > 2) 


//console.log(processed.sort())
//console.log(response)

// const fruits = [
//     { fruit: "banana", price: 100 },
//     { type: "apple", price: 200 },
//     { item: "grape", price: 150 },
//   ];
  
//   const rotten = ["banana", "orange"];
  
//   let rottenSet = new Set(rotten);
//   let result = users.filter(item =>
//       !Object.values(item).some(value => processed.has(value))
//   );