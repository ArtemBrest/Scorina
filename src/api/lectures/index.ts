import {apiWrapper} from '~/api/api.wrapper';
import type {ApiResponsePromise} from '~/api/types';
import type {Lecture, LectureResponse} from './types';

export const getLecturesByModule = async (moduleId: number): ApiResponsePromise<LectureResponse[]> => apiWrapper.get(`/api/v1/modules/${moduleId}/lectures`);

export const getLectures = async (): ApiResponsePromise<LectureResponse[]> => apiWrapper.get('/api/v1/lectures');

export const addLecture = async (lecture: Lecture): ApiResponsePromise => apiWrapper.post('/api/v1/lectures', lecture);

export const updateLecture = async (lecture: Lecture): ApiResponsePromise => apiWrapper.put('/api/v1/lectures', lecture);

export const deleteLecture = async (id: number): ApiResponsePromise => apiWrapper.delete('/api/v1/lectures', {id});
