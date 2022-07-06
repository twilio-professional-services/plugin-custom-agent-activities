import React from 'react';
import * as Flex from '@twilio/flex-ui';
import NoTaskCanvasAvailability from '../../custom-components/NoTaskCanvasAvailability/NoTaskCanvasAvailability';

import { MuiThemeProvider, createTheme,StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { withTheme } from '@twilio/flex-ui';

export default (flex) => {
    replaceAvailability(flex);
}

function replaceAvailability(flex) {

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

    if (agentActivityRules) {
        flex.NoTasksCanvas.Content.remove('availability');
        flex.NoTasksCanvas.Content.add(
            <NoTaskCanvasAvailability key='no-task-canvas-availability' />
        );
    }
}