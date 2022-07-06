import React from 'react';
import * as Flex from '@twilio/flex-ui';
import WorkerCanvasProfile from '../../custom-components/WorkerCanvasProfile/WorkerCanvasProfile.container';
import { MuiThemeProvider, createTheme,StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { withTheme } from '@twilio/flex-ui';

export default (flex) => {
  replaceWorkerCanvasProfile(flex);
}

function replaceWorkerCanvasProfile(flex) {

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


//   Flex.setProviders({
//     CustomProvider: (RootComponent) => (props) => {
//         return (
//           <StylesProvider generateClassName={createGenerateClassName({
//             productionPrefix: 'plugin-custom-agent-activities',
//           })}>
//                 <RootComponent {...props} />
//             </StylesProvider>
//         );
//     }
// });

// Flex.AgentDesktopView.Panel1.Content.add(<StyledSampleComponent  key="no1"  />);

  
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
