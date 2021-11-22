import * as Flex from '@twilio/flex-ui';
import React, { Component } from 'react';
import { UserControlsWrapper } from './CustomUserControls.styles'
import AgentActivities from '../../utils/AgentActivities'



class CustomUserControls extends Component {
  render() {
    const { workerState: { worker } } = this.props;
    const attributes = worker.attributes;
    const { fullName, isAvailable } = worker;
    // NOTE: This will use a "hack" of sorts...
    // Using css it will show/hide and change the order of the activities
    // Mostly because there isn't a way to hook into the native component
    return (
      <UserControlsWrapper activitiesConfig={AgentActivities.getCSSConfig()}>
        <Flex.UserControls>
          <Flex.UserCard
            large
            isAvailable={isAvailable}
            imageUrl={attributes.image_url}
            firstLine={fullName}
            secondLine={Flex.templates.UserControlWorkerSecondLine({ worker })} />
        </Flex.UserControls>
      </UserControlsWrapper>
    );
  }
}

export default CustomUserControls;
