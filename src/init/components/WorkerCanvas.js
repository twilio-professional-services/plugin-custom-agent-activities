import React from 'react';

import WorkerCanvasProfile from '../../components/WorkerCanvasProfile/WorkerCanvasProfile.container';

export default (flex) => {
  replaceWorkerCanvasProfile(flex);
}

function replaceWorkerCanvasProfile(flex) {
  flex.WorkerCanvas.Content.remove('profile');
  flex.WorkerCanvas.Content.add(
    <WorkerCanvasProfile key="worker-canvas-profile" />,
    {
      align: 'start',
      sortOrder: 2
    }
  );
}
