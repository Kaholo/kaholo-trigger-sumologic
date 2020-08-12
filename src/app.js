const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

function searchWebhook(req,res) {
    let body = req.body
    Trigger.find({ plugin: config.name }).then((triggers) => {
        console.log(`Found ${triggers.length} triggers`);
        res.send('OK');
        triggers.forEach(trigger=>execTrigger(trigger,body,req.io))
    }).catch((error) => res.send(error))
}

function execTrigger (trigger, body,io) {
    new Promise ((resolve,reject) => {
        const searchName = body.kaholo
        const triggerSearchName = trigger.params.find(o => o.name === 'SEARCH_NAME');
        if (searchName != triggerSearchName.value) {
            console.log(searchName, triggerSearchName.value)
            return reject("Not matching search name")
        } else {
            return resolve()
        }
    }).then(() => {
        console.log(trigger.map);
        let message = trigger.name + ' started by SumoLogic trigger'
        console.log(`********** Sumo-Logic: executing map ${trigger.map} **********`);
        mapExecutionService.execute(trigger.map,null,io,{config: trigger.configuration},message,body);
    }).catch(err=>{
        console.error(err);
    })
}
module.exports = {
    SEARCH_WEBHOOK: searchWebhook
}