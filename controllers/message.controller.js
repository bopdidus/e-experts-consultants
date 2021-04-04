const models  = require('../models')


//CONSTANT
const TITLE_LIMIT = 3;
const CONTENT_LIMIT = 15;

module.exports = {
    
    listMessage:function(req, res){
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order
       models.Message.findAll({
          order:[(order != null)? order.split(':'):['title', 'ASC']],
          limit:(!isNaN(limit))?limit:null,
          offset:(!isNaN(offset))? offset:null,
          attributes:(fields !== '*' && fields != null)? fields.split(',') : null
       }).then(data=>{
           res.send(data)
       }).catch(err=>{
           res.status(500).json({'error': 'invalid fields'})
       })
    }
}