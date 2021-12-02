import React from 'react';
import * as Flex from '@twilio/flex-ui';
import CustomUserControls from '../../custom-components/CustomUserControls/CustomUserControls.container';

export default (flex, manager) => {
  replaceUserControls(flex, manager);
}

function replaceUserControls(flex) {

  const manager = Flex.Manager.getInstance();
  const { agentActivityRules } = manager.serviceConfiguration.ui_attributes;

  if (agentActivityRules) {
    flex.MainHeader.Content.remove('user-controls');
    flex.MainHeader.Content.add(
      <CustomUserControls key="custom-user-controls" />,
      {
        sortOrder: 2,
        align: 'end'
      }
    );
  } else {
    Flex.Notifications.showNotification('UnconfiguredAgentActivityRules');
  }
}
