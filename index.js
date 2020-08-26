const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingBill = require('./settings-bill');

const app = express()
const settingBill = SettingBill()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/', function (req, res) {
    res.render('index', { setting: settingBill.getSettings()});
})
app.post('/setting', function (req, res) {

    settingBill.setCallCost({
        callCost: req.body.callCost
    })

    settingBill.setSmsCost({
        smsCost: req.body.smsCost
    })

    settingBill.setWarningValue({
        theWarninglevel: req.body.theWarninglevel
    })

    settingBill.setCriticalValue({
        theCriticallevel: req.body.theCriticallevel
    })

    console.log(settingBill.getSettings());
    //console.log(settingBill.getSmsCost());
    //console.log(settingBill.getWarningValue());
    //console.log(settingBill.getCriticalValues());
    res.redirect('/')
})
app.post('/action', function (req, res) {

})
app.get('/actions', function (req, res) {

})
app.get('/actions/:type', function (req, res) {

})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)
})