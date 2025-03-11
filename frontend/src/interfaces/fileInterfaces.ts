export interface FileInfo {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    permissions: string;
    createdAt: Date;
    modifiedAt: Date;
}

export interface DirectoryItem {
    name: string
    type: 'file' | 'directory'
    size?: number | null
    modifiedAt: Date
    createdAt: Date
    error?: string
    details?: FileInfo
}


export interface PlatformInfo {
    platfrom: string
}

export interface GetAllFilesResponse {
    type: "success";
    contents: DirectoryItem[];
}

export interface GetFileResponse {
    type: "success";
    details: FileInfo;
}

export interface GetPlatformResponse {
    type: "success";
    platform: string;
}