const { response } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const getFiles = require('../../utils/files');
const { toNamespacedPath } = require('path');

router.get('/', async (req, res) => {

    try {
        //requiring path and fs modules
        //joining path of directory 
        const directoryPath = __dirname + '/../../../resources';

        let listOfUsers = await getFiles(directoryPath)

        let response = {
            'auth_module':
            {

            },
            'content_module':
            {

            }
        }

        listOfUsers.forEach((file) => {

            if (!response.auth_module[file.provider.auth_module]) {
                response.auth_module[file.provider.auth_module] = []
            }

            response.auth_module[file.provider.auth_module].push(file.originFile)

            if (!response.content_module[file.provider.content_module]) {
                response.content_module[file.provider.content_module] = []
            }

            response.content_module[file.provider.content_module].push(file.originFile)

        });

        
        console.log(response.length)




        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
