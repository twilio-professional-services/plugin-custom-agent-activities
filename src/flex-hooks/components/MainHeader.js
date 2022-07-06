import React from 'react';
import * as Flex from '@twilio/flex-ui';
import CustomUserControls from '../../custom-components/CustomUserControls/CustomUserControls.container';
import { MuiThemeProvider, createTheme,StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { withTheme } from '@twilio/flex-ui';

export default (flex, manager) => {
  replaceUserControls(flex, manager);
}

function replaceUserControls(flex) {

  const manager = Flex.Manager.getInstance();

  const generateClassName = createGenerateClassName({
    productionPrefix: 'plugin-custom-agent-activities'
});

const FlexThemeProvider = withTheme(({ theme, children }) => {
  return (
        <MuiThemeProvider theme={createTheme(theme)}>
            <StylesProvider generateClassName={generateClassName}>
                {children}
            </StylesProvider>
        </MuiThemeProvider>
  )
});

Flex.setProviders({
  CustomProvider: (RootComponent) => (props) => {
      return (
          <FlexThemeProvider>
              <RootComponent {...props} />
          </FlexThemeProvider>
      );
  }});
  
  
  const { agentActivityRules } = manager.serviceConfiguration.ui_attributes;
  console.log("agentActivityRules in header ", agentActivityRules);

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
