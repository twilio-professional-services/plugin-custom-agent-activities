import * as Flex from '@twilio/flex-ui';
import React, { Component } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { ContentWrapper, AvatarWrapper, Availability, AgentName, FormControlWrapper } from './WorkerCanvasProfile.styles';
import AgentActivities from '../../utils/AgentActivities';


class WorkerCanvasProfile extends Component {
  handleChange = (event) => {
    const { worker } = this.props;
    if (worker) {
      Flex.Actions.invokeAction('SetWorkerActivity', {
        workerSid: worker.sid,
        activitySid: event.target.value
      });
    }
  }

  render() {
    const { worker, classes } = this.props;
    if (worker === undefined) {
      return null;
    }

    const activities = AgentActivities.getEligibleActivites(worker);
    const currentActivity = activities.find(activity => activity.name === worker.activityName);
    return (
      <ContentWrapper>
        <AvatarWrapper>
          <Flex.Avatar
            large
            available={worker.isAvailable}
            imageUrl={worker.attributes.image_url}
            className={classes.avatar} />
        </AvatarWrapper>
        <Availability>
          <AgentName>
            {worker.fullName}
          </AgentName>
          <FormControlWrapper>
            <FormControl fullWidth>
              <Select value={currentActivity?.sid} onChange={this.handleChange}>
                {activities.map(activity => (
                  <MenuItem key={activity.sid} value={activity.sid}>
                    {activity.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControlWrapper>
        </Availability>
      </ContentWrapper>
    );
  }
}

export default WorkerCanvasProfile;
