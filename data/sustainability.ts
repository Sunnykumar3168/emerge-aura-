export interface SustainabilityItem {
  id: string;
  title: string;
  content: string;
  tag: string;
  iconName:
    | "Bus"
    | "UtensilsCrossed"
    | "Shirt"
    | "Droplets"
    | "FileCheck2"
    | "TreePine"
    | "Flower2"
    | "Palette"
    | "Camera";
}

export interface SustainabilityData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: SustainabilityItem[];
}

export const sustainabilityData: SustainabilityData = {
  eyebrow: "CONSCIOUS BY CHOICE",
  heading: "Sustainability",
  subheading:
    "Every operational choice at EMERGE AURO is rooted in mindfulness, conservation, and mindful living.",
  items: [
    {
      id: "travel",
      title: "Travel",
      content: "Shared and public transport, car-pooling.",
      tag: "Green Transit",
      iconName: "Bus",
    },
    {
      id: "food",
      title: "Food",
      content: "Local, seasonal food, vegetarian.",
      tag: "Farm to Table",
      iconName: "UtensilsCrossed",
    },
    {
      id: "attire",
      title: "Attire",
      content: "No formal wear needed. Come in loose, relaxed Bharatiya wear.",
      tag: "Dress Code",
      iconName: "Shirt",
    },
    {
      id: "plastic-free",
      title: "Plastic-free",
      content: "Glass or steel bottles and water dispensers. Bring your own bottles.",
      tag: "Zero Waste",
      iconName: "Droplets",
    },
    {
      id: "sustainability-audit",
      title: "Sustainability Audit",
      content:
        "An audit of the event's footprint, with the report presented at the valedictory on Day 2.",
      tag: "Accountability",
      iconName: "FileCheck2",
    },
    {
      id: "carbon-offsetting",
      title: "Carbon Offsetting",
      content: "Projects and initiatives to offset emissions, tree plantations.",
      tag: "Regeneration",
      iconName: "TreePine",
    },
    {
      id: "decoration",
      title: "Decoration",
      content:
        "Local flowers and traditional décor by local artisans. Reusable banners.",
      tag: "Artisanal",
      iconName: "Flower2",
    },
    {
      id: "backdrops",
      title: "Backdrops",
      content: "Backdrops crafted thoughtfully by Auroville artists.",
      tag: "Local Art",
      iconName: "Palette",
    },
    {
      id: "selfie-spots",
      title: "Selfie spots",
      content:
        "Built from sustainable materials by the Auroville team and each carrying a message of awareness to action.",
      tag: "Eco Installations",
      iconName: "Camera",
    },
  ],
};
