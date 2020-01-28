export class CompanyItem {
    id: number;
    userId: number;
    organizationName: string;
    businessId: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
}

export class AddCompanyItem {
    organizationName: string;
    businessId: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
}
