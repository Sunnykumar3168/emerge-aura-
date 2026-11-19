export interface AgendaSession {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  dotColor: string; // Vibrant logo spectrum color
  accentBg: string; // Subtle light gradient color
  iconName:
    | "UserCheck"
    | "Sparkles"
    | "Store"
    | "Users2"
    | "Presentation"
    | "Music"
    | "Utensils"
    | "Landmark"
    | "Trophy"
    | "Briefcase"
    | "Sprout"
    | "Medal"
    | "Flag";
}

export interface AgendaDay {
  dayId: string;
  dayBadge: string;
  dayPillColor: string; // Pill color theme
  tag: string;
  date: string;
  weekday: string;
  sessions: AgendaSession[];
}

export const agendaScheduleData: AgendaDay[] = [
  {
    dayId: "day-1",
    dayBadge: "DAY 01",
    dayPillColor: "from-[#FF7A00] to-[#E53935]",
    tag: "MERGE",
    weekday: "Saturday",
    date: "5 December 2026",
    sessions: [
      {
        id: "d1-s1",
        time: "08:00",
        title: "Registration",
        subtitle: "Badges and delegate kits",
        dotColor: "#E53935", // Red
        accentBg: "#E53935",
        iconName: "UserCheck",
      },
      {
        id: "d1-s2",
        time: "09:30",
        title: "Inauguration",
        subtitle: "Chief Guest: Joint Secretary, DPIIT",
        dotColor: "#FB8C00", // Orange
        accentBg: "#FB8C00",
        iconName: "Sparkles",
      },
      {
        id: "d1-s3",
        time: "10:45",
        title: "Startup Showcase opens",
        subtitle: "60 stalls and desks, open till 18:00",
        dotColor: "#F59E0B", // Gold / Yellow
        accentBg: "#F59E0B",
        iconName: "Store",
      },
      {
        id: "d1-s4",
        time: "11:30",
        title: "Impact talks, B2B and CSR roundtables",
        subtitle: "Plus a workshop on Indian Knowledge Systems",
        dotColor: "#84CC16", // Lime Green
        accentBg: "#84CC16",
        iconName: "Users2",
      },
      {
        id: "d1-s5",
        time: "14:00",
        title: "Panels, PitchFest, consulate roundtable",
        subtitle: "Auroville enterprise tours and open mic",
        dotColor: "#10B981", // Emerald / Green
        accentBg: "#10B981",
        iconName: "Presentation",
      },
      {
        id: "d1-s6",
        time: "17:30",
        title: "Rhythmic Energy in concert",
        subtitle: "Sponsor address: PMC Tech",
        dotColor: "#0284C7", // Sky Blue
        accentBg: "#0284C7",
        iconName: "Music",
      },
      {
        id: "d1-s7",
        time: "19:30",
        title: "Networking dinner",
        subtitle: "Light music under the tree",
        dotColor: "#E11D48", // Pink / Rose
        accentBg: "#E11D48",
        iconName: "Utensils",
      },
    ],
  },
  {
    dayId: "day-2",
    dayBadge: "DAY 02",
    dayPillColor: "from-[#0284C7] to-[#2563EB]",
    tag: "EMERGE",
    weekday: "Sunday",
    date: "6 December 2026",
    sessions: [
      {
        id: "d2-s1",
        time: "08:30",
        title: "Registration",
        subtitle: "Startup Showcase open 09:30–15:30",
        dotColor: "#F43F5E", // Rose Red
        accentBg: "#F43F5E",
        iconName: "UserCheck",
      },
      {
        id: "d2-s2",
        time: "09:30",
        title: "Government as Enabler for Mindful Business",
        subtitle: "Industry keynote, Office of the PSA, state governments",
        dotColor: "#EA580C", // Deep Orange
        accentBg: "#EA580C",
        iconName: "Landmark",
      },
      {
        id: "d2-s3",
        time: "11:00",
        title: "Ananda Vikatan Awards",
        subtitle: "Followed by networking tea",
        dotColor: "#EAB308", // Amber Yellow
        accentBg: "#EAB308",
        iconName: "Trophy",
      },
      {
        id: "d2-s4",
        time: "11:30",
        title: "Puducherry innovation panel, PitchFest, CSR roundtable",
        subtitle: "Investors and CSR heads in the room",
        dotColor: "#84CC16", // Lime Green
        accentBg: "#84CC16",
        iconName: "Briefcase",
      },
      {
        id: "d2-s5",
        time: "14:00",
        title: "Impact talk, incubators panel, consulate roundtable",
        subtitle: "Investors, incubators and founders convening",
        dotColor: "#10B981", // Emerald Green
        accentBg: "#10B981",
        iconName: "Sprout",
      },
      {
        id: "d2-s6",
        time: "15:15",
        title: "EMERGE for Good winners",
        subtitle: "Innovation Challenge teams present their MVPs",
        dotColor: "#0284C7", // Cyan / Blue
        accentBg: "#0284C7",
        iconName: "Medal",
      },
      {
        id: "d2-s7",
        time: "15:45",
        title: "Valedictory",
        subtitle: "LoI and MoU signing · National Anthem",
        dotColor: "#7C3AED", // Violet / Purple
        accentBg: "#7C3AED",
        iconName: "Flag",
      },
    ],
  },
];
