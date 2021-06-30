const minimatch = require("minimatch");

const errMsg = "bad Sumo Logic webhook payload configuration";

function alertWebhook(req, res, settings, triggerControllers) {  
    try {
        if (!req.body.hasOwnProperty("kaholo")){
            return res.status(400).send(errMsg);
        }
        const mData = req.body.kaholo;
    
        const reqName = mData.name; // Get alert name
        const reqType = mData.type; // Get alert type
        const reqQueryName = mData.queryName; // Get the query name that triggered the alert
        const description = mData.description; // Get alert description
        if (!reqName || !reqType || !reqQueryName || !description){
            return res.status(400).send(errMsg);
        }
      
        triggerControllers.forEach(trigger => {
            const {alertName, alertType, queryName} = trigger.params;
            if (alertName && !minimatch(reqName, alertName)) return;
            if (alertType && alertType !== "any" && alertType !== reqType) return;
            if (queryName && queryName !== reqQueryName) return;

            trigger.execute(`${reqName}: ${description}`, mData);
        });
        res.status(200).send("OK");
    }
    catch (err){
      res.status(422).send(err.message);
    }
}

module.exports = { alertWebhook }
