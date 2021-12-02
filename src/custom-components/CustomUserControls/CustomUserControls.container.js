import { connect } from 'react-redux';

import CustomUserControls from './CustomUserControls';

const mapStateToProps = (state) => {
  const { flex: { worker } } = state;

  return {
    workerState: worker
  };
};

const connector = connect(mapStateToProps);

export default connector(CustomUserControls);