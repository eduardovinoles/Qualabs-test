const express = require('express');
const router = express.Router();
const getFiles = require('../../utils/files');

router.get('/', async (req, res) => {

    try {
        //requiring path and fs modules
        //joining path of directory 
        const directoryPath = __dirname + '/../../../resources';
        //get the list
        let listOfUsers = await getFiles(directoryPath)
        //create response model
        let response = {
            'auth_module': {},
            'content_module': {}
        }
        //loop files to store diferent modules with the corresponding users
        listOfUsers.forEach((file) => {
            //if current auth_model is not stored in "response" we create it
            if (!response.auth_module[file.provider.auth_module]) {
                response.auth_module[file.provider.auth_module] = []
            }
            //push current user to corresponding module 
            response.auth_module[file.provider.auth_module].push(file.originFile)
            //we do the same with content_module
            if (!response.content_module[file.provider.content_module]) {
                response.content_module[file.provider.content_module] = []
            }
            response.content_module[file.provider.content_module].push(file.originFile)
        });

        res.json(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
