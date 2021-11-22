import * as Flex from '@twilio/flex-ui';

class AgentActivities {

  constructor() {
    this.manager = Flex.Manager.getInstance();
    const { agentActivityRules } = this.manager.serviceConfiguration.ui_attributes;
    this.config = agentActivityRules;
  }

  getCSSConfig() {
    const { flex } = this.manager.store.getState();
    const { worker: { attributes }, activities } = flex.worker;
    const { routing = { skills: [], levels: {} } } = attributes;
    const skills = routing.skills || [];

    // NOTE: This will hide any TR activities that are NOT set in the flex config
    //       So make sure the deployed flex config contains all activities you'd like to appear in this menu
    return Array.from(activities.values()).reduce((results, activity, idx) => {
      let cssConfig = { idx, display: 'none', order: idx };
      const activityRule = this.config[activity.sid];
      if (activityRule) {
        const { requiredSkill, sortOrder } = activityRule;
        if (!requiredSkill || skills.includes(requiredSkill)) {
          cssConfig.display = 'flex';
        }
        cssConfig.order = sortOrder;
      }
      return [...results, cssConfig];
    }, []);
  }
}

export default new AgentActivities();
