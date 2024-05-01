const express = require('express');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [{
        title: 'Yoshi finds eggs',
        snippet: 'Lorem ipsum dolor sit amet consectetur'
    }, {
        title: 'Mario finds stars',
        snippet: 'Lorem ipsum dolor sit amet consectetur'
    }, {
        title: 'How to defeat bowser',
        snippet: 'Lorem ipsum dolor sit amet consectetur'
    }];
    res.render('index', {title: 'Home', blogs });
    });

app.get('/about', (req, res) => {
    res.render('about', {title: 'about' });
});

app.get('/about/create', (req, res) => {
    res.render('create', {title: 'create' });
});

app.use((req, res) => {
    res.redirect('404', {title: '404' });
});