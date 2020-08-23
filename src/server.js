const proffys = [{
    name: "Diego Fenandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "89987654534", 
    bio:"Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost:"20",
    weekday:[0],
    time_from:[720],
    time_to: [1220]
},
{
    name: "Felipe Damascena",
    avatar: "https://avatars3.githubusercontent.com/u/65692255?s=460&u=aafa7cc741b5d6c5a698b2e106e5e49b456589ba&v=4",
    whatsapp: "9999999999", 
    bio:"paixonado por desenvolver ferramentas para mudar a vida das pessoas através da tecnologia.",
    subject: "Informática",
    cost:"20",
    weekday:[4],
    time_from:[860],
    time_to: [1240]
}]

const subjects = [
"Artes",
"Biologia",
"Ciências",
"Educação física",
"Física",
"Geografia",
"História",
"Matemática",
"Português",
"Química",
]

const weekdays = [
"Domingo",
"Segunda-feira",
"Terça-feira",
"Quarta-feira",
"Quinta-feira",
"Sexta-feira",
"Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
}
function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}
function pageGiveClasses(req, res){
    const dados = req.query

    const isNotEmpty = Object.keys(dados).length > 0 
    
    if(isNotEmpty){
    dados.subject = getSubject(dados.subject)
    proffys.push(dados)

    return res.redirect("/study")
}
    return res.render("give-classes.html", {subjects, weekdays})
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)
