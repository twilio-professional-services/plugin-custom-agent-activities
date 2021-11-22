import MainHeader from './MainHeader';
import NoTaskCanvas from './NoTaskCanvas';
import WorkerCanvas from './WorkerCanvas';

export default (flex, manager) => {
  MainHeader(flex, manager);
  NoTaskCanvas(flex, manager);
  WorkerCanvas(flex, manager);
}