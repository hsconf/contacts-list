export interface Contact {
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
}

export interface Contacts extends Contact {
    id: string;
}

export interface IContact {
    [id: string]: Contact;
}