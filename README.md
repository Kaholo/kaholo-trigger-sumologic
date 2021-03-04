# kaholo-trigger-sumologic
Kaholo trigger for Sumo Logic webhooks

## How to use:
After installing the trigger on Kaholo, follow the steps described [here](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections#Common_variables_for_alerts-9057) to link the webhook to your Sumo Logic account. 

Please Notice! Sumo Logic asks you to define the JSON format sent to the webhook. You should the following JSON format when connecting it to Kaholo:
{
  "kaholo": {
    "name": "{{Name}}",
    "queryName": "{{Query}}",
    "type": "{{MonitorType}}",
    "description": "{{Description}}"
  },
  "results": "{{ResultsJson}}"
}

## Method: Alert Webhook
This triggers whenever there is an event sent from Sumo Logic to your webhook.

### Webhook URL:
**{KAHOLO_URL}/webhook/sumologic/alert**

### Parameters:
1) Alert Name - If specified, only trigger when the alert matches the alert name provided. If not specified, accept any alert Name.
  You can specify the full alert name, or a name [minimatch pattern](https://github.com/isaacs/minimatch#readme).
3) Alert Type - If specified, only trigger when the alert matches the alert type providedd(Logs/Metrics).
  If not specified, accept any event type.
3) Query Name - If specified, only trigger when the alert was raised from the query that matches the query name specified. 
  If not specified, accept events from any query. You can specify the full query name, or a name [minimatch pattern](https://github.com/isaacs/minimatch#readme).