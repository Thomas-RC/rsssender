const path = require('path');
const express = require('express');
const app = express();

const addRoutes = require('./routes/add');
const homeRoutes = require('./routes/home');
const errController = require('./app/controllers/error');

const hbs = require('express-handlebars');

app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views','views');


/**
 * Public path
 */
app.use(express.static(path.join(__dirname, 'public')));
//css and js path
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/js')));

//bodyparser from express
app.use(express.urlencoded({extended: true}));

//routes
app.use(addRoutes);
app.use(homeRoutes);
app.use(errController.getError);

app.listen(3000);
