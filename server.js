const http = require('http'); // for using HTTP server and client

const app = require('./app')

const port = process.env.PORT || 3000; // port

const server = http.createServer(app); // The createServer() method of http creates a new HTTP server and returns it.
                                       // Whenever a new request is received, the request event is called, providing 
                                       // two objects: (an http.IncomingMessage object) and a response (an http.ServerResponse object).

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`); //The server is set to listen on the specified port and host name.
                                                                // When the server is ready, the callback function is called,
                                                                // in this case informing us that the server is running.
});