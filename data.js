// ---------------------------------------------------------------------------
// Constants and fictional dataset (all identifiers, timestamps, and events
// are fictional demonstration data — see App.jsx footer disclosure).
// ---------------------------------------------------------------------------

export const priorityColor = {
  red: "var(--red)",
  yellow: "var(--amber)",
  green: "var(--green)",
  gray: "var(--gray)",
};

export const priorityLabel = {
  red: "Urgent",
  yellow: "Approaching",
  green: "On track",
  gray: "Unverified",
};

export const statusLabel = {
  scheduled: "Scheduled",
  attended: "Attended",
  missed: "Missed",
  rescheduled: "Rescheduled",
  unknown: "Unknown",
};

export const statusColor = {
  scheduled: "var(--accent)",
  attended: "var(--green)",
  missed: "var(--red)",
  rescheduled: "var(--amber)",
  unknown: "var(--gray)",
};

export const escalationTone = {
  "Not Required": ["var(--gray)", "var(--gray-soft)"],
  Required: ["var(--amber)", "var(--amber-soft)"],
  Sent: ["var(--accent)", "var(--accent-soft)"],
  "Awaiting Acknowledgment": ["var(--amber)", "var(--amber-soft)"],
  Acknowledged: ["var(--green)", "var(--green-soft)"],
  Overdue: ["var(--red)", "var(--red-soft)"],
};

export const handoffTone = {
  "Not Yet Required": ["var(--gray)", "var(--gray-soft)"],
  "Pending Handoff": ["var(--amber)", "var(--amber-soft)"],
  Sent: ["var(--accent)", "var(--accent-soft)"],
  Acknowledged: ["var(--green)", "var(--green-soft)"],
  Unverified: ["var(--gray)", "var(--gray-soft)"],
};

export const timelineColor = {
  completed: "var(--green)",
  pending: "var(--accent)",
  overdue: "var(--red)",
  unverified: "var(--gray)",
};

export const priorityOrder = { red: 0, yellow: 1, gray: 2, green: 3 };

export const escalationProgress = {
  Required: "Sent",
  Overdue: "Sent",
  Sent: "Awaiting Acknowledgment",
  "Awaiting Acknowledgment": "Acknowledged",
};

