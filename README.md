# kaholo-trigger-sumologic
Kaholo trigger for Sumo Logic

# Methods:

## Sumo Logic Alert Webhook

This webhook listen on POST http://<Your URL>/webhook/sumologic/alert

**Parameters:**

Search name:
When creating the webhook in SumoLogic you should transfer in the payload JSON

```
{
  "kaholo": "{{SearchName}}"
}
```

In Kaholo's trigger you need to type in the search name delivered by the webhook in order to start the map.

