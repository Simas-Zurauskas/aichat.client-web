import { client } from '../../client';
import { ApiResponse } from '../../types';

type DeleteAccount = () => Promise<ApiResponse<unknown>>;

export const deleteAccount: DeleteAccount = () => {
  const path = `/account`;
  return client({
    method: 'DELETE',
    url: path,
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------
