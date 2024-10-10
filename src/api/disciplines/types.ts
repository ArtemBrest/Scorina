import type {StatusType} from '~/api/types';

export interface Discipline {
    full_name: string
    short_name: string
    description: string
    status: StatusType
}

export interface DisciplineResponse {
    discipline_id: number
    full_name: string
    short_name: string
    description: string
    status: StatusType
}
