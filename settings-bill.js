function SettingBills() {
    var smsTotal2 = 0;
    var callTotal2 = 0;
    var callCostSet = 0;
    var smsCostSet = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    
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
            makeCalls();
          }
          else if (type === "sms") {
            sendSms();
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
        // makeCalls,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        // sendSms,
        hasReachedCriticaLevel,
        totalClassName,
    }

}