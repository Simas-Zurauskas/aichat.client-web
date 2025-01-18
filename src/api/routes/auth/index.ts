import { client } from '../../client';
import { ApiResponse, User } from '../../types';

type Authorise = () => Promise<ApiResponse<User>>;

export const authorise: Authorise = () => {
  const path = `/auth/authorise`;
  return client({
    method: 'GET',
    url: path,
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------
