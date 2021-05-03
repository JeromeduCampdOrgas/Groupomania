//Imports
let models = require("../models");
let jwtUtils = require("../utils/jwt.utils");

// Routes
module.exports = {
  likePost: function (req, res) {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
  
    // Params
    let messageId = parseInt(req.params.messageId);
    if (messageId <= 0) {
      return res.status(400).json({ error: "invalid parameters" });
    }
    //trouver le message sélectionné
    models.Message.findOne({
      where: { id: messageId },
    })
      .then((messageFound) => {
        
        //si le message est trouvé on cherche le user
        if (messageFound) {
        
          models.User.findOne({
            where: { id: userId },
          })
            //si le user est trouvé on cherche dans le user dans la table des likes
            .then((userFound) => {
              if (userFound) {
                models.Like.findOne({
                  where: {
                    userId: userFound.id,
                    messageId: messageFound.id,
                  },
                  
                })
                  .then((userAlreadyLike) => {
                    //si on ne trouve pas le user dans la table des likes pour l'id du message
                    if (!userAlreadyLike) {
                      //on rajoute l'id du user
                      messageFound
                      //console.log(messageFound)
                        .addUser(userFound)
                        //et on incrémente de 1 le compteur des likes
                        .then(() => {
                          messageFound
                            .update(
                              { likes: messageFound.likes + 1 },
                              { where: { id: messageFound.id } }
                            )
                            .then(() =>
                              res
                                .status(200)
                                .json({ message: "vote enregistré" })
                            )
                            .catch((err) => res.status(500).json({ err }));
                        })
                        .catch((err) => res.status(500).json(err));
                    } else {
                      //si on le trouve dans la table des like
                      res.status(409).json({ error: "Message déjà liké" });
                    }
                  })
                  .catch((err) => {
                    res.status(500).json({ error: "c'est quoi cette erreur" });
                  });
              } else {
                res.status(404).json({ error: "utilisateur non trouvé" });
              }
            })
            .catch((err) => {
              (err) => res.status(500).json({ error: "raté" });
            });
        } else {
          res.status(404).json({ error: "Le message n'existe pas" });
        }
      })
      .catch((err) => res.status(500).json({ error: "raté final" }));
  },
  dislikePost: function (req, res) {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);

    // Params
    let messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
      return res.status(400).json({ error: "invalid parameters" });
    }
    
    models.Message.findOne({
      where: { id: messageId },
    })
      .then((messageFound) => {
        if (messageFound) {    
          models.User.findOne({
            where: { id: userId },
          })
            .then((userFound) => {
              if (userFound) {
                models.Like.findOne({
                  where: {
                    userId: userFound.id,
                    messageId: messageFound.id,
                  },
                })
                  .then((userAlreadyLike) => {
                    if (userAlreadyLike) {
                      messageFound
                        .removeUser(userFound)
                        .then(() => {
                          messageFound
                            .update(
                              { likes: messageFound.likes - 1 },
                              { where: { id: messageFound.id } }
                            )
                            .then(() => res.status(200).json({ message: "vote enregistré" }))
                            .catch((err) => res.status(500).json({ err }));
                        })
                        .catch((err) => res.status(500).json(err));
                    } else {
                      res.status(409).json({ error: "Message déjà disliké" });
                    }
                  })
                  .catch((err) => {
                    res.status(500).json({ error: err });
                  });
              } else {
                res.status(404).json({ error: "utilisateur non trouvé" });
              }
            })
            .catch((err) => res.status(500).json({ error: "oups" }));
        } else {
          res.status(404).json({ error: "Le message n'existe pas" });
        }
      })
      .catch((err) => res.status(500).json({ err: "erreur finale" }));
  }
  
 
};
