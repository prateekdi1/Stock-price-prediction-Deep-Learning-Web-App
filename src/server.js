let express = require("express");
let app = express();

app.use(function(req, res, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next(); // pass the control to the next handler.
});

app.use(express.static("../static"));

app.listen(81, function(){
    console.log("serving static on 81");
})