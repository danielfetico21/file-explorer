export interface FileItem {
    name: string
    path: string
    type : 'file' | 'directory'
    size?: number | null
    modifiedAt: Date
    createdAt: Date
    extension?: string
}


export interface PlatformInfo {
 platfrom: string
}