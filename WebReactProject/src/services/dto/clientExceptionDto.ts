export interface ClientExceptionDto {
    field: string;
    content: string;
}

export function ToClientException(input: string): ClientExceptionDto {
    return JSON.parse(input)
}