export const initialPatients = [
  {
    id: "PT-2231", days: 1, status: "scheduled", owner: "Marshall Smith", lastContact: "Today, 8:40 AM", priority: "green",
    nextAction: "None. Appointment confirmed for day 4.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "Today, 7:15 AM" },
      { label: "Discharge call completed", status: "completed", time: "Today, 8:40 AM" },
      { label: "Follow-up appointment", status: "pending", time: "Day 4" },
    ],
  },
  {
    id: "PT-5804", days: 3, status: "scheduled", owner: "S. Chen", lastContact: "Yesterday, 2:15 PM", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "3 days ago" },
      { label: "Contact confirmed", status: "completed", time: "Yesterday, 2:15 PM" },
      { label: "Follow-up appointment", status: "pending", time: "Day 6" },
    ],
  },
  {
    id: "PT-1479", days: 4, status: "scheduled", owner: "R. Osei", lastContact: "2 days ago", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "4 days ago" },
      { label: "Contact confirmed", status: "completed", time: "2 days ago" },
      { label: "Follow-up appointment", status: "pending", time: "Day 7" },
    ],
  },
  {
    id: "PT-6042", days: 8, status: "scheduled", owner: "J. Kim", lastContact: "3 days ago", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "8 days ago" },
      { label: "Contact confirmed", status: "completed", time: "3 days ago" },
      { label: "Follow-up appointment", status: "pending", time: "Day 10" },
    ],
  },
  {
    id: "PT-3315", days: 6, status: "scheduled", owner: "M. Alvarez", lastContact: "1 day ago", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "6 days ago" },
      { label: "Contact confirmed", status: "completed", time: "1 day ago" },
      { label: "Follow-up appointment", status: "pending", time: "Day 9" },
    ],
  },
  {
    id: "PT-7716", days: 11, status: "scheduled", owner: "S. Chen", lastContact: "4 days ago", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "11 days ago" },
      { label: "Contact confirmed", status: "completed", time: "4 days ago" },
      { label: "Follow-up appointment", status: "pending", time: "Day 13" },
    ],
  },
  {
    id: "PT-9188", days: 5, status: "scheduled", owner: "R. Osei", lastContact: "Today, 10:05 AM", priority: "green",
    nextAction: "None. On track.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "5 days ago" },
      { label: "Contact confirmed", status: "completed", time: "Today, 10:05 AM" },
      { label: "Follow-up appointment", status: "pending", time: "Day 8" },
    ],
  },
  {
    id: "PT-4408", days: 6, status: "missed", owner: "J. Kim", lastContact: "22 hrs ago — voicemail left", priority: "yellow",
    nextAction: "Complete second contact attempt within 4 hours.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "6 days ago" },
      { label: "Appointment missed", status: "completed", time: "Flagged within 24h" },
      { label: "First contact attempt", status: "completed", time: "22 hrs ago" },
      { label: "Second contact attempt", status: "pending", time: "Due within 4 hrs" },
    ],
  },
  {
    id: "PT-6650", days: 10, status: "missed", owner: "Dr. Whitfield (outpatient)", lastContact: "Escalated 3 days ago", priority: "yellow",
    nextAction: "Confirm outpatient team completed assigned steps.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Acknowledged", escalationDestination: "Dr. Whitfield, outpatient team", handoffStatus: "Pending Handoff",
    timeline: [
      { label: "Discharged", status: "completed", time: "10 days ago" },
      { label: "Appointment missed", status: "completed", time: "Flagged on time" },
      { label: "Escalated to outpatient team", status: "completed", time: "3 days ago" },
      { label: "Outpatient acknowledgment", status: "completed", time: "Acknowledged" },
      { label: "Handoff confirmation", status: "pending", time: "Checkpoint due in 6 hrs" },
    ],
  },
  {
    id: "PT-8203", days: 5, status: "rescheduled", owner: "S. Chen", lastContact: "Yesterday — appointment rescheduled", priority: "yellow",
    nextAction: "Confirm reminder sent; monitor attendance tomorrow.", escalateTo: null, closed: false, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "5 days ago" },
      { label: "Appointment missed", status: "completed", time: "Initial miss" },
      { label: "Patient reached, rescheduled", status: "completed", time: "Yesterday" },
      { label: "Rescheduled appointment", status: "pending", time: "Tomorrow" },
    ],
  },
  {
    id: "PT-2905", days: 2, status: "unknown", owner: null, lastContact: "None documented", priority: "red",
    nextAction: "Assign case manager today; initiate contact immediately.", escalateTo: "Outpatient care team", closed: false,
    overdueItems: [{ task: "First post-discharge contact", overdueBy: "24 hrs past 48-hr threshold", owner: "Unassigned" }],
    unassigned: true, repeatedDefault: false,
    escalationStatus: "Required", escalationDestination: "Outpatient care team", handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "2 days ago" },
      { label: "First post-discharge contact", status: "overdue", time: "Past 48-hr threshold" },
      { label: "Case manager assignment", status: "unverified", time: "Not yet assigned" },
    ],
  },
  {
    id: "PT-5512", days: 9, status: "missed", owner: "R. Osei", lastContact: "3 attempts — last 26 hrs ago, unsuccessful", priority: "red",
    nextAction: "Escalate to outpatient team via backup pathway.", escalateTo: "Outpatient care team", closed: false,
    overdueItems: [{ task: "Escalation to outpatient team", overdueBy: "26 hrs past 24-hr threshold", owner: "R. Osei" }],
    unassigned: false, repeatedDefault: false,
    escalationStatus: "Overdue", escalationDestination: "Outpatient care team", handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "9 days ago" },
      { label: "Appointment missed", status: "completed", time: "6 days ago" },
      { label: "Contact attempts (3)", status: "completed", time: "Last attempt 26 hrs ago" },
      { label: "Escalation to outpatient team", status: "overdue", time: "Overdue by 26 hrs" },
    ],
  },
  {
    id: "PT-7742", days: 12, status: "missed", owner: "J. Kim", lastContact: "Missed rescheduled appointment 1 day ago", priority: "red",
    nextAction: "Escalate to consultant/outpatient review.", escalateTo: "Consultant / outpatient review", closed: false,
    overdueItems: [{ task: "Escalation after repeated default", overdueBy: "18 hrs past 24-hr threshold", owner: "J. Kim" }],
    unassigned: false, repeatedDefault: true,
    escalationStatus: "Overdue", escalationDestination: "Consultant / outpatient review", handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "12 days ago" },
      { label: "First missed appointment", status: "completed", time: "Rescheduled after outreach" },
      { label: "Rescheduled appointment missed (2nd default)", status: "overdue", time: "1 day ago" },
      { label: "Escalation to consultant/outpatient review", status: "overdue", time: "Overdue by 18 hrs" },
    ],
  },
  {
    id: "PT-3190", days: 2, status: "unknown", owner: null, lastContact: "Unverified", priority: "gray",
    nextAction: "Verify appointment status; confirm owner.", escalateTo: null, closed: false, overdueItems: [], unassigned: true, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Unverified",
    timeline: [
      { label: "Discharged", status: "completed", time: "2 days ago" },
      { label: "Appointment scheduling status", status: "unverified", time: "Not confirmed in system" },
      { label: "Case manager assignment", status: "unverified", time: "Not confirmed" },
    ],
  },
  {
    id: "PT-9081", days: 14, status: "attended", owner: "Outpatient team", lastContact: "Attended rescheduled appointment yesterday", priority: "green",
    nextAction: "Closed from transition monitoring.", escalateTo: null, closed: true, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Acknowledged",
    timeline: [
      { label: "Discharged", status: "completed", time: "14 days ago" },
      { label: "Rescheduled appointment attended", status: "completed", time: "Yesterday" },
      { label: "Ownership transferred to outpatient team", status: "completed", time: "Confirmed" },
    ],
  },
  {
    id: "PT-1102", days: 10, status: "attended", owner: "M. Alvarez", lastContact: "Attended first appointment as scheduled", priority: "green",
    nextAction: "Closed. No further action needed.", escalateTo: null, closed: true, overdueItems: [], unassigned: false, repeatedDefault: false,
    escalationStatus: "Not Required", escalationDestination: null, handoffStatus: "Not Yet Required",
    timeline: [
      { label: "Discharged", status: "completed", time: "10 days ago" },
      { label: "Appointment attended", status: "completed", time: "5 days ago" },
      { label: "Case closed", status: "completed", time: "Confirmed" },
    ],
  },
];
