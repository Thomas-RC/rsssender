const rssParser = require('../services/rssparser');
const fetch = require('node-fetch');
const msg = require('../models/Messagerss');
const sender = require('../services/maisender').send();

exports.getAdd = (req, res, next) => {
    res.render('add', {title: 'RSS Sender App - Send message', add: 'active'});
}
exports.postAddEmail = (req, res, next) => {
    //TODO email Validation
    res.json({
        name_email: req.body.email
    });
}
exports.postAddFeed = (req, res, next) => {
    //TODO Feed Validation
    res.json({
        name_feed: req.body.feed
    });
}
exports.postPreviewFeed = async (req, res, next) => {
    //TODO Feed Validation
    const resp = await fetch(req.body.feed);
    const body = await resp.text();

    res.send(body);
}
exports.postParseFeedToJson = async (req, res, next) => {
    //TODO Feed Validation
    const jsonData = await rssParser.get(req.body.feed);

    const message = new msg(jsonData);
    const msgView = await message.prepare();

    res.render('message', {msgs: msgView, layout: false});
}
exports.postSaveMsgToDb = async (req, res, next) => {

    const ids = new msg(req.body.ids);
    const saved = await ids.save();
    res.send(saved)
}
exports.postGetMessageToSend = async (req, res, next) => {

    const id = new msg(req.body.id);
    const message = await id.fetch();

    const ms = message.json;
    res.send(ms.toString());
}
exports.postSendMessage = async (req, res, next) => {

    const email = req.body.email;
    const message = req.body.message;

    try {
        await sender.sendMail({
            to: email,
            from: 'xxx',
            subject: 'RSS sendmail WSB',
            html: message
        });
    }
    catch (e)
    {
        return console.log('Send message  Error!', e.message)
    }


    return res.send(200);
}