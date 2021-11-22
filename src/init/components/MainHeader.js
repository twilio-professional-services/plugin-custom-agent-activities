import React from 'react';
import CustomUserControls from '../../components/CustomUserControls/CustomUserControls.container';

export default (flex, manager) => {
  replaceUserControls(flex, manager);
}

function replaceUserControls(flex) {
  flex.MainHeader.Content.remove('user-controls');
  flex.MainHeader.Content.add(
    <CustomUserControls key="custom-user-controls" />,
    {
      sortOrder: 2,
      align: 'end'
    }
  );
}
