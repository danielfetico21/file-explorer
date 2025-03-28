export interface FileInfo {
    name: string;
    type: string;
    size: number| null;
    permissions?: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

export interface FileError{
    name: string;
    error: string;
    details?: string;
}

export type DirectoryItem = FileInfo | FileError;