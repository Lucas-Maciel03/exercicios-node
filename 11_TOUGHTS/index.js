const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//Models
const Tought = require('./models/Tought')
const User = require('./models/User')

//import routes
const toughtsRoutes = require('./routes/toughtsRoutes')

//import controller apenas p acessar rota /
const ToughtController = require('./controllers/ToughtController') 

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber respostas do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session middleware
app.use(
    session({
        name: 'session', //session nome padrao
        secret: 'nosso_secret', //para tornar a sessão inquebravel
        resave: false, //se cair a sessão vai desconectar
        saveUninitialized: false, //
        store: new FileStore({
            logFn: function(){}, //função de log, é necessaria para configurar seção por arquivos
            path: require('path').join(require('os').tmpdir(), 'sessions'), //é o caminho para a pasta sessions           
        }),
        cookie: {
            secure: false,
            maxAge: 360000, //tempo de duração 360000 = 1 dia. Deixa de ser valido em 1 dia
            expires: new Date(Date.now() + 360000), //vai expirar em 1 dia 
            httpOnly: true //como é localhost nao da p config em https, 
                           //em server de produção é necessario configurar para https
        }
    })
)

//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

//set sessions to res 
app.use((req, res, next) => {
  
    if(req.session.userid){ //verifica se o user tem essa seção
        res.locals.session = req.session //pega a seção da req e manda pra res
    }
    
    next()
})

//Routes
app.use('/toughts', toughtsRoutes)

app.get('/', ToughtController.showToughts)

conn.sync()
.then(() => {
    app.listen(3000, () => console.log('Listen in port 3000'))
})
.catch((err) => console.log(err))
