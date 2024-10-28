const http = require('http')

const app = require('./src/config/express.config')

const server = http.createServer(app);
const port = 9005
server.listen(port, '127.0.0.1', (err)=>{
    if(!err) {
        console.log(`Server is running on port ${port}`);
        console.log("Press CTRL + C to terminate the server");
    }
})
