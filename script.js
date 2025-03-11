const data = [
  {
    seqid: 1,
    Project: "P1",
    Squad: "S1",
    Phase: "Idea",
    StartWeek: 15,
    EndWeek: 20,
  },
  {
    seqid: 2,
    Project: "P1",
    Squad: "S1",
    Phase: "Build",
    StartWeek: 17,
    EndWeek: 34,
  },
  {
    seqid: 3,
    Project: "P1",
    Squad: "S1",
    Phase: "Test",
    StartWeek: 12,
    EndWeek: 18,
  },
  {
    seqid: 4,
    Project: "P2",
    Squad: "S1",
    Phase: "Idea",
    StartWeek: 25,
    EndWeek: 36,
  },
  {
    seqid: 5,
    Project: "P2",
    Squad: "S1",
    Phase: "Unknown",
    StartWeek: 25,
    EndWeek: 33,
  },
];

// Helper Functions
function getMinWeek(data) {
  let minWeek = data[0].StartWeek;
  for (let i = 1; i < data.length; i++) {
    if (data[i].StartWeek < minWeek) {
      minWeek = data[i].StartWeek;
    }
  }
  return minWeek;
}
function getMaxWeek(data) {
  let maxWeek = data[0].EndWeek;
  for (let i = 1; i < data.length; i++) {
    if (data[i].EndWeek > maxWeek) {
      maxWeek = data[i].EndWeek;
    }
  }
  return maxWeek;
}
function logTimeScale(minWeek, maxWeek, totalWeeks) {
  console.log(
    "Selected Projects run from Week " +
      minWeek +
      " to " +
      maxWeek +
      " for a total of " +
      totalWeeks +
      " weeks."
  );
}
function createTimeScale(data) {
  const maxWeek = getMaxWeek(data);
  const minWeek = getMinWeek(data);
  const totalWeeks = maxWeek - minWeek + 1;
  logTimeScale(minWeek, maxWeek, totalWeeks);
  return { minWeek, maxWeek, totalWeeks };
}
function getItemKey(item) {
  return item.Project + "_" + item.Squad + "_" + item.Phase;
}
function createLegend(minWeek, maxWeek, totalWeeks) {
  // Create legend row
  const legendRow = document.createElement("div");
  legendRow.classList.add("gantt-row");
  // Create legend label
  const legendlabel = document.createElement("div");
  legendlabel.classList.add("gantt-label");
  const legendbarContainer = document.createElement("div");
  legendbarContainer.classList.add("gantt-bar-container");
  const legendbar = document.createElement("div");
  legendbar.classList.add("gantt-bar");

  legendbarContainer.appendChild(legendbar); // bar in barContainer
  legendRow.appendChild(legendlabel); // label in row
  legendRow.appendChild(legendbarContainer); // barContainer in row
  ganttChart.appendChild(legendRow); // row in ganttChart

  // Iterate over each week to create legend items
  for (let week = minWeek; week <= maxWeek; week++) {
    const weekElement = document.createElement("div");
    weekElement.classList.add("gantt-week");
    weekElement.textContent = week;
    weekElement.style.flex = `1 1 ${100 / totalWeeks}%`;
    legendbarContainer.appendChild(weekElement);
  }
}
function renderGanttChart() {
  const ganttChart = document.getElementById("ganttChart");
  ganttChart.innerHTML = ""; // Clear previous content
  // Create timescale
  const { minWeek, maxWeek, totalWeeks } = createTimeScale(data);
  // Call createLegend function
  createLegend(minWeek, maxWeek, totalWeeks);

  // Iterate over each item in the data to create rows
  data.forEach((item) => {
    const row = document.createElement("div");
    row.id = getItemKey(item);
    row.classList.add("gantt-row");

    const label = document.createElement("div");
    label.classList.add("gantt-label");
    label.textContent = item.Project;

    const barContainer = document.createElement("div");
    barContainer.classList.add("gantt-bar-container");

    const bar = document.createElement("div");
    bar.classList.add("gantt-bar");

    // Calculate position and width of the bar
    const startOffset = ((item.StartWeek - minWeek) / totalWeeks) * 100;
    const duration = ((item.EndWeek - item.StartWeek + 1) / totalWeeks) * 100;

    // Update style with calculated values
    bar.style.left = startOffset + "%";
    bar.style.width = duration + "%";
    bar.textContent = getItemKey(item);

    // Create Nested Structure
    barContainer.appendChild(bar); // bar in barContainer
    row.appendChild(label); // label in row
    row.appendChild(barContainer); // barContainer in row
    ganttChart.appendChild(row); // row in ganttChart
  });
}

renderGanttChart();

console.log(data);
