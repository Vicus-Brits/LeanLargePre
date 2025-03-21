//SELECTED DATA
let dataGanttChart = dataGantt;

// MANAGE DROPDOWNS
function setGanttDefaults() {
  // run onload to set localStorage value
  if (localStorage.getItem("squadSelect") === null) {
    localStorage.setItem("squadSelect", "All");
  }
  if (localStorage.getItem("projectSelect") === null) {
    localStorage.setItem("projectSelect", "All");
  }
  const squadSelect = document.getElementById("squadSelect");
  const projectSelect = document.getElementById("projectSelect");
  const squad = localStorage.getItem("squadSelect");
  const project = localStorage.getItem("projectSelect");
  squadSelect.value = squad;
  projectSelect.value = project;
}
function setGanttLatestDropdownSelect() {
  // set dropdown to the localStorage value
  if (localStorage.getItem("squadSelect") === null) {
    localStorage.setItem("squadSelect", "All");
  }
  if (localStorage.getItem("projectSelect") === null) {
    localStorage.setItem("projectSelect", "All");
  }
  const squadSelect = document.getElementById("squadSelect");
  const projectSelect = document.getElementById("projectSelect");
  const squad = localStorage.getItem("squadSelect");
  const project = localStorage.getItem("projectSelect");
  squadSelect.value = squad;
  projectSelect.value = project;
}
function populateGanttDropdowns(dataGantt) {
  const squads = [...new Set(dataGantt.map((item) => item.Squad))];
  console.log("Squads: " + squads);
  const squadSelect = document.getElementById("squadSelect");
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";
  squadSelect.appendChild(allOption);
  squads.forEach((squad) => {
    const option = document.createElement("option");
    option.value = squad;
    option.textContent = squad;
    squadSelect.appendChild(option);
  });

  const projects = [...new Set(dataGantt.map((item) => item.Project))];
  console.log("Projects: " + projects);
  const projectSelect = document.getElementById("projectSelect");
  const allProjectOption = document.createElement("option");
  allProjectOption.value = "All";
  allProjectOption.textContent = "All";
  projectSelect.appendChild(allProjectOption);
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    projectSelect.appendChild(option);
  });
}
function changeGanttDropdowns(id, value) {
  localStorage.setItem(id, value);
  console.log(value, id);

  renderGanttChart();
}
// MANAGE GANTT DATA
function renderGanttChart() {
  dataGanttChart = filterGanttData(dataGantt);
  const ganttChart = document.getElementById("ganttChart");
  ganttChart.innerHTML = ""; // Clear previous content
  // Create timescale
  const { minWeek, maxWeek, totalWeeks } = createTimeScale(dataGanttChart);
  // Call createLegend function
  createLegend(minWeek, maxWeek, totalWeeks);

  // Iterate over each item in the data to create rows
  dataGanttChart.forEach((item) => {
    const row = document.createElement("div");
    row.id = getItemKey(item);
    row.classList.add("gantt-row");

    const label = document.createElement("div");
    label.classList.add("gantt-label");
    label.textContent = item.Project + " - " + item.Squad;

    const barContainer = document.createElement("div");
    barContainer.classList.add("gantt-bar-container");
    barContainer.classList.add("lane-phase-" + item.LanePhase);

    const bar = document.createElement("div");
    bar.classList.add("gantt-bar");
    bar.classList.add("phase-" + item.Phase);

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

// RENDER CHART ELEMENTS
function getMinWeek(dataGanttChart) {
  let minWeek = dataGanttChart[0].StartWeek;
  for (let i = 1; i < dataGanttChart.length; i++) {
    if (dataGanttChart[i].StartWeek < minWeek) {
      minWeek = dataGanttChart[i].StartWeek;
    }
  }
  return minWeek;
}
function getMaxWeek(dataGanttChart) {
  let maxWeek = dataGanttChart[0].EndWeek;
  for (let i = 1; i < dataGanttChart.length; i++) {
    if (dataGanttChart[i].EndWeek > maxWeek) {
      maxWeek = dataGanttChart[i].EndWeek;
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
function createTimeScale(dataGantt) {
  const maxWeek = getMaxWeek(dataGantt);
  const minWeek = getMinWeek(dataGantt);
  const totalWeeks = maxWeek - minWeek + 1;
  logTimeScale(minWeek, maxWeek, totalWeeks);
  return { minWeek, maxWeek, totalWeeks };
}
function getItemKey(item) {
  return item.Project + " - " + item.Squad;
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
function renderPhaseLegend() {
  const phaseLegendContainer = document.getElementById("phaseLegend");
  const legendStart = document.createElement("div");
  legendStart.textContent = "PROJECT PHASE---";
  phaseLegendContainer.appendChild(legendStart);
  phaseLegend.forEach((phase) => {
    const legendItem = document.createElement("div");
    legendItem.classList.add("phase-legend-item");

    const colorBox = document.createElement("div");
    colorBox.classList.add("phase-legend-color");
    colorBox.style.backgroundColor = phase.color;

    const label = document.createElement("span");
    label.textContent = phase.phase;

    legendItem.appendChild(colorBox);
    legendItem.appendChild(label);
    phaseLegendContainer.appendChild(legendItem);
  });
}
function renderLaneStatusLegend() {
  const laneStatusLegendContainer = document.getElementById("laneStatusLegend");
  const laneStatuslegendStart = document.createElement("div");
  laneStatuslegendStart.textContent = "LANE STATUS---";
  laneStatusLegendContainer.appendChild(laneStatuslegendStart);

  lanePhaseLegend.forEach((lanePhase) => {
    const legendItem = document.createElement("div");
    legendItem.classList.add("phase-legend-item");

    const colorBox = document.createElement("div");
    colorBox.classList.add("phase-legend-color");
    colorBox.style.backgroundColor = lanePhase.color;

    const label = document.createElement("span");
    label.textContent = lanePhase.lanePhase;

    legendItem.appendChild(colorBox);
    legendItem.appendChild(label);
    laneStatusLegendContainer.appendChild(legendItem);
  });
}

//ON-LOAD REFRESH
document.addEventListener("DOMContentLoaded", () => {
  setGanttDefaults();
  populateGanttDropdowns(dataGantt);
  setGanttLatestDropdownSelect();
  renderGanttChart();
});
