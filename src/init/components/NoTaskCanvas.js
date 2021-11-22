import React from 'react';
import NoTaskCanvasAvailability from '../../components/NoTaskCanvasAvailability/NoTaskCanvasAvailability';

export default (flex) => {
    replaceAvailability(flex);
}

function replaceAvailability(flex) {
    flex.NoTasksCanvas.Content.remove('availability');
    flex.NoTasksCanvas.Content.add(
        <NoTaskCanvasAvailability key='no-task-canvas-availability' />
    );
}