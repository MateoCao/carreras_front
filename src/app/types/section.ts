export interface Section {
  name: string;
  slug: string;
  subsections?: Section[];
}