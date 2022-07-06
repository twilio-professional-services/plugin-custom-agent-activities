import * as Flex from '@twilio/flex-ui';
import { sortBy } from 'lodash';

class AgentActivities {

  constructor() {
    this.manager = Flex.Manager.getInstance();

    // the supporting configuration for this utility is expected to be set 
    // as a custom element on the ui_attribites of the flex configuration
    // see README for more details
    const { agentActivityRules } = this.manager.serviceConfiguration.ui_attributes;
    this.config = agentActivityRules;
  }

  // NOTE: This will hide any TR activities that are NOT set in the flex config
  // So make sure the deployed flex config contains all activities you'd like to appear in this menu
  getCSSConfig() {
    const { flex } = this.manager.store.getState();
    const { worker: { attributes }, activities } = flex.worker;
    const { routing = { skills: [], levels: {} } } = attributes;
    const skills = routing.skills || [];



    return Array.from(activities.values()).reduce((results, activity, idx) => {
      // default the cssConfig to hide this element
      let cssConfig = { idx, display: 'none', order: idx };
      // fetch activity from the config stored in ui_attributes.agentActivityRules
      const activityRule = this.config[activity.sid];
      // if the activity exists
      if (activityRule) {
        const { requiredSkill, sortOrder } = activityRule;
        // and if there are no skills required or skill is available
        if (!requiredSkill || skills.includes(requiredSkill)) {
          // show the activity
          cssConfig.display = 'flex';
          console.log("activity rule",activity )
          console.log("activityRule ",activityRule)


        }
        // set the order of the activity
        cssConfig.order = sortOrder;
      }
      // return the element with all previous results into one array
      return [...results, cssConfig];
    }, []);
  }


  // NOTE: This will hide any TR activities that are NOT set in the flex config
  // So make sure the deployed flex config contains all activities you'd like to appear in this menu
  getEligibleActivites(worker) {
    const { flex } = this.manager.store.getState();
    const { worker: { attributes }, activities } = flex.worker;
    const { routing = { skills: [], levels: {} } } = attributes;
    let skills = routing.skills || [];

    if (worker) {
      const { routing: agentRouting = { skills: [], levels: {} } } = worker.attributes;
      skills = agentRouting.skills || [];
    }
    const eligibleSkills = Array.from(activities.values()).reduce((results, activity) => {
      const activityRule = this.config[activity.sid];
      if (activityRule) {
        const { requiredSkill, sortOrder } = activityRule;
        if (!requiredSkill || skills.includes(requiredSkill)) {
          return [...results, { sortOrder, activity }];
        }
      }
      return results;
    }, []);
    return sortBy(eligibleSkills, 'sortOrder').map(result => result.activity);
  }
}

export default new AgentActivities();
