const app= require('./app');
const port = 8000 ;


// dotenv for enviroment
const dotenv = require('dotenv');
dotenv.config({path:'Backend/config/.env'});



app.listen(port,(err)=>{
    if(err){
        return console.log(`Server is up and running on port ${port}`);
    }
    console.log(`Server is up and running on port ${port}`);
});