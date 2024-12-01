import type {StatusType} from '~/api/types';

export interface Lecture {
    module_id: number
    title: string
    content: string
    status: StatusType
}

export interface LectureResponse {
    lecture_id: number
    module_id: number
    title: string
    content: string
    status: StatusType
}
