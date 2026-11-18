export interface ImmersionExperience {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: "Palette" | "Footprints" | "Sparkles" | "Compass" | "Sun";
}

export interface ImmersionData {
  eyebrow: string;
  heading: string;
  subheading: string;
  experiences: ImmersionExperience[];
}

export const immersionData: ImmersionData = {
  eyebrow: "AUROVILLE EXPERIENCES",
  heading: "Immersion",
  subheading: "Slow down and unwind with experiences in and around Auroville.",
  experiences: [
    {
      id: "workshops",
      title: "Workshops",
      description: "Small-group, hands-on workshops alongside the conclave.",
      tag: "Interactive & Creative",
      iconName: "Palette",
    },
    {
      id: "nature-walks",
      title: "Nature walks",
      description: "Guided walks through Auroville's green spaces.",
      tag: "Eco & Forest",
      iconName: "Footprints",
    },
    {
      id: "meditation",
      title: "Meditation",
      description: "Guided sessions for quiet reflection between the two days.",
      tag: "Mindfulness",
      iconName: "Sparkles",
    },
    {
      id: "auro-tour",
      title: "Auro tour",
      description: "A guided tour of Auroville",
      tag: "Heritage & Vision",
      iconName: "Compass",
    },
    {
      id: "yoga",
      title: "Yoga",
      description: "Morning yoga",
      tag: "Wellness",
      iconName: "Sun",
    },
  ],
};
