const express = require('express');
const bodyparser = require('body-parser');
const transport = require('./transportConfig');

var app = express();

app.use(bodyparser.json());
var urlencodedParser = bodyparser.urlencoded({
    extend: true
});

app.get('/', (req, res)=>{
    res.send('hello');
  });


app.post('/message', urlencodedParser, (req, res) => {

const output = `
        Contact Details
Name: ${req.body.name}
Email: ${req.body.email}
Subject: ${req.body.subject}

Message
${req.body.message}
`
    console.log(req.body);
    var message = {
        from: req.body.email,
        to: 'abdullai.tahiru@gmail.com',
        subject: req.body.subject,
        text:output
    };
    transport.sendMail(message, function(error, info){
        if(error){
          return false;
        }else{
          console.log('Message sent: ' + info.response);
          return true;
        };
      });
    

});


app.listen(3000);