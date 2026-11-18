export interface KeyVertical {
  id: string;
  number: string;
  title: string;
  badge: string;
  description: string;
}

export interface StoryBlock {
  number: string;
  label: string;
  paragraph: string;
}

export interface AboutContentData {
  eyebrow: string;
  mainHeading: {
    line1: string;
    line2: string;
  };
  storyBlocks: StoryBlock[];
  keyVerticals: KeyVertical[];
  floatingStatement: {
    small: string;
    medium: string;
    largePrefix: string;
    largeAccent: string;
    largeSuffix?: string;
  };
  eventInfo: {
    date: {
      days: string;
      monthYear: string;
    };
    venue: {
      title: string;
      subtitle: string;
    };
    purpose: string;
  };
}

export const aboutData: AboutContentData = {
  eyebrow: "ABOUT",
  mainHeading: {
    line1: "ABOUT",
    line2: "EMERGE AURO",
  },
  storyBlocks: [
    {
      number: "01",
      label: "THE IDEA",
      paragraph:
        "EMERGE AURO is Bharat's first Conscious Capital Conclave — three days that place startup founders at the centre, surround them with serious capital and policy architecture, and ground the whole thing in Auroville's fifty-year practice of human unity and ecological stewardship.",
    },
    {
      number: "02",
      label: "THE CHALLENGE",
      paragraph:
        "The hardest problems on the planet are being worked on right now by founders. Climate breakdown, food insecurity, broken health systems, polluted oceans, fractured communities. EMERGE exists to give those founders what they most lack: capital, connections, and a room where the people holding the cheque book already believe in the premise.",
    },
  ],
  keyVerticals: [
    {
      id: "psa",
      number: "01",
      title: "Office of the PSA",
      badge: "PSA",
      description:
        "Learn about the programmes and initiatives of the Office of the Principal Scientific Adviser, and how founders, institutions and industry can engage with them.",
    },
    {
      id: "b2b",
      number: "02",
      title: "B2B Networking",
      badge: "B2B",
      description:
        "Structured round-table rotations that match startups and MSMEs with corporates and buyers. Built for business conversations, not just card exchanges.",
    },
    {
      id: "csr-consulates",
      number: "03",
      title: "CSR and Consulates",
      badge: "CSR & Consulates",
      description:
        "CSR heads and consulate representatives meet incubators, impact startups and institutions in focused round tables, working towards project sanctions and MoUs.",
    },
    {
      id: "startups",
      number: "04",
      title: "Startups Pitching and Showcase",
      badge: "Startups & Showcase",
      description:
        "Startups exhibit at the Startup Showcase, and shortlisted teams pitch to investors at PitchFest. Visibility, investor access and connections across two days.",
    },
  ],
  floatingStatement: {
    small: "NOT AN EXPO.",
    medium: "NOT A PITCH COMPETITION.",
    largePrefix: "A WORKING LABORATORY OF ",
    largeAccent: "CONSCIOUS COMMERCE.",
  },
  eventInfo: {
    date: {
      days: "28 Oct, 5–6 Dec",
      monthYear: "2026",
    },
    venue: {
      title: "PONDICHERRY UNIVERSITY",
      subtitle: "& AUROVILLE",
    },
    purpose:
      "Three days bringing founders, investors, institutions and student innovators together to turn conscious capital into commitments.",
  },
};
