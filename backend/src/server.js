'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package')
const Joi = require('joi');
const config = require('./config/config');

const Book = require('./model/book');

// Create a server with a host and port
const server = Hapi.server({
    host: config.host,
    port: config.port
});

// Attention proprete
module.exports = server;

// Swagger for Hapi
const swaggerOptions = {
    info: {
        title: 'Swagger onlineBookStore API Documentation',
        version: Pack.version,
    }
};
// http://localhost:8000/documentation

// Add the routes
server.route({
    method: 'POST',
    path: '/book',
    handler: (request, hapiToolkit) => {
        console.log('>>>>> ' + Object.keys(request.payload));
        const newBook = new Book({
            title: request.payload.title,
            subTitle: request.app.subTitle,
            author: request.app.author,
            description: request.app.description,
            parentTheme: request.app.parentTheme,
            theme: request.app.theme,
            productDetails: request.app.productDetails
        });

        console.log(`Book to add : ${newBook}`);
        
        Book.create(newBook)
        .then(addedBook => {
            console.log('>>> Saved', addedBook);
        }),
        console.error('error');
        return hapiToolkit.response('Added a new book !');
    }
});
/*
server.route({
    method: 'GET',
    path: '/books',
    handler: (request, hapiToolkit) => {
        let books;
        Book.find({}, (error, result) => {
            books = result;
        });
        return hapiToolkit.response('>>> Books:', books);
    }
});

// Optional parameter in path
server.route({
    method: 'GET',
    path: '/hello/{user?}',
    handler: (request, hapiToolkit) => {
        const user = request.params.user ?
        encodeURI(request.params.user) :
        'stranger';

        return `Hello ${user[0].toUpperCase() + user.slice(1)} !`
    }, 
    // Options to help generate documentation
    options: {
        description: 'Say Hello !',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting', 'user']
    }
});

// Mandatory parameter in path
server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, hapiToolkit) => {
        return `Hello, ${encodeURIComponent(request.params.name)} !`;
    },
    // Input validation
    options: {
        validate: {
            params: {
                // Joi = validation module of Hapi
                name: Joi.string().min(3).max(10)
            }
        }
    }
});

// Multi-segment parameters in path
server.route({
    method: 'GET',
    path: '/hello/{user*}', // user*2 : number can be omitted. BUT then you have to process the length of userParts for the returned value
    handler: (request, hapiToolkit) => {
        const userParts = request.params.user.split('/');
        return `Hello ${encodeURIComponent(userParts[0])}, hello ${encodeURIComponent(userParts[1])} !`
    }
});
*/

// Start the server
const start = async () => {
    try {
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
        await server.start();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }

    console.log(`Server running at: ${server.info.uri}`);
};

start();