//Imports
let models = require('../models');

const jwtUtils = require('../utils/jwt.utils');

const fs = require('fs');
const Message = require('../models/message');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  createMessage: function(req, res) {
    // Getting auth header
    let headerAuth  = req.headers['authorization'];
    let userId      = jwtUtils.getUserId(headerAuth);

    // Params
        models.User.findOne({
        where:{id: userId}
    })
    .then(user =>{  
        let title   = req.body.title;
        let content = req.body.content;
        let attachmentURL;
        if(req.body.title == null || req.body.content == null){
          return res.status(400).json({ 'error': 'il faut au mois un titre et du contenu)' });
        }else{
        if (req.file ) {
          attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//req.files => renvoit un tableau
          models.Message.create({ 
            userId: userId,
            title:title,
            content:content,
            attachment: attachmentURL,
            likes:0
          })
          .then((newMessage) => {
            res.status(201).json({ message: "Message successfully created", newMessage })
          })
          .catch((err) => res.status(500).json(err))
        }else {
          models.Message.create({ 
            userId: userId,
            title:title,
            content:content,
            likes:0
          })
          .then((newMessage) => {
            res.status(201).json({ message: "Message successfully created", newMessage })
          })
          .catch((err) => res.status(500).json(err))}
        };
    })
    .catch(err => res.status(500).json({ err : err})); 
  },
  listMessages: function(req, res) {
    let fields  = req.query.fields;
    let limit   = parseInt(req.query.limit);
    let offset  = parseInt(req.query.offset);
    let order   = req.query.order;
    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [(order != null) ? order.split(':') : ['id', 'DESC']],
      /*attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,*/
      include: [{
        model: models.User,
        attributes: [ 'username' , 'id']
      }]
    }).then(function(messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ "error": "no messages found" });
      }
    }).catch(function(err) {
      res.status(500).json({ "error": "invalid fields" });
    });
  },
  getOnePost: function(req, res) {
    // Getting auth header
    let headerAuth  = req.headers['authorization'];
    let userId      = jwtUtils.getUserId(headerAuth);

    // Params
    let messageId = parseInt(req.params.messageId);

    models.Message.findOne({ 
      where: { id: messageId }
    })
    .then(function(message) {
        if (message) {
          res.status(201).json(message);
        } else {
          res.status(404).json({ 'error': 'message not found' });
        }
    })
    .catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch message' });
    });
  },
  deleteOnePost: function (req,res){
    // Getting auth header
    let headerAuth  = req.headers['authorization'];
    let userId      = jwtUtils.getUserId(headerAuth);
    const messageId = parseInt(req.params.messageId);

    models.Message.findOne({
      where: { id : messageId}
    })
      .then(message => {
        if(message.likes){
          models.Like.destroy({
            where: {messageId: messageId}
          })
        }
        
        if(message.attachment){
          const filename = message.attachment.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            models.Message.destroy({
              where: { id : messageId}
            })
              .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
              .catch(error => res.status(400).json({ error :'Impossible de supprimer le message' }));
          });
        }else{
          models.Message.destroy({
            where: { id : messageId}
          })
            .then(res.status(200).json({ message : 'Post succesfully deleted'}))
            .catch(res.status(500).json({ error : 'Impossible to delete post'}))
        }
      })

  },
  updateOnePost: function(req, res) {
    // Getting auth header
    let headerAuth  = req.headers['authorization'];
    let userId      = jwtUtils.getUserId(headerAuth);

    // Params
    const messageId = parseInt(req.params.messageId);
    
    let title = req.body.title;
    let content = req.body.content;
if(req.file){
    const attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    models.Message.update(
      { userId : userId,
        title : title,
      content : content,
      attachment : attachmentURL},
      {where: { id : messageId}
    })

    .then(() =>res.status(201).json({ message : 'objet modifié'}))
    .catch(err => res.status(500).json({ err : 'impossible de modifier l\'objet'}))
    } else{
      models.Message.update(
        { userId : userId,
          title : title,
        content : content},
        {where: { id : messageId}
      })
      .then(() =>res.status(201).json({ message : 'objet modifié'}))
    .catch(err => res.status(500).json({ err : 'impossible de modifier l\'objet'}))
    }
  }
}