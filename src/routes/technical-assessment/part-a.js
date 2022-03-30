const { response } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const getFiles = require('../../utils/files')
router.get('/', async (req, res) => {


    try {
        //requiring path and fs modules
        //joining path of directory 
        const directoryPath = __dirname + '/../../../resources';

        let listOfUsers = await getFiles(directoryPath)

        let response = {
            'auth_module':
            {
                'authn.provider_1': ['./u1.json', './u2.json'],
                'authn.provider_2': ['./u3.json', './u4.json', './u5.json']
            },
            'content_module':
            {
                'authz.provider_1': ['./u1.json', './u3.json'],
                'authz.provider_2': ['./u2.json', './u4.json'],
                'authz.provider_3': ['./u5.json']
            }
        }

        listOfUsers.forEach((file) => {

            if (response.auth_module[file.provider.auth_module]){
                // Ya existe, lo agregamos
                }else{
                // No existe, lo creamos y agregamos
                }
                
            console.log(file)
        });

        res.send(listOfUsers)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
