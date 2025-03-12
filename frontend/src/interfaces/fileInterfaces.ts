export interface FileInfo {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    permissions: string;
    createdAt: Date;
    modifiedAt: Date;
    error?: string
    details?: string
}

export interface FileError {
    type: "error";
    error: string;
    details?: string;
}


export interface PlatformInfo {
    platfrom: string
}

export interface GetAllFilesResponse {
    type: "success";
    contents: FileInfo[];
}

export interface GetFileResponse {
    type: "success"
    details: FileInfo;
}

export interface GetPlatformResponse {
    type: "success";
    platform: string;
}


export type GetFilesApiResponse = GetAllFilesResponse | FileError;
export type GetFileApiResponse = GetFileResponse | FileError;