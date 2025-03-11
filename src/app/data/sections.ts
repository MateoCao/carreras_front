import { Section } from "../types/section";

export const sections: Section[] = [
    {
      name: "Categoría A",
      slug: "categoria-a",
      subsections: [
        {
          name: "Subcategoría 1",
          slug: "subcategoria-1",
          subsections: [
            { name: "Subsubcategoría X", slug: "subsubcategoria-x", subsections: [] },
          ],
        },
        {
          name: "Subcategoría 2",
          slug: "subcategoria-2",
          subsections: [],
        },
      ],
    },
    {
      name: "Categoría B",
      slug: "categoria-b",
      subsections: [],
    },
  ];