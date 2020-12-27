export class User {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    role: string;
    version: number;
    constructor(
        $key?: string,
        name?: string,
        email?: string,
        phone?: string,
        role?: string,
        password?: string,

    ) { }
}
