module.exports = function settingBill() {
    let smsTotal2 = 0;
    let callTotal2 = 0;
    let callCostSet = 0;
    let smsCostSet = 0;
    let warningLevel = 0;
    let criticalLevel = 0;
    
    function setCallCost(callCost) {
        callTotal2 = callCost;
    }
    
    function getCallCost() {
        return callTotal2;
    }

    function setSmsCost(smsCost) {
        smsTotal2 = smsCost;
    }
    function getSmsCost() {
        return smsTotal2;
    }

    function setCriticalValue(theCriticallevel) {
        criticalLevel = theCriticallevel;
    }
    function getCriticalValues() {
        return criticalLevel;
    }

    function setWarningValue(theWarninglevel) {
        warningLevel = theWarninglevel;
    }
    function getWarningValue() {
        return warningLevel
    }

    function makeCalls() {
        if (!hasReachedCriticaLevel()) {
            callCostSet += callTotal2;
        }
    }
    function getTotalCost() {
        return callCostSet + smsCostSet;
    }
    function getTotalCallCost() {
        return callCostSet;
    }
    function getTotalSmsCost() {
        return smsCostSet;
    }

    function sendSms() {
        if (!hasReachedCriticaLevel()) {
            smsCostSet += smsTotal2;
        }
    }
    function hasReachedCriticaLevel() {
        return getTotalCost() >= getCriticalValues();
    }
    function totalClassName() {
        if (hasReachedCriticaLevel()) {
            return "danger";
        }
        else if (getTotalCost() >= getWarningValue()) {
            return "warning";
        }
    }

    function callOrSms(type) {
        if (type === "call") {
            return callCostSet += callTotal2;
          }
          else if (type === "sms") {
            return smsCostSet += smsTotal2;
          }
    }

    return {
        callOrSms,
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setCriticalValue,
        getCriticalValues,
        setWarningValue,
        getWarningValue,
        //makeCalls,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        //sendSms,
        hasReachedCriticaLevel,
        totalClassName
    }

}