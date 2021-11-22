import React, { Component } from 'react';
import * as Flex from '@twilio/flex-ui';
import AgentActivities from '../../utils/AgentActivities';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { FormControlWrapper } from './NoTaskCanvasAvailability.styles';


class NoTaskCanvasAvailability extends Component {
    handleChange = (event) => {
        Flex.Actions.invokeAction("SetActivity", { activitySid: event.target.value });
    };

    render() {
        const { worker } = this.props;

        if (worker === undefined) {
            return null;
        }

        const activities = AgentActivities.getEligibleActivites(worker.worker);
        return (
            <FormControlWrapper>
                <FormControl fullWidth>
                    <Select value={worker.activity.sid} onChange={this.handleChange}>
                        {activities.map(activity => (
                            <MenuItem key={activity.sid} value={activity.sid}>
                                {activity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormControlWrapper>
        );
    }
}

export default NoTaskCanvasAvailability;