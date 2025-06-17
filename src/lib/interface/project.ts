export interface ProjectModel {
	collectionId: string;
	collectionName: string;
	id: string;
	title: string;
	before_images: string[];
	after_images: string[];
	desc: string;
	title_ar: string;
	desc_ar: string;
	created: Date;
	updated: Date;
	slug: string;
	type: string;
}

export interface ProjecctTypeModel {
	collectionId: string;
	collectionName: string;
	id: string;
	types: string;
	types_ar: string;
	created: Date;
	updated: Date;
}

export interface ProjectWithThumbNail extends ProjectModel {
	before_thumbnail: string | null;
	after_thumbnail: string | null;
}

export interface ProjectsProductsModel {
	collectionId: string;
	collectionName: string;
	id: string;
	descriptoin: string;
	descriptoin_ar: string;
	image: string;
	name: string;
	name_ar: string;
	created: Date;
	updated: Date;
	tds: string;
}

export interface ProjectsProductsModelWithThumb {
	collectionId: string;
	collectionName: string;
	id: string;
	descriptoin: string;
	descriptoin_ar: string;
	image: string;
	name: string;
	name_ar: string;
	created: Date;
	updated: Date;
}
export interface ProjectsProductsModelWithThumb extends ProjectsProductsModel {
	thumbnail: string | null;
	tds_url: string | null;
}
