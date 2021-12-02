import React from 'react';
import * as Flex from '@twilio/flex-ui';
import WorkerCanvasProfile from '../../custom-components/WorkerCanvasProfile/WorkerCanvasProfile.container';

export default (flex) => {
  replaceWorkerCanvasProfile(flex);
}

function replaceWorkerCanvasProfile(flex) {

  const manager = Flex.Manager.getInstance();
  const { agentActivityRules } = manager.serviceConfiguration.ui_attributes;

  if (agentActivityRules) {
    flex.WorkerCanvas.Content.remove('profile');
    flex.WorkerCanvas.Content.add(
      <WorkerCanvasProfile key="worker-canvas-profile" />,
      {
        align: 'start',
        sortOrder: 2
      }
    );
  }
}
