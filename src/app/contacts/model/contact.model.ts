export class Contact {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;

    constructor(args: any) {
        this.name = args.name;
        this.email = args.email;
        this.mobile = args.mobile;
        this.landline = args.landline;
        this.website = args.website;
        this.address = args.address;
    }
}