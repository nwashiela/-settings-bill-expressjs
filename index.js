const express = require('express')             
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const SettingBill = require('./settings-bill') 
const app = express()                   
const settingBill = SettingBill()        

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

    const callTotal =settingBill.getTotalCallCost()
    const smsTotal = settingBill.getTotalSmsCost()
    const grandTotal = settingBill.getTotalCost()

    res.render('index', {       
        call,
        sms,
        critical,
        warning,

        callTotal,
        smsTotal,
        grandTotal
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
    settingBill.callOrSms (req.body.actionType)
    
    console.log(req.body.actionType)
    res.redirect('/')
})

app.get('/actions', function (req, res) {
    res.render("actions",{
        actions:settingBill.actions()
    
    })

})
app.get('/actions/:type', function (req, res) {
    const actionType = req.params.actionType
    res.render("actions",{actions:settingBill.actionsFor(actionType) })

})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)
})
