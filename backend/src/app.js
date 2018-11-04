'use strict';

const server = require('./server');
const mongoose = require('mongoose');
const config = require('./config/config');

const url = config.mongoUrl;
const dbName = config.dbName;

const Book = require('./model/book')

// Connect to database
const connect = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true }, (error, client) => {});
        console.log(`Connection established to database: ${mongoose.connection.name}`);
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
};

Promise.resolve(connect).then(() => {
    let database = mongoose.connection;
    server.route({
        method: 'POST',
        path: '/bookApp',
        handler: (request, hapiToolkit) => {
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
    
    server.route({
        method: 'GET',
        path: '/books',
        handler: (request, hapiToolkit) => {
            let books;
            Books.find({}).then((error, docs) => {
                console.log('>>>', docs)
            }),
            console.error('error:', error);
            return hapiToolkit.response('>>> Books:', books);
        }
    });
    
});

/*

let database;

const server = app.listen(config.port, () => {});

const connect = mongoose.connect(url, { useNewUrlParser: true }, (error, client) => {});

Promise.all([server, connect]).then(results => {
    console.log(`>>> Express server running on ${config.port} <<<`);
    console.log(`>>> Connection to mongoDB server successful <<<`);
    database = mongoose.connection;

    app.post('/book', (request, responses, next) => {
        const newBook = new newBook({
            
        });
    });
}).catch(error => {
    console.error(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/