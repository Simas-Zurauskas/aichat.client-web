import { AxiosResponse } from 'axios';
export type ThenArgs<T> = T extends Promise<infer U> ? U : T;
export type AxiosArgs<T> = T extends AxiosResponse<infer U> ? U : undefined;

export type ApiResponse<T> = AxiosArgs<ThenArgs<AxiosResponse<T>>>;

export interface User {
  _id: string;
  email: string;
  usage: {
    cycleReset: string;
    vectorOpsLimit: number;
    vectorOps: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export enum LLM {
  GPT4O = 'gpt-4o',
  GEMINI15PRO = 'gemini-1.5-pro',
}

export interface Message {
  _id: string;
  id?: string;
  conversationId?: string;
  role: 'user' | 'ai';
  content: string;
  feedback?: 'negative' | 'positive';
  date: Date;
}

export interface Instance {
  _id: string;
  uxId: string;
  name: string;
  userSettings: string;
  files: FileMeta[];
  createdAt: string;
  updatedAt: string;
  chat: Message[];
  llm: LLM;
  deleteAt: string;
}

export interface FileMeta {
  _id: string;
  key: string;
  originalName: string;
  mimetype: string;
  size: number;
  context: string;
  location: string;
  vectorCount: number;
  jobStatus: JobStatus;
}

export interface FileRef {
  url: string;
  mimetype: string;
}
