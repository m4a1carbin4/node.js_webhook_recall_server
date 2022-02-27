var express = require('express'),
    app = express(), // Express server 
    bodyparser = require('simple-bodyparser'), //express simple body parser.
    { XMLParser, XMLBuilder, XMLValidator} = require("./node_modules/fast-xml-parser/src/fxp"), //XML libraries.
    parser = new XMLParser(); // XML parser
    PORT = 8000; // setting port.

app.use(bodyparser());

// setting GET method router.
app.get("/hook", (req,res) => {

    // setting responseText.
    const responseText = req.query['hub.challenge'];

    // send response and status code.
    res.send(responseText);
    res.status(200).end();

    //console log record
    console.log('get 200 succes');

})

// setting post method router.
app.post("/hook", function(req,res) {

    // setting responseText.
    const responseText = req.query['hub.challenge'];

    // GET POST request body data.
    var data = req.body;

    // send response and status code.
    res.send(responseText);
    res.status(200).end();

    // check body data (XML : atom feed)
    console.log(data);

    //console log record
    console.log('post 200 succes');

    // parsing xml data.
    let jobj = parser.parse(data);

    // getting youtube video title, video ID, channel ID from parsing data.
    var entry = jobj.feed.entry;
    var videotitle = entry.title;
    var videoid = entry['yt:videoId']
    var channelid = entry['yt:channelId']

    // print video title, video ID, channel ID
    console.log(videotitle)
    console.log(videoid)
    console.log(channelid)

})

// server running on port
app.listen(PORT, () => console.log("server now running on %d",PORT));