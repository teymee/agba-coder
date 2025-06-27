export const APIs = {
  // 🚨 DASHBOARD
  statsAggregated: "/stats/2024",
  statSummary: "/users/current/summaries",
  statusBar: "/users/current/status_bar/today",
  goals: "/users/current/goals",
  insight:"/users/current/insights/weekdays/last_year",

  // 🚨Projects
  projectList: "/users/current/projects",
  commitList: {
    base: "/users/current/projects/commits",
    api: (projectId) => `/users/current/projects/${projectId}/commits`,
  },

  // 🚨 User 
  userDetails: "/users/current"
};
