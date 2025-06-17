export interface ArtProductsModel {
    id:             string;
    name:           string;
    name_ar:        string;
    description_ar: string;
    description:    string;
    image:          string;
    shop:           string;
}
export interface ArtProductsModelwithThumb extends ArtProductsModel {
    thumbnail: string | null;
  }