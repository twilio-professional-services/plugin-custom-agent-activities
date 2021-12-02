import * as Flex from '@twilio/flex-ui';
import WorkerActivityStringTemplates from '../../strings/WorkerActivity';

export default (flex, manager) => {
  unconfiguredAgentActivityRules(flex, manager);
}

function unconfiguredAgentActivityRules(flex, manager) {
  flex.Notifications.registerNotification({
    id: 'UnconfiguredAgentActivityRules',
    type: Flex.NotificationType.error,
    content: WorkerActivityStringTemplates.UnconfiguredAgentActivityRules
  });
}