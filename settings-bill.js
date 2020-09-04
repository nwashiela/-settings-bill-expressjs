module.exports = function settingBill() {
    let smsTotal2;
    let callTotal2;
    let callCostSet = 0;
    let smsCostSet = 0;
    let warningLevel;
    let criticalLevel;

    let actionsList = []
    function setCallCost(callCost) {
        callTotal2 = Number(callCost);
    }

    function getCallCost() {
        return callTotal2;
    }

    function setSmsCost(smsCost) {
        smsTotal2 = Number(smsCost);
    }
    function getSmsCost() {
        return smsTotal2;
    }

    function setCriticalValue(theCriticallevel) {
        criticalLevel = Number(theCriticallevel);
    }
    function getCriticalValues() {
        return criticalLevel;
    }

    function setWarningValue(theWarninglevel) {
        warningLevel = Number(theWarninglevel);
    }
    function getWarningValue() {
        return warningLevel
    }

    // function makeCalls() {
    //     if (!hasReachedCriticaLevel()) {
    //         callCostSet += callTotal2;
    //     }
    // }
    function getTotalCost() {
        return callCostSet + smsCostSet;
    }
    function getTotalCallCost() {
        return callCostSet;
    }
    function getTotalSmsCost() {
        return smsCostSet;
    }

    // function sendSms() {
    //     if (!hasReachedCriticaLevel()) {
    //         smsCostSet += smsTotal2;
    //     }
    // }
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
        var cost = 0;
        if (type === "call") {
            callCostSet += callTotal2;
            cost = callTotal2
        }
        else if (type === "sms") {
            smsCostSet += smsTotal2;
            cost = smsTotal2;
        }
        actionsList.push({
            type,
            cost,
            timestamp: new Date()


        });
    }


    function actions() {

        return actionsList
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionsList.length; index++) {
            const action = actionsList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
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
        actions,
        actionsFor

    }

}