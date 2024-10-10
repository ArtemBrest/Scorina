import type {StatusType} from '~/api/types';

export interface Module {
    discipline_id: number
    full_name: string
    short_name: string
    description: string
    status: StatusType
    order_number: number
}

export interface ModuleResponse {
    module_id: number
    discipline_id: number
    full_name: string
    short_name: string
    description: string
    status: StatusType
    order_number: number
}
