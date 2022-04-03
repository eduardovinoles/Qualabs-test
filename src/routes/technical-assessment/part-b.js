const express = require('express');
const router = express.Router();
const getAverageGroup = require('../../utils/partB');

router.get('/', async (req, res) => {

    try {

        let response =  await getAverageGroup()

        res.json(response)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})
module.exports = router;
