export interface KeyValuePair{
 id:number;
 name:string;
}

export interface Contact{
    name:string;
    phone:string;
    email:string
}
export interface Vechicle {
    id: number,
    model:KeyValuePair;
    make:KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;
}
export interface SaveVechicle {
    id: number,
    modelId:number;
    makeId:number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}

