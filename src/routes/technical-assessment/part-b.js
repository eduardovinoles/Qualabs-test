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
            'auth_module': {},
            'content_module': {}
        }

        let x = []

        listOfUsers.forEach((file) => {

            x.push({
                "file": file.originFile,
                "modulos": [
                    file.provider.content_module,
                    file.provider.auth_module
                ]
            })
    });





    
// {
//     "name": "User 0",
//         "provider": {
//         "content_module": "authz.provider_4",
//             "auth_module": "authn.provider_3"
//     }
// }

// {
//     "name": "User 2",
//         "modulos": [
//             "authz.provider_1",
//             "authn.provider_2"
//         ]
// }
//         }





console.log(x)
res.send(x)
    } catch (error) {
    res.send(error)
}
})

module.exports = router;
