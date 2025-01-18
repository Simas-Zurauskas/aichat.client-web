import { useMemo } from 'react';
import { slice } from '../reducers/app';
import { bindActionCreators } from 'redux';
import { useStateDispatch } from '../store';

const useActionsApp = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

export default useActionsApp;
