export class CompanyItem {
    id: number;
    userId: number;
    companyName: string;
    businessId: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
}

export class AddCompanyItem {
    companyName: string;
    businessId: string;
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
}
