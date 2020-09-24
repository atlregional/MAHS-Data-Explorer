const tractinfo = require('../models/tractinfo')

// Defining methods
module.exports = {
    findAll: (req, res) => {
      console.log(req.query);
      tractinfo.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
  
    
    create: (req, res) => {
      console.log(req.body)
      tractinfo.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
      const { _id } = req.body;
      
      tractinfo.findByIdAndUpdate(_id, req.body)
        .then(dbModel => 
          {console.log("Update Tract Info",req.body)
          res.json(dbModel)})
        .catch(err => res.status(422).json(err));
    },
}; 