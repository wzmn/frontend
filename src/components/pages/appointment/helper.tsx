export const colAccepList: any = {
  Waiting: [],
  Confirmed: ["Waiting", "Rescheduled"],
  Assessed: ["Confirmed"],
  Audited: ["Assessed"],
  "Snippit Audited": ["Audited", "Assessed"],
  Reassessment: ["Assessed", "Audited", "Snippit Audited"],
  Rescheduled: ["Confirmed", "Assessed", "Published"],
  Rejected: [],
  Cancelled: [],
  Installed: [],
  Published: [],
};
