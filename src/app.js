const { findTriggers } = require('./helpers')
const minimatch = require("minimatch");

const errMsg = "bad Sumo Logic webhook payload configuration";

function alertWebhook(req, res) {
    if (!req.body.hasOwnProperty("kaholo")){
        throw errMsg;
    }
    const mData = req.body.kaholo;

    const alertName = mData.name; // Get alert name
    const alertType = mData.type; // Get alert type
    const queryName = mData.queryName; // Get the query name that triggered the alert
    const description = mData.description; // Get alert description
    if (!alertName || !alertType || !queryName || !description){
        throw errMsg;
    }

    findTriggers(
        validateTrigger, { alertName, alertType, queryName },
        req, res, 
        "alertWebhook",
        `${alertName}: ${description}`, // event description for kaholo
    );
}

async function validateTrigger(trigger, { alertName, alertType, queryName }) {
    const triggerAlertName = (trigger.params.find((o) => o.name === "alertName").value || "").trim();
    const triggerAlertType = trigger.params.find((o) => o.name === "alertType").value || "any";
    const triggerQueryName = (trigger.params.find((o) => o.name === "queryName").value || "").trim();
    // if alert name was provided check it matches alert name in post request
    if (triggerAlertName && !minimatch(alertName, triggerAlertName)) {
      throw "Not same alert name";
    }
    // if alert name was provided check it matches alert name in post request
    if (triggerAlertType !== "any" && alertType !== triggerAlertType) {
      throw "Not same alert type";
    }
    // if query name was provided check it matches query name in post request
    if (triggerQueryName && !minimatch(queryName, triggerQueryName)) {
        throw "Not same query name";
    }
    return true;
}

module.exports = { alertWebhook }
