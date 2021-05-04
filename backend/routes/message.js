const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//Messages routes
router.post('/messages/new/',auth,multer, messageCtrl.createMessage);
router.get('/messages/',auth, messageCtrl.listMessages);
router.get('/messages/:messageId',messageCtrl.getOnePost);
router.delete('/messages/:messageId',auth,messageCtrl.deleteOnePost);
router.put('/messages/:messageId',auth,multer,messageCtrl.updateOnePost);

module.exports = router;