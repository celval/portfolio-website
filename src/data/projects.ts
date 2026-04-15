export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
}

export const tagColors: Record<string, string> = {
  "Brand": "#e5bbe3",
  "Web Design": "#d6e06e",
  "Product Design": "#ffdf48",
  "Visual Design": "#6ed4e0",
  "No-Code Development": "#d6e06e",
};

export const projects: Project[] = [
  {
    slug: "ennismore",
    title: "Ennismore",
    description: "Designing and launching seven restaurant websites",
    tags: ["Brand", "Web Design"],
    images: [
      "/images/projects/ennismore-1.jpg",
      "/images/projects/ennismore-2.jpg",
      "/images/projects/ennismore-3.jpg",
      "/images/projects/ennismore-4.jpg",
      "/images/projects/ennismore-5.jpg",
      "/images/projects/ennismore-6.jpg",
      "/images/projects/ennismore-7.jpg",
      "/images/projects/ennismore-8.jpg",
    ],
  },
  {
    slug: "delli",
    title: "Delli",
    description: "Improving the e-commerce experience for an online deli",
    tags: ["Brand", "Product Design", "Visual Design"],
    images: [
      "/images/projects/delli-1.jpg",
      "/images/projects/delli-2.jpg",
      "/images/projects/delli-3.jpg",
      "/images/projects/delli-4.jpg",
      "/images/projects/delli-5.jpg",
      "/images/projects/delli-6.jpg",
      "/images/projects/delli-7.jpg",
    ],
  },
  {
    slug: "different-kind",
    title: "Different Kind",
    description: "Creating a brand identity and e-commerce platform design for an ethical company",
    tags: ["Brand", "Product Design"],
    images: [
      "/images/projects/different-kind-1.jpg",
      "/images/projects/different-kind-2.jpg",
      "/images/projects/different-kind-3.jpg",
      "/images/projects/different-kind-4.jpg",
      "/images/projects/different-kind-5.jpg",
      "/images/projects/different-kind-6.jpg",
      "/images/projects/different-kind-7.jpg",
      "/images/projects/different-kind-8.jpg",
    ],
  },
  {
    slug: "allergan",
    title: "Allergan Medical Institute",
    description: "Redesigning an online learning platform",
    tags: ["Product Design", "Brand"],
    images: [
      "/images/projects/allergan-1.jpg",
      "/images/projects/allergan-2.jpg",
      "/images/projects/allergan-3.jpg",
      "/images/projects/allergan-4.jpg",
      "/images/projects/allergan-5.jpg",
      "/images/projects/allergan-6.jpg",
      "/images/projects/allergan-7.jpg",
      "/images/projects/allergan-8.jpg",
    ],
  },
  {
    slug: "villa-soulia",
    title: "Villa Soulia",
    description: "Creating a brand identity and marketing website for a luxury villa in Greece",
    tags: ["Brand", "Web Design", "No-Code Development"],
    images: [
      "/images/projects/villa-soulia-1.jpg",
      "/images/projects/villa-soulia-2.jpg",
      "/images/projects/villa-soulia-3.jpg",
      "/images/projects/villa-soulia-4.jpg",
      "/images/projects/villa-soulia-5.jpg",
    ],
  },
];
