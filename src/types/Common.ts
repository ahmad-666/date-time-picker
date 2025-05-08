import { type ReactNode } from 'react';

export type ServerStatus = 'ok' | 'nok';
export type ServerError = {
    message: string;
};
export type ServerMetadata = {
    meta: {
        totalItems: number;
    };
};
export type Faq = {
    question: ReactNode;
    answer: ReactNode;
};

export type SortOrder = 'ASC' | 'DESC';
