const app = require('./app');

//server
app.listen(app.get('port'), () =>{
    console.log(`servidor corriendo en puerto ${app.get('port')}`);
})