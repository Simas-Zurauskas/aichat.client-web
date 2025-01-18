import { AxiosProgressEvent } from 'axios';
import { client } from '../../client';
import { ApiResponse, Instance, Message } from '../../types';
export * from './file';
export * from './chat';

type CreateInstance = (
  params: { files: File[]; name: string; context: string; userSettings: string },
  b?: (a: AxiosProgressEvent) => void,
) => Promise<ApiResponse<Instance>>;

export const createInstance: CreateInstance = (params, onUploadProgress) => {
  const formData = new FormData();

  params.files.forEach((el) => {
    formData.append('files', el);
  });

  formData.append('name', params.name);
  formData.append('context', params.context);
  formData.append('userSettings', params.userSettings);

  return client({
    url: `/instances`,
    method: 'POST',
    data: formData,
    onUploadProgress: onUploadProgress ? onUploadProgress : undefined,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type GetInstances = () => Promise<ApiResponse<Instance[]>>;

export const getInstances: GetInstances = () => {
  return client({
    url: `/instances`,
    method: 'GET',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type DelInstance = (uxId: string) => Promise<ApiResponse<null>>;

export const delInstance: DelInstance = (uxId) => {
  return client({
    url: `/instances/${uxId}`,
    method: 'DELETE',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type GetInstance = (uxId: string) => Promise<ApiResponse<Instance>>;

export const getInstance: GetInstance = (uxId) => {
  return client({
    url: `/instances/${uxId}`,
    method: 'GET',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type UpdateInstance = (params: { uxId: string; userSettings: string }) => Promise<ApiResponse<Instance>>;

export const updateInstance: UpdateInstance = ({ uxId, ...data }) => {
  return client({
    url: `/instances/${uxId}`,
    method: 'PUT',
    data,
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type GetChat = (uxId: string) => Promise<ApiResponse<Message[]>>;

export const getChat: GetChat = (uxId) => {
  return client({
    url: `/instances/${uxId}/chat`,
    method: 'GET',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------
