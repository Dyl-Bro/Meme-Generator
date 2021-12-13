# Meme-Generator
Backend meme generating Rest API created using node, express, and mongodb database


 ## Get list of Memes  
 **Request...**
 
 ``` GET http://localhost:5000/api/v1/memes```
 ```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'localhost:5000/api/v1/memes',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
}); 
```
 **Response...**
 ```
 {
        "_id": "61b6b3a8b78f31a94e7d8831",
        "caption": "CAN I GET A HELL YES !?!",
        "image": "http://localhost:5000/public/uploads/angry-christian-priest-minister-pastor-preacher-giving-worship-sermon-fire-brimstone-god-morality-religion-hot-topic-man-also-29860787.jpg - 1639363496903.jpeg",
        "descriptor": "Excited",
        "__v": 0,
        "id": "61b6b3a8b78f31a94e7d8831"
    },
```

## Get list of Memes filtered by Descriptor Word
 The descriptor word will help to search for and/or filter memes based on the emotion they are expressing.
 
 **Request...**
 
 ```  GET http://localhost:5000/api/v1/memes?descriptorWord=Excited```
 ```
  var axios = require('axios');

var config = {
  method: 'get',
  url: 'localhost:5000/api/v1/memes?descriptorWord=Excited',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
 **Response...**
 ```
 {
        "_id": "61b6b3a8b78f31a94e7d8831",
        "caption": "CAN I GET A HELL YES !?!",
        "image": "http://localhost:5000/public/uploads/angry-christian-priest-minister-pastor-preacher-giving-worship-sermon-fire-brimstone-god-morality-religion-hot-topic-man-also-29860787.jpg - 1639363496903.jpeg",
        "descriptor": "Excited",
        "__v": 0,
        "id": "61b6b3a8b78f31a94e7d8831"
    },
    {
        "_id": "61b6b48fb78f31a94e7d8833",
        "caption": "When it's the weekend and you get to nap 3 times a day...",
        "image": "http://localhost:5000/public/uploads/portrait-excited-senior-woman-sitting-chair-lounge-retirement-home-portrait-excited-senior-woman-sitting-chair-134203160.jpg - 1639363727703.jpeg",
        "descriptor": "Excited",
        "__v": 0,
        "id": "61b6b48fb78f31a94e7d8833"
    }
```
 ## Create a new Meme 
 **Request...**
 
 ``` POST http://localhost:5000/api/v1/memes```
 ```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('caption', 'When it\'s the weekend and you dont get to nap 3 times a day...');
data.append('image', fs.createReadStream('/C:/Users/dylan/OneDrive/Desktop/Meme_Generator/backend/public/uploads/portrait-excited-senior-woman-sitting-chair-lounge-retirement-home-portrait-excited-senior-woman-sitting-chair-134203160.jpg'));
data.append('descriptor', 'Upset');

var config = {
  method: 'post',
  url: 'localhost:5000/api/v1/memes',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
 **Response...**
 ```
 {
    "caption": "When it's the weekend and you dont get to nap 3 times a day...",
    "image": "http://localhost:5000/public/uploads/portrait-excited-senior-woman-sitting-chair-lounge-retirement-home-portrait-excited-senior-woman-sitting-chair-134203160.jpg - 1639385841781.jpeg",
    "descriptor": "Upset",
    "_id": "61b70af199850d9645c8f5d0",
    "__v": 0,
    "id": "61b70af199850d9645c8f5d0"
}
```
 ## Delete a Meme 
 **Request...**
 
 ``` DELETE http://localhost:5000/api/v1/memes/61b6b8e90720778bc9f70c33```
 ```
 var axios = require('axios');

var config = {
  method: 'delete',
  url: 'localhost:5000/api/v1/memes/61b6b8e90720778bc9f70c33',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
 **Response...**
 ```
{
    "success": true,
    "message": "The meme was successfully deleted!"
}
```



 
 
 
 
