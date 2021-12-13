const {Meme} = require ('../MODELS/meme');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const FILE_TYPE_MAP = { //specifying the types of files/mimetypes accepted to the backend
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid =  FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if(isValid){
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName } - ${Date.now()}.${extension}` )
    }
  })
  const uploadOptions = multer({ storage: storage })

  //create
  router.post(`/`,uploadOptions.single('image'), async (req, res, ) =>{
    const file = req.file;
    if(!file){ return res.status(400).send('No image in the request')}
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;//so that we can get the full URL of img including the http part when we receive image
    const meme = new Meme({
        caption: req.body.caption, 
        image: `${basePath}${fileName}`,//"http://localhost:5000/public/uploads"
        descriptor: req.body.descriptor
    })
    meme.save().then((createdMeme=>{//save the newly created Meme and then return the created Meme to see it in the front end and in case of error we will catch the error and create an error object 
        res.status(201).json(createdMeme)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success:false
        })
    })
})
//read 
  router.get(`/`, async (req, res, ) =>{//getv list of memes or filter memes by descriptor word (excited, confused, angry, scared, etc.) with query string
    let filter = {};
    if(req.query.descriptorWord){
         filter = {descriptor: req.query.descriptorWord.split(',')}
    }
    const memeList = await Meme.find(filter).populate('descriptor');
    if(!memeList){
        res.status(500).json({success:false})
    }
    res.send(memeList);
})

//delete by id
router.delete(`/:id`, (req,res)=>{
    Meme.findByIdAndRemove(req.params.id).then(meme => {
        if(meme){
            return res.status(200).json({success: true, message: 'The meme was successfully deleted!'})
        } else{
            return res.status(404).json({success: false, message:'The specified meme was not found' })
        }
    }).catch(err=> {
        return res.status(400).json({success: false, error: err})
    })
})

  

module.exports = router;