export type PhotosType = {
    small:string 
    large: string
}

export type UsersType = {
    id:number | null
    name:string | null
    status:string | null
    photos: PhotosType | null
    followed:boolean
}

export type PostsType = {
    id:number
    message:string
    likeCount: number
}

export type ContactsType = {
    github: string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId?:number 
    lookingForAJob?:boolean
    lookingForAJobDescription?: string 
    fullName?: string 
    contacts?: ContactsType 
    photos?:PhotosType 
}