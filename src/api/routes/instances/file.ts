import { client } from '@/api/client';
import { ApiResponse, FileRef, Instance } from '@/api/types';
import { AxiosProgressEvent } from 'axios';

type DelFile = (params: { uxId: string; fileId: string }) => Promise<ApiResponse<null>>;

export const delFile: DelFile = ({ uxId, fileId }) => {
  return client({
    url: `/instances/${uxId}/file/${fileId}`,
    method: 'DELETE',
  }).then((res) => res.data.data);
};

// ----------------------------------------------------------------------------------------

type UploadFiles = (
  params: { files: File[]; uxId: string; context: string },
  b?: (a: AxiosProgressEvent) => void,
) => Promise<ApiResponse<Instance>>;

export const uploadFiles: UploadFiles = (params, onUploadProgress) => {
  const formData = new FormData();
  formData.append('context', params.context);

  params.files.forEach((el) => {
    formData.append('files', el);
  });

  return client({
    url: `/instances/${params.uxId}/file`,
    method: 'POST',
    data: formData,
    onUploadProgress: onUploadProgress ? onUploadProgress : undefined,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type RequestFileUrl = (params: { uxId: string; fileId: string }) => Promise<ApiResponse<FileRef>>;

export const requestFileUrl: RequestFileUrl = ({ uxId, fileId }) => {
  return client({
    url: `/instances/${uxId}/file/${fileId}/request-url`,
    method: 'GET',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type UpdateFile = (params: { instanceId: string; fileId: string; context: string }) => Promise<ApiResponse<FileRef>>;

export const updateFile: UpdateFile = ({ instanceId, fileId, ...data }) => {
  return client({
    url: `/instances/${instanceId}/file/${fileId}`,
    data,
    method: 'PUT',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------
