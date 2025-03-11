import { Section } from "../types/section";

interface navbarItemsProps {
    currentSection: Section;
    setBreadcrumb: React.Dispatch<React.SetStateAction<Section[]>>;
    breadcrumb: Section[];
}
export const NavbarItems = ({currentSection, setBreadcrumb, breadcrumb}: navbarItemsProps) => {
    return (
        <ul className="flex flex-col gap-3 text-xl">
              {currentSection.subsections?.map((sub) => (
            <li
                key={sub.slug}
                onClick={() => setBreadcrumb([...breadcrumb, sub])}
                className="cursor-pointer hover:text-gray-400 transition-normal duration-200 ease-in-out"
            >
                {sub.name}
            </li>
            ))}
        </ul>
    )
}