const app = require('express')();


app.use('/admin', require('./admin.route'));
app.use('/procurement_manager', require('./procurement_manager.route'));
app.use('/inspection_manager', require('./inspection_manager.route'));
app.use('/public', require('./public.route'));


module.exports = app;