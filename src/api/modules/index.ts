import {apiWrapper} from '~/api/api.wrapper';
import type {ApiResponsePromise} from '~/api/types';
import type {Module, ModuleResponse} from './types';

export const getModulesByDiscipline = async (disciplineId: number): ApiResponsePromise<ModuleResponse[]> => apiWrapper.get(`/api/v1/disciplines/${disciplineId}/modules`);

export const getModules = async (): ApiResponsePromise<ModuleResponse[]> => apiWrapper.get('/api/v1/modules');

export const addModule = async (module: Module): ApiResponsePromise => apiWrapper.post('/api/v1/modules', module);

export const updateModule = async (module: Module): ApiResponsePromise => apiWrapper.put('/api/v1/modules', module);

export const deleteModule = async (id: number): ApiResponsePromise => apiWrapper.delete('/api/v1/modules', {id});
