export const enum InputMessageType {
    INFO = 'info',
    ERROR = 'error',
}

export interface InputMessage {
    type: InputMessageType
    msg: string
    prefix?: string
}

export const enum InputPattern {
    POSITIVE_DIGIT = '^[0-9]*$',
    DIGIT_ARRAY = '^[\\d, ]*$',
    STRING_ARRAY = '^[\\w, ]*$',
    EMAIL = '^[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]*)?(\\\\.[a-zA-Z]*)?$',
}
