const dataGantt = [
  {
    seqid: 1,
    Project: "Project 1",
    Squad: "ABC",
    Phase: "pre-execution",
    LanePhase: "committed",
    StartWeek: 15,
    EndWeek: 20,
  },
  {
    seqid: 2,
    Project: "Project 1",
    Squad: "ABC",
    Phase: "execution",
    LanePhase: "committed",
    StartWeek: 17,
    EndWeek: 32,
  },
  {
    seqid: 3,
    Project: "Project 1",
    Squad: "ABC",
    Phase: "system-integration",
    LanePhase: "committed",
    StartWeek: 30,
    EndWeek: 36,
  },
  {
    seqid: 4,
    Project: "Project 1",
    Squad: "ABC",
    Phase: "go-live",
    LanePhase: "committed",
    StartWeek: 33,
    EndWeek: 38,
  },
  {
    seqid: 5,
    Project: "P2",
    Squad: "ABC",
    Phase: "backlog",
    LanePhase: "conflict",
    StartWeek: 25,
    EndWeek: 36,
  },
  {
    seqid: 6,
    Project: "P2",
    Squad: "DEF",
    Phase: "backlog",
    LanePhase: "conflict",
    StartWeek: 25,
    EndWeek: 33,
  },

  {
    seqid: 7,
    Project: "P3",
    Squad: "ABC",
    Phase: "backlog",
    LanePhase: "unknown",
    StartWeek: 17,
    EndWeek: 36,
  },

  {
    seqid: 8,
    Project: "P4",
    Squad: "ABC",
    Phase: "pre-execution",
    LanePhase: "planning",
    StartWeek: 19,
    EndWeek: 35,
  },
];

const phaseLegend = [
  { phase: "backlog", color: "#b0bec5" },
  { phase: "pre-execution", color: "#b0b025" },
  { phase: "execution", color: "#66bb6a" },
  { phase: "system-integration", color: "#388e3c" },
  { phase: "go-live", color: "#113913" },
];

const lanePhaseLegend = [
  { lanePhase: "unknown", color: "rgb(176, 190, 197, 0.3)" },
  { lanePhase: "conflict", color: "rgba(255, 241, 243)" },
  { lanePhase: "committed", color: "rgba(230, 255, 230)" },
  { lanePhase: "planning", color: "rgba(250, 249, 240)" },
];
