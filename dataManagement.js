function filterGanttData(dataGantt) {
  filteredGanttData = dataGantt;
  let squad = localStorage.getItem("squadSelect");
  let project = localStorage.getItem("projectSelect");
  if (squad !== "All") {
    filteredGanttData = filteredGanttData.filter(
      (item) => item.Squad === squad
    );
  }
  if (project !== "All") {
    filteredGanttData = filteredGanttData.filter(
      (item) => item.Project === project
    );
  }
  return filteredGanttData;
}
