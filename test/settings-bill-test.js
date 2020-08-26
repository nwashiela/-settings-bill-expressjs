const assert = require('assert');

// const SettingsBill = require('../settings-bill');
const settingsBill = require('../settings-bill');

describe("SettingsBill widget",function(){
    describe("set Values",function(){

    it("should be able to set and get callCost", function(){
        let billWithSettingsONE = settingsBill();
        billWithSettingsONE.setCallCost(2.50);

        billWithSettingsONE.getCallCost("call");
        assert.equal(billWithSettingsONE.getCallCost(), 2.50);

    });
    it("should be able to set and get smsCost", function(){
    let billWithSettingsTwo = settingsBill();
    billWithSettingsTwo.setSmsCost(3.20);

    billWithSettingsTwo.getSmsCost("sms");
    assert.equal(billWithSettingsTwo.getSmsCost(), 3.20);
    })

    it("should be able to set and get smsCost and callcost", function(){
        let billWithSettingsTwo = settingsBill();
        billWithSettingsTwo.setSmsCost(2.20);
        billWithSettingsTwo.setCallCost(3.00);
    
        billWithSettingsTwo.getSmsCost("sms");
        assert.equal(billWithSettingsTwo.getSmsCost(), 2.20);
        assert.equal(billWithSettingsTwo.getCallCost(), 3.00);
        })

    it("should be able to set Warning Level", function(){
        let billWithSettingsONE = settingsBill();
        billWithSettingsONE.setWarningValue(20);

        assert.equal(billWithSettingsONE.getWarningValue(), 20)

    })

    it("should be able to set criical Level", function(){
        let billWithSettingsONE = settingsBill();
        billWithSettingsONE.setCriticalValue(30);
        
        assert.equal(billWithSettingsONE.getCriticalValues(), 30)

    })

    it("should be able to set warning and criical Level", function(){
        let billWithSettingsONE = settingsBill();
        billWithSettingsONE.setWarningValue(23);
        billWithSettingsONE.setCriticalValue(40);
        
        assert.equal(billWithSettingsONE.getWarningValue(), 23);
        assert.equal(billWithSettingsONE.getCriticalValues(), 40);


    })
    describe("use Values",function(){

    it("should be able to calculate calls", function(){
        let billWithSettingsONE = settingsBill();
        
        billWithSettingsONE.setCriticalValue(30);
        billWithSettingsONE.setCallCost(2.50);
        billWithSettingsONE.setSmsCost(1.50);

        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");

        assert.equal(billWithSettingsONE.getTotalCallCost(), 10.00);
        assert.equal(billWithSettingsONE.getTotalSmsCost(), 0.00);
        assert.equal(billWithSettingsONE.getTotalCost(), 10.00);

    })

    it("should be able to calculate sms", function(){
        let billWithSettingsONE = settingsBill();
        
        billWithSettingsONE.setCriticalValue(30);
        billWithSettingsONE.setCallCost(2.50);
        billWithSettingsONE.setSmsCost(1.50);

        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("sms");

        assert.equal(billWithSettingsONE.getTotalCallCost(), 0.00);
        assert.equal(billWithSettingsONE.getTotalSmsCost(), 6.00);
        assert.equal(billWithSettingsONE.getTotalCost(), 6.00);

    })

    it("should be able to calculate toatal of sms and callss", function(){
        let billWithSettingsONE = settingsBill();
        
        billWithSettingsONE.setCriticalValue(30);
        billWithSettingsONE.setCallCost(2.50);
        billWithSettingsONE.setSmsCost(1.50);

        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");

        assert.equal(billWithSettingsONE.getTotalCallCost(), 5.00);
        assert.equal(billWithSettingsONE.getTotalSmsCost(), 3.00);
        assert.equal(billWithSettingsONE.getTotalCost(), 8.00);

    })
})
describe("use Colours",function(){

    it("should return the class name warning if warning level is reached", function(){
        let billWithSettingsONE = settingsBill();
        
        billWithSettingsONE.setCriticalValue(30);
        billWithSettingsONE.setWarningValue(10);
        billWithSettingsONE.setCallCost(2.50);
        billWithSettingsONE.setSmsCost(1.50);

        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("sms");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");
        billWithSettingsONE.callOrSms("call");

        assert.equal(billWithSettingsONE.getTotalCallCost(), 10.00);
        assert.equal(billWithSettingsONE.getTotalSmsCost(), 3.00);
        assert.equal(billWithSettingsONE.getTotalCost(), 13.00);
        assert.equal(billWithSettingsONE.totalClassName(), "warning");


    })

    it("should return the class name danger if critical level is reached", function(){
        let billWithSettingsONE = settingsBill();
        
        billWithSettingsONE.setCriticalValue(20);
        billWithSettingsONE.setWarningValue(10);
        billWithSettingsONE.setCallCost(2.50);
        billWithSettingsONE.setSmsCost(1.50);

        billWithSettingsONE.callOrSms('sms');              // 1.5
        billWithSettingsONE.callOrSms('sms');              // 3.0
        billWithSettingsONE.callOrSms('call');            // 5.5
        billWithSettingsONE.callOrSms('call');            // 8.0
        billWithSettingsONE.callOrSms('call');            //10.5 
        billWithSettingsONE.callOrSms('call');            //13.00
        billWithSettingsONE.callOrSms('call');            //15.50
        billWithSettingsONE.callOrSms('call');            //18
        billWithSettingsONE.callOrSms('call');            //20.50
        billWithSettingsONE.callOrSms('call');            // this one is ignored...



        assert.equal(billWithSettingsONE.getTotalCallCost(), 17.50);
        assert.equal(billWithSettingsONE.getTotalSmsCost(), 3.00);
        assert.equal(billWithSettingsONE.getTotalCost(), 20.50);
        assert.equal(billWithSettingsONE.totalClassName(), "danger");


    })

})

})
})