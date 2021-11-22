import * as Flex from '@twilio/flex-ui';
import { ActivitySettings } from '../../enums';

class AgentActivities {

  constructor() {
    this.manager = Flex.Manager.getInstance();
    // const { agentActivityRules } = this.manager.serviceConfiguration.ui_attributes;
    // this.config = agentActivityRules;

    // Alternative implementation from using Flex Configuration object - use constants
    this.config = new Map(Object.entries(ActivitySettings));
  }

  getCSSConfig() {
    const { flex } = this.manager.store.getState();
    const { worker: { attributes }, activities } = flex.worker;
    const { routing = { skills: [], levels: {} } } = attributes;
    const skills = routing.skills || [];

    // NOTE: This will hide any TR activities that are NOT set in the config or for which 
    // the agent is not skilled
    return Array.from(activities.values()).reduce((results, activity, idx) => {
      let cssConfig = { idx, display: 'none', order: idx };
      const activitySetting = this.config.get(activity.name);
      if (activitySetting) {
        const { requiredSkill, sortOrder } = activitySetting;
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
