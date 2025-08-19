# Notice - Legacy Code

**This plugin is no longer maintained and has been migrated to the [Flex Plugin Library](https://www.twilio.com/docs/flex/developer/plugins/plugin-library) where it is available as an out-of-box feature. The plugin is also available as part of the customizable [Flex Project Template](https://github.com/twilio-professional-services/flex-project-template), where it is an optional feature.**

# Custom User Controls Plugin

This is a plugin for Twilio Flex that provides a configuration feature for Worker Activities such that they can be

- ordered
- have visibility of activities controlled by worker skills

# Known issue

On older Twilio Flex accounts a TaskRouter Activity of "Reserved" may be present.  This Activity is automatically hidden by the Flex UI and breaks the logic of the plugin.  In this scenario it is advised you remove any TaskQueue references to the "Reserved" activity (which will likely be the activity to use when task is assigned on the TaskQueue and as such isnt actually used by Flex) and then delete the "Reserved" Activity.

## disclaimer

The Flex Component "UserControls" which is the activity selector and current status indicator at the top right of the flex screen, lacks appropriate properties or hooks to modify the OOTB behavior without completely replacing the component.

This plugin uses a wrapper around these components to apply css to the underlying component to order and hide the activity elements.  This is not an ideal approach but is a tidy solution until appropriate hooks become available.  An alternative approach would be to completely rewrite the underlying components but this would be a lot more invasive and magnitudes of effort greater.

## dependencies

This plugin relies on custom configuration being applied to your underlying [Flex Configuration](https://www.twilio.com/docs/flex/developer/ui/configuration#modifying-configuration-for-flextwiliocom)

for each activity sid you want to add an entry to the following ui_attributes element

```
"agentActivityRules": {
	"<ACTIVITY_SID>" :  {
		"requiredSkill" : "skill_name",
		"sortOrder": order
	}
}
```

As an example:

```
"agentActivityRules": {
            "WA845ba1c86cb933b0806deabb39784c66": {
                "requiredSkill": "testing",
                "sortOrder": 0
            },
            "WA6af363ff8880786f37c453bfa297dca1": {
                "requiredSkill": null,
                "sortOrder": 1
            },
            "WAeee0165b5d13a7d246401dc7771c04f0": {
                "requiredSkill": null,
                "sortOrder":2
            },
}
```

NOTE: **Any activities that are not configured will not show.**

## Setup for this plugin

1. Checkout or clone this repository:

	  ```
	https://github.com/twilio-professional-services/plugin-custom-agent-activities.git
	  ```


2. Setup flex configuration as mentioned above under dependencies.

	In order to do this you need to first get the flex configuration, you can do that by:

	```
	curl -X GET 'https://flex-api.twilio.com/v1/Configuration' \
	-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
	```

	Copy the ui_attributes portion from the response you get and make the POST request with the updates to the ui_attributes

	```
	curl -X POST 'https://flex-api.twilio.com/v1/Configuration' \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
    -H 'Content-Type: application/json' \
    -d '{
        "account_sid":"Add your flex account sid here",
        "ui_attributes": {
            "Add the agent activities rule as shown in the section above",
        ...old properties continued
        }
    }'
    ```


3. Change directory to the plugin

	```
	cd plugin-custom-agent-activities
	```

4. Install the dependencies

	```
	npm install
	```

5. Ensure that the `appConfig.example.js` under the public folder has been updated to `appConfig.js`

6. Run plugin on a local environment using :

	```
	twilio flex:plugins:start
	```
