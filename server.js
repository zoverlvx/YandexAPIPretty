const express = require("express");
const app = express();

app.use(express.static("www"));

const server = app.listen(8000, function () {
    
    const host = server.address().address
    const port = server.address().port
    
    console.log("Yandex Translation Project listening at http://%s:%s", host, port);
});
