const path = require('path');
const fs = require('fs');

const getFiles = async (directoryPath) => {

        //passsing directoryPath and callback function
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

module.exports = getFiles;
