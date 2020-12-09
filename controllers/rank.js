const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ed1e6507635945c4a544fbde75250d67'
   });

const handleApiCall = (req,res )=>{
       app.models.initModel({id:Clarifai.FACE_DETECT_MODEL})
       .then(generalModel => {
         return generalModel.predict(req.body.input);
       })
       .then(data => {
          res.json(data)
       })
       .catch(err => res.json(err))
}


const handleRank = (req,res,db)=>{
    const {id} = req.body
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries =>{
    res.json(entries[0])
})
.catch(err =>{
    res.status(400).json('unable count the entries')
})
}
module.exports = {
    handleRank : handleRank,
    handleApiCall:handleApiCall
}