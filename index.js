const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const SettingBill = require('./settings-bill')
const app = express()
const settingBill = SettingBill()

const moment = require('moment')
moment().format()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded          
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json                               
app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/', function (req, res) {

    const call = settingBill.getCallCost()
    const sms = settingBill.getSmsCost()
    const warning = settingBill.getWarningValue()
    const critical = settingBill.getCriticalValues()

    const callTotal = settingBill.getTotalCallCost()
    const smsTotal = settingBill.getTotalSmsCost()
    const grandTotal = settingBill.getTotalCost()
    const color = settingBill.totalClassName()
    res.render('index', {
        call,
        sms,
        critical,
        warning,

        callTotal,
        smsTotal,
        grandTotal,
        color

    })
    //console.log(settingBill.getCallCost())
})
app.post('/setting', function (req, res) {
    settingBill.setCallCost(
        req.body.callCost
    )

    settingBill.setSmsCost(
        req.body.smsCost
    )

    settingBill.setWarningValue(
        req.body.theWarninglevel
    )

    settingBill.setCriticalValue(
        req.body.theCriticallevel
    )

    res.redirect('/')
})

app.post('/action', function (req, res) {
    // // capture the bill type
    settingBill.callOrSms(req.body.actionType)


    res.redirect('/')
})

app.get('/actions', function (req, res) {
    const actionsList = settingBill.actions()
    for (var key of actionsList) {

        key.timestamp = moment(key.timestamp).fromNow()
    }

    res.render("actions", {
        actions: actionsList

    })

})
app.get('/actions/:type', function (req, res) {
    const actionType = req.params.type
    const actionsList = settingBill.actionsFor(actionType)
    for (var key = 0; key < actionsList.length; key++) {

        key.timestamp = moment(key.timestamp).fromNow()
    }


    // res.render("actions",{actions:settingBill.actionsFor(actionType) })
    res.render("actions", {
        actions: actionsList

    })
})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)
})
