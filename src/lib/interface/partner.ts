export interface PartnerModel {
	collectionId: string;
	collectionName: string;
	id: string;
	company_url: string;
	logo: string;
	created: Date;
	updated: Date;
}
export interface PartnerModelWithThumbNail extends PartnerModel {
	thumbnail: string | null;
}
