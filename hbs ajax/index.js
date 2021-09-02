const express = require('express')
const path = require('path')

const routes = require('./route/routes')
const home = require('./route/user')
const api = require('./route/apiHome')

const app = express()
const bodyParser = require('body-parser')

const cors = require("cors"); 
app.use(cors({
    origin: '*'
  }));

const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


 
///adddddd
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


var rows = [{id: 1, first_name: "Amanda", last_name: "Nunes", email: "anunes@ufc.com", phone: "012345 678910"}]
app.use(routes);
app.use(home);
app.use('/api',api);
// app.get('/api',function(req,res){
//   res.status(200).json({msg:"success",rows})
// })




app.use((err, req, res, next) => {
    console.log(err);
    return res.send('Internal Server Error');
});

app.listen(5000, () => console.log('Server is runngin on port 5000'));