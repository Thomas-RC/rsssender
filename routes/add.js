const express = require('express');
const router = express.Router();
const addController = require('../app/controllers/add');

router.get('/add', addController.getAdd);
router.post('/ajax_email', addController.postAddEmail);
router.post('/ajax_feed', addController.postAddFeed);
router.post('/ajax_preview_feed', addController.postPreviewFeed);
router.post('/ajax_parse_feed', addController.postParseFeedToJson);
router.post('/ajax_save_msg', addController.postSaveMsgToDb);
router.post('/ajax_get_message', addController.postGetMessageToSend);
router.post('/ajax_send_message', addController.postSendMessage);

module.exports = router;