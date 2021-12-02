import WorkerActivity from './WorkerActivity';

export default (flex, manager) => {
  manager.strings = {
    // -v- Add custom strings here -v-
    ...WorkerActivity,
    // -^---------------------------^-

    ...manager.strings,

    // -v- Modify strings provided by flex here -v-

    // -^----------------------------------------^-
  }
}