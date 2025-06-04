export interface PostModel {
	collectionId: string;
	collectionName: string;
	id: string;
	title: string;
	image: string;
	desc: string;
	title_ar: string;
	desc_ar: string;
	created: Date;
	updated: Date;
	likes: number;
	slug: string;
}
export interface PostModelThumbNail extends PostModel {
	thumbnail: string | null;
  }
