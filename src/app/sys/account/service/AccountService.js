import { stringify } from 'qs';
import request from 'core/utils/request';

export async function listUser(params) {
  return request(`/account/list?${stringify(params)}`);
}

