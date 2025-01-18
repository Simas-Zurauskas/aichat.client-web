import { useMemo } from 'react';
import { slice } from '../reducers/theme';
import { bindActionCreators } from 'redux';
import { useStateDispatch } from '../store';

const useActionsTheme = () => {
  const { actions } = slice;
  const dispatch = useStateDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

export default useActionsTheme;
