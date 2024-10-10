import {apiWrapper} from '~/api/api.wrapper';
import type {ApiResponsePromise} from '~/api/types';
import type {Discipline, DisciplineResponse} from '~/api/disciplines/types';

export const getDisciplines = async (): ApiResponsePromise<DisciplineResponse[]> => apiWrapper.get('/api/v1/disciplines');
export const addDiscipline = async (discipline: Discipline): ApiResponsePromise => apiWrapper.post('/api/v1/disciplines', discipline);
export const updateDiscipline = async (discipline: DisciplineResponse): ApiResponsePromise => apiWrapper.put('/api/v1/disciplines', discipline);
export const deleteDiscipline = async (id: number): ApiResponsePromise => apiWrapper.delete('/api/v1/disciplines', {id});
