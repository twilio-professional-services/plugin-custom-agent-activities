import React from 'react';
import * as Flex from '@twilio/flex-ui';
import NoTaskCanvasAvailability from '../../custom-components/NoTaskCanvasAvailability/NoTaskCanvasAvailability';

export default (flex) => {
    replaceAvailability(flex);
}

function replaceAvailability(flex) {

    const manager = Flex.Manager.getInstance();
    const { agentActivityRules } = manager.serviceConfiguration.ui_attributes;

    if (agentActivityRules) {
        flex.NoTasksCanvas.Content.remove('availability');
        flex.NoTasksCanvas.Content.add(
            <NoTaskCanvasAvailability key='no-task-canvas-availability' />
        );
    }
}