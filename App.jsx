import { useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  priorityColor,
  priorityLabel,
  statusLabel,
  statusColor,
  escalationTone,
  handoffTone,
  timelineColor,
  priorityOrder,
  escalationProgress,
  initialPatients,
} from "./data.js";

const FILTERS = [
  ["all", "All"],
  ["red", "Urgent"],
  ["yellow", "Approaching"],
  ["gray", "Unverified"],
  ["green", "On track"],
];

function reasonText(p) {
  const items = [];
  if (p.unassigned) items.push("No owner");
  if (p.escalationStatus === "Overdue") items.push("Escalation overdue");
  if (p.repeatedDefault) items.push("Repeated default");
  if (items.length === 0) items.push("Coordination overdue");
  return items.join(" · ");
}

function Field({ label, value, color }) {
  return (
    <div className="field-row">
      <span className="field-label">{label}</span>
      <span className="field-value" style={color ? { color } : undefined}>
        {value}
      </span>
    </div>
  );
}

function Pill({ fg, bg, children }) {
  return (
    <span className="pill" style={{ color: fg, background: bg }}>
      {children}
    </span>
  );
}

export default function App() {
  const [role, setRole] = useState("cm");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState(initialPatients);
  const [selectedId, setSelectedId] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const active = useMemo(() => patients.filter((p) => !p.closed), [patients]);
  const selectedPatient = patients.find((p) => p.id === selectedId) || null;

  const updatePatient = (id, updater) =>
    setPatients((prev) => prev.map((p) => (p.id === id ? updater(p) : p)));

  const assignOwner = (id) =>
    updatePatient(id, (p) => ({
      ...p,
      owner: "Marshall Smith",
      unassigned: false,
      priority: p.priority === "gray" || p.priority === "red" ? "yellow" : p.priority,
      timeline: [...p.timeline, { label: "Owner assigned", status: "completed", time: "Just now" }],
    }));

  const documentContact = (id) =>
    updatePatient(id, (p) => ({
      ...p,
      lastContact: "Just now — contact attempt documented",
      priority: p.priority === "red" ? "yellow" : p.priority,
      overdueItems: p.overdueItems.filter((o) => !/contact|outreach/i.test(o.task)),
      timeline: [...p.timeline, { label: "Contact attempt documented", status: "completed", time: "Just now" }],
    }));

  const escalate = (id) =>
    updatePatient(id, (p) => {
      const next = escalationProgress[p.escalationStatus] || p.escalationStatus;
      return {
        ...p,
        escalationStatus: next,
        priority: next === "Acknowledged" ? "yellow" : p.priority,
        timeline: [
          ...p.timeline,
          { label: `Escalation status: ${next}`, status: next === "Acknowledged" ? "completed" : "pending", time: "Just now" },
        ],
      };
    });

  const confirmHandoff = (id) =>
    updatePatient(id, (p) => ({
      ...p,
      handoffStatus: "Acknowledged",
      timeline: [...p.timeline, { label: "Handoff acknowledged", status: "completed", time: "Just now" }],
    }));

  const resolveCase = (id) =>
    updatePatient(id, (p) => ({
      ...p,
      closed: true,
      nextAction: "Closed from transition monitoring.",
      timeline: [...p.timeline, { label: "Case closed", status: "completed", time: "Just now" }],
    }));

  const summary = useMemo(
    () => ({
      total: active.length,
      requiringAction: active.filter((p) => p.priority !== "green").length,
      overdue: active.filter((p) => p.overdueItems.length > 0).length,
      unassigned: active.filter((p) => p.unassigned).length,
    }),
    [active]
  );

  const filteredQueue = useMemo(() => {
    let list = filter === "all" ? active : active.filter((p) => p.priority === filter);
    if (search.trim()) list = list.filter((p) => p.id.toLowerCase().includes(search.trim().toLowerCase()));
    return [...list].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [filter, search, active]);

  const overdueActions = useMemo(
    () => active.flatMap((p) => p.overdueItems.map((item) => ({ ...item, patientId: p.id }))),
    [active]
  );

  const supervisorStats = useMemo(
    () => ({
      unassigned: active.filter((p) => p.unassigned).length,
      overdueEscalations: active.filter((p) => p.escalationStatus === "Overdue").length,
      repeatedDefaults: active.filter((p) => p.repeatedDefault).length,
      significantlyOverdue: overdueActions.length,
    }),
    [active, overdueActions]
  );

  const supervisorAttention = useMemo(
    () =>
      active.filter(
        (p) => p.unassigned || p.escalationStatus === "Overdue" || p.repeatedDefault || (p.priority === "red" && p.overdueItems.length > 0)
      ),
    [active]
  );

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setFilter("all");
    setSearch("");
    setSelectedId(null);
  };

  return (
    <div>
      {/* Top navigation */}
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="12" r="6" stroke="#4FA39C" strokeWidth="2" />
              <circle cx="15" cy="12" r="6" stroke="#EDEFF1" strokeOpacity="0.85" strokeWidth="2" />
            </svg>
            <span className="brand-name">Continuity</span>
            <span className="brand-sub">Care Coordination</span>
          </div>
          <div className="nav-right">
            <div className="role-tabs">
              <button
                className={`role-tab ${role === "cm" ? "active" : ""}`}
                onClick={() => handleRoleChange("cm")}
              >
                Case Manager
              </button>
              <button
                className={`role-tab ${role === "supervisor" ? "active" : ""}`}
                onClick={() => handleRoleChange("supervisor")}
              >
                Supervisor
              </button>
            </div>
            <span className="nav-user">Marshall Smith</span>
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">{role === "cm" ? "Case Manager Queue" : "Supervisor Oversight"}</h1>
          <span className="page-meta">
            Post-discharge follow-up coordination ·{" "}
            {role === "cm"
              ? `${active.length} active cases assigned to your caseload`
              : `${active.length} active cases across the team`}
          </span>
        </div>

        {role === "cm" ? (
          <div className="panel">
            {/* Stat bar */}
            <div className="stat-bar">
              <div className="stat">
                <div className="stat-value">{summary.total}</div>
                <div className="stat-label">Active cases</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: summary.requiringAction > 0 ? "var(--amber)" : "var(--ink)" }}>
                  {summary.requiringAction}
                </div>
                <div className="stat-label">Requiring action</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: summary.overdue > 0 ? "var(--red)" : "var(--ink)" }}>
                  {summary.overdue}
                </div>
                <div className="stat-label">Overdue follow-ups</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: summary.unassigned > 0 ? "var(--red)" : "var(--ink)" }}>
                  {summary.unassigned}
                </div>
                <div className="stat-label">Unassigned</div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="toolbar">
              <span className="toolbar-title">Priority Cases</span>
              <div className="toolbar-controls">
                <input
                  className="search-input"
                  placeholder="Search patient ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="filter-group">
                  {FILTERS.map(([key, label]) => (
                    <button
                      key={key}
                      className={`filter-btn ${filter === key ? "active" : ""}`}
                      onClick={() => setFilter(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Priority</th>
                    <th>Patient</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Last Contact</th>
                    <th>Next Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueue.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "24px", color: "var(--ink-faint)", fontSize: "12.5px" }}>
                        No matching cases.
                      </td>
                    </tr>
                  )}
                  {filteredQueue.map((p) => (
                    <tr
                      key={p.id}
                      className="priority-row"
                      style={{ "--row-color": priorityColor[p.priority] }}
                      onClick={() => setSelectedId(p.id)}
                    >
                      <td style={{ color: priorityColor[p.priority], fontWeight: 600 }}>{priorityLabel[p.priority]}</td>
                      <td className="td-id">{p.id}</td>
                      <td className="td-muted">{p.days}</td>
                      <td style={{ color: statusColor[p.status] }}>{statusLabel[p.status]}</td>
                      <td>
                        {p.owner ? (
                          <span className="td-muted">{p.owner}</span>
                        ) : (
                          <span>
                            <span style={{ color: "var(--red)", fontWeight: 600 }}>Unassigned</span>
                            <button
                              className="assign-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                assignOwner(p.id);
                              }}
                            >
                              Assign
                            </button>
                          </span>
                        )}
                      </td>
                      <td className="td-muted" style={{ maxWidth: "150px" }}>{p.lastContact}</td>
                      <td style={{ maxWidth: "220px" }}>{p.nextAction}</td>
                      <td className="chev">›</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Overdue actions */}
            <div className="section" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="section-title">Overdue Actions</div>
              {overdueActions.length === 0 ? (
                <div className="empty-note">None.</div>
              ) : (
                overdueActions.map((item, i) => (
                  <div className="overdue-row" key={i}>
                    <span className="overdue-task">{item.task}</span>
                    <span className="overdue-meta">
                      {item.patientId} · {item.owner}
                    </span>
                    <span className="overdue-time">{item.overdueBy}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="panel">
            <div className="stat-bar">
              <div className="stat">
                <div className="stat-value" style={{ color: supervisorStats.unassigned > 0 ? "var(--red)" : "var(--ink)" }}>
                  {supervisorStats.unassigned}
                </div>
                <div className="stat-label">Unassigned cases</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: supervisorStats.overdueEscalations > 0 ? "var(--red)" : "var(--ink)" }}>
                  {supervisorStats.overdueEscalations}
                </div>
                <div className="stat-label">Overdue escalations</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: supervisorStats.repeatedDefaults > 0 ? "var(--red)" : "var(--ink)" }}>
                  {supervisorStats.repeatedDefaults}
                </div>
                <div className="stat-label">Repeated defaults</div>
              </div>
              <div className="stat">
                <div className="stat-value" style={{ color: supervisorStats.significantlyOverdue > 0 ? "var(--amber)" : "var(--ink)" }}>
                  {supervisorStats.significantlyOverdue}
                </div>
                <div className="stat-label">Significantly overdue actions</div>
              </div>
            </div>

            <div className="toolbar">
              <span className="toolbar-title">Cases Requiring Supervisor Attention</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Issue</th>
                    <th>Owner</th>
                    <th>Escalation</th>
                    <th>Next Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {supervisorAttention.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "var(--ink-faint)", fontSize: "12.5px" }}>
                        No cases require oversight.
                      </td>
                    </tr>
                  )}
                  {supervisorAttention.map((p) => {
                    const [fg, bg] = escalationTone[p.escalationStatus];
                    return (
                      <tr key={p.id} onClick={() => setSelectedId(p.id)}>
                        <td className="td-id">{p.id}</td>
                        <td className="td-muted">{reasonText(p)}</td>
                        <td style={p.owner ? { color: "var(--ink-soft)" } : { color: "var(--red)", fontWeight: 600 }}>
                          {p.owner || "Unassigned"}
                        </td>
                        <td>
                          <Pill fg={fg} bg={bg}>{p.escalationStatus}</Pill>
                        </td>
                        <td style={{ maxWidth: "220px" }}>{p.nextAction}</td>
                        <td className="chev">›</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="footer">
          <span className="footer-note">
            Portfolio prototype · Fictional demonstration data · Not for clinical use &nbsp;·&nbsp;
            <button className="about-link" onClick={() => setAboutOpen((v) => !v)}>
              About
            </button>
          </span>
          <span className="footer-mark">Continuity</span>
        </div>
        {aboutOpen && (
          <div className="about-text">
            Continuity is a workflow prototype exploring how post-discharge coordination gaps, missed follow-ups,
            unclear ownership, and overdue escalation can be surfaced for case managers and supervisors.
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedPatient && (
        <>
          <div className="scrim open" onClick={() => setSelectedId(null)} />
          <div className="drawer" style={{ display: "block" }}>
            <DrawerContent
              patient={selectedPatient}
              role={role}
              onClose={() => setSelectedId(null)}
              onAssignOwner={assignOwner}
              onDocumentContact={documentContact}
              onEscalate={escalate}
              onConfirmHandoff={confirmHandoff}
              onResolve={resolveCase}
            />
          </div>
        </>
      )}
    </div>
  );
}

function DrawerContent({ patient: p, role, onClose, onAssignOwner, onDocumentContact, onEscalate, onConfirmHandoff, onResolve }) {
  const [efg, ebg] = escalationTone[p.escalationStatus];
  const [hfg, hbg] = handoffTone[p.handoffStatus];

  const canAssign = !p.owner;
  const canDocument = !p.closed && (p.status === "missed" || p.status === "unknown");
  const canEscalate = !p.closed && ["Required", "Overdue", "Sent", "Awaiting Acknowledgment"].includes(p.escalationStatus);
  const canHandoff = !p.closed && ["Pending Handoff", "Sent", "Unverified"].includes(p.handoffStatus);
  const canResolve = !p.closed && p.priority === "green" && p.status !== "scheduled";
  const hasActions = (role === "cm" && canAssign) || (role === "cm" && canDocument) || canEscalate || canHandoff || (role === "cm" && canResolve);

  return (
    <>
      <div className="drawer-head">
        <span className="drawer-id">{p.id}</span>
        <button className="drawer-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className="drawer-body">
        <Field label="Follow-up status" value={statusLabel[p.status]} color={statusColor[p.status]} />
        <Field label="Owner" value={p.owner || "Unassigned"} color={p.owner ? undefined : "var(--red)"} />
        <Field label="Days since discharge" value={p.days} />
        <Field label="Last contact" value={p.lastContact} />
        <Field label="Next action" value={p.nextAction} />
        <div className="field-row">
          <span className="field-label">Escalation status</span>
          <Pill fg={efg} bg={ebg}>{p.escalationStatus}</Pill>
        </div>
        {p.escalationDestination && <Field label="Escalation destination" value={p.escalationDestination} />}
        <div className="field-row" style={{ borderBottom: "none" }}>
          <span className="field-label">Handoff status</span>
          <Pill fg={hfg} bg={hbg}>{p.handoffStatus}</Pill>
        </div>

        <div className="timeline">
          <div className="timeline-title">Coordination timeline</div>
          {p.timeline.map((ev, i) => (
            <div className="tl-row" key={i}>
              <span className="tl-dot" style={{ background: timelineColor[ev.status] }} />
              <span className="tl-label">{ev.label}</span>
              <span className="tl-time">{ev.time}</span>
            </div>
          ))}
        </div>

        <div
          className="timeline-title"
          style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)", marginBottom: "8px" }}
        >
          Available actions
        </div>
        <div className="actions" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
          {role === "cm" && canAssign && (
            <button className="btn primary" onClick={() => onAssignOwner(p.id)}>Assign Owner</button>
          )}
          {role === "cm" && canDocument && (
            <button className="btn" onClick={() => onDocumentContact(p.id)}>Document Contact</button>
          )}
          {canEscalate && (
            <button className={`btn ${role === "supervisor" ? "primary" : ""}`} onClick={() => onEscalate(p.id)}>Escalate</button>
          )}
          {canHandoff && (
            <button className="btn" onClick={() => onConfirmHandoff(p.id)}>Confirm Handoff</button>
          )}
          {role === "cm" && canResolve && (
            <button className="btn" onClick={() => onResolve(p.id)}>Resolve</button>
          )}
          {!hasActions && <span style={{ fontSize: "12.5px", color: "var(--ink-faint)" }}>No open actions.</span>}
        </div>
      </div>
    </>
  );
}
