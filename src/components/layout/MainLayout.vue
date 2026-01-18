<template>
  <div class="enterprise-shell">
    <nav class="global-nav">
      <div class="nav-left">
        <div class="app-logo"><span>CORE</span>SUPPORT</div>
        <div class="nav-divider"></div>
        <div class="nav-links">
          <a href="#" class="active">Dashboard</a>
          <a href="#">Knowledge Base</a>
          <a href="#">Analytics</a>
        </div>
      </div>
      <div class="nav-right">
        <div class="user-profile">JS</div>
      </div>
    </nav>

    <div class="main-layout">
      <main class="content-pane" :class="{ 'pane-compressed': isDrawerOpen }">
        <header class="view-header">
          <div class="header-titles">
            <h1>Global Case Management</h1>
            <p>Account: Enterprise_Standard_v4</p>
          </div>
          <div class="header-actions">
            <button class="btn-refresh">⟳</button>
            <button class="btn-create" @click="openNewCase">+ CREATE NEW CASE</button>
          </div>
        </header>

        <section class="metric-row">
          <div v-for="m in stats" :key="m.label" class="metric-tile">
            <span class="m-label">{{ m.label }}</span>
            <div class="m-value-row">
              <span class="m-value">{{ m.value }}</span>
              <span class="m-trend" :class="m.status">{{ m.trend }}</span>
            </div>
          </div>
        </section>

        <div class="table-wrapper">
          <table class="robust-table">
            <thead>
              <tr>
                <th width="120">Case ID</th>
                <th>Subject</th>
                <th width="140">Priority</th>
                <th width="140">Status</th>
                <th width="180">SLA Violation</th>
                <th width="150">Last Update</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in cases" :key="ticket.id" 
                  @click="selectCase(ticket)"
                  :class="{ 'active-row': activeCase?.id === ticket.id }">
                <td class="id-col">{{ ticket.id }}</td>
                <td class="subject-col">
                  <strong>{{ ticket.subject }}</strong>
                </td>
                <td>
                  <span :class="['p-tag', ticket.priority.toLowerCase()]">{{ ticket.priority }}</span>
                </td>
                <td>
                  <span :class="['s-tag', ticket.status.toLowerCase().replace(' ', '-')]">{{ ticket.status }}</span>
                </td>
                <td>
                  <div class="sla-timer" :class="{ 'warning': ticket.atRisk }">
                    {{ ticket.atRisk ? '❗ 00:14:22' : '✅ Met' }}
                  </div>
                </td>
                <td class="date-col">{{ ticket.updated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <transition name="slide">
        <aside v-if="isDrawerOpen" class="side-drawer">
          <header class="drawer-header">
            <div class="drawer-header-top">
              <span class="case-badge">Case #{{ activeCase.id }}</span>
              <button class="btn-close" @click="closeDrawer">✕</button>
            </div>
            <h2>{{ activeCase.isNew ? 'Initialize Support Case' : activeCase.subject }}</h2>
            
            <div class="status-stepper" v-if="!activeCase.isNew">
              <div class="step complete">Opened</div>
              <div class="step-line active"></div>
              <div class="step active">Processing</div>
              <div class="step-line"></div>
              <div class="step">Resolved</div>
            </div>
          </header>

          <div class="drawer-body">
            <div v-if="activeCase.isNew" class="new-case-form">
              <div class="form-group">
                <label>Incident Subject</label>
                <input type="text" placeholder="E.g. Database connectivity failure in US-EAST-1" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Environment</label>
                  <select><option>Production</option><option>Staging</option></select>
                </div>
                <div class="form-group">
                  <label>Severity</label>
                  <select><option>High (S1)</option><option>Medium (S2)</option></select>
                </div>
              </div>
              <div class="form-group">
                <label>Description & Logs</label>
                <textarea rows="10" placeholder="Please provide exact error messages..."></textarea>
              </div>
            </div>

            <div v-else class="activity-log">
              <div v-for="msg in activeCase.messages" :key="msg.id" class="log-entry">
                <div class="log-header">
                  <span class="log-author">{{ msg.user }}</span>
                  <span class="log-time">{{ msg.time }}</span>
                </div>
                <div class="log-content">
                  <p>{{ msg.text }}</p>
                  <div v-if="msg.files" class="log-attachments">
                    <div v-for="f in msg.files" :key="f" class="file-card">
                      <span class="f-icon">📎</span>
                      <span class="f-name">{{ f }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer class="drawer-footer" v-if="!activeCase.isNew">
            <div class="composer-header">
              <button class="btn-sub active">PUBLIC REPLY</button>
              <button class="btn-sub">INTERNAL NOTE</button>
            </div>
            <textarea v-model="replyText" placeholder="Type message for support agent..."></textarea>
            <div class="footer-actions">
              <button class="btn-attach">Attach Log Files</button>
              <button class="btn-update" @click="sendReply">POST UPDATE</button>
            </div>
          </footer>
        </aside>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false);
const activeCase = ref(null);
const replyText = ref(null);

const stats = [
  { label: 'Active Incidents', value: '18', trend: '+12%', status: 'bad' },
  { label: 'SLA Compliance', value: '99.8%', trend: '+0.1%', status: 'good' },
  { label: 'Mean Time to Repair', value: '2.4h', trend: '-15%', status: 'good' }
];

const cases = ref([
  { id: 'CAS-00451', subject: 'Memory exhaustion on Kubernetes worker nodes', status: 'In Progress', priority: 'High', atRisk: true, updated: '2025-12-28 14:20', messages: [
      { id: 1, user: 'System Bot', time: '14:20', text: 'Health-check failed. Auto-escalated to SRE Team.' },
      { id: 2, user: 'Lead Engineer', time: '14:25', text: 'Collecting stack traces from namespace: production-api.' }
  ]},
  { id: 'CAS-00448', subject: 'Global API Latency: APAC Region', status: 'Resolved', priority: 'Critical', atRisk: false, updated: '2025-12-27 09:00', messages: [] }
]);

const selectCase = (ticket) => { activeCase.value = { ...ticket, isNew: false }; isDrawerOpen.value = true; };
const openNewCase = () => { activeCase.value = { id: 'NEW', isNew: true }; isDrawerOpen.value = true; };
const closeDrawer = () => { isDrawerOpen.value = false; };
const sendReply = () => { 
  if(!replyText.value) return;
  activeCase.value.messages.push({ id: Date.now(), user: 'Customer Admin', time: 'Just now', text: replyText.value });
  replyText.value = '';
};
</script>

<style scoped>
/* FONT SIZES & TYPOGRAPHY: Increased for Enterprise readability */
.enterprise-shell {
  --primary: #4f46e5;
  --bg-main: #f1f5f9;
  --text-main: #1e293b;
  --border: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-main);
  background: var(--bg-main);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* TOP NAVIGATION */
.global-nav {
  height: 48px;
  background: #0f172a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
.app-logo { font-weight: 900; letter-spacing: 1px; }
.app-logo span { color: #818cf8; }
.nav-divider { width: 1px; height: 24px; background: #334155; margin: 0 20px; }
.nav-links a { color: #94a3b8; text-decoration: none; margin-right: 20px; font-weight: 600; font-size: 13px; }
.nav-links a.active { color: white; }

.main-layout { display: flex; flex: 1; overflow: hidden; position: relative; }

/* CONTENT PANE */
.content-pane { flex: 1; padding: 32px 40px; overflow-y: auto; transition: margin-right 0.3s ease; }
.pane-compressed { margin-right: 700px; }

.view-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.view-header h1 { font-size: 24px; font-weight: 700; margin: 0; color: #0f172a; }
.view-header p { color: #64748b; font-size: 14px; margin: 4px 0 0 0; }

.btn-create { background: var(--primary); color: white; border: none; padding: 12px 24px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; }

/* METRIC TILES */
.metric-row { display: flex; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 32px; }
.metric-tile { flex: 1; background: white; padding: 20px; }
.m-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; }
.m-value { font-size: 28px; font-weight: 700; color: #0f172a; }
.m-trend { font-size: 12px; margin-left: 10px; font-weight: 600; }
.m-trend.good { color: #16a34a; }
.m-trend.bad { color: #dc2626; }

/* ROBUST TABLE */
.table-wrapper { background: white; border: 1px solid var(--border); }
.robust-table { width: 100%; border-collapse: collapse; text-align: left; }
.robust-table th { background: #f8fafc; padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 2px solid var(--border); text-transform: uppercase; }
.robust-table td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; cursor: pointer; }
.robust-table tr:hover td { background: #f1f5f9; }
.robust-table tr.active-row td { background: #e0e7ff; }

.p-tag { font-weight: 700; font-size: 11px; padding: 2px 8px; border-radius: 2px; }
.p-tag.high { background: #fee2e2; color: #991b1b; }
.p-tag.critical { background: #7f1d1d; color: white; }

.sla-timer { font-weight: 700; font-family: 'Courier New', Courier, monospace; }
.sla-timer.warning { color: #dc2626; animation: pulse 2s infinite; }

/* SIDE DRAWER (700px for desktop robustness) */
.side-drawer { 
  position: fixed; top: 48px; right: 0; bottom: 0; width: 700px; 
  background: white; border-left: 1px solid var(--border); z-index: 100;
  display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}

.drawer-header { padding: 32px; border-bottom: 1px solid var(--border); background: #f8fafc; }
.case-badge { font-weight: 700; color: var(--primary); font-size: 13px; }
.drawer-header h2 { font-size: 20px; font-weight: 800; margin: 12px 0 24px 0; color: #0f172a; }

/* STEPPER */
.status-stepper { display: flex; align-items: center; }
.step { font-size: 12px; font-weight: 700; color: #94a3b8; }
.step.active { color: var(--primary); }
.step-line { flex: 1; height: 2px; background: #e2e8f0; margin: 0 10px; }
.step-line.active { background: var(--primary); }

.drawer-body { flex: 1; overflow-y: auto; padding: 32px; }

/* ACTIVITY LOG STYLE */
.log-entry { margin-bottom: 32px; }
.log-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
.log-author { font-weight: 700; font-size: 14px; }
.log-time { color: #94a3b8; font-size: 12px; }
.log-content { padding-left: 12px; border-left: 3px solid #e2e8f0; }
.log-content p { margin: 0; color: #334155; }

/* FOOTER COMPOSER */
.drawer-footer { padding: 24px; border-top: 2px solid var(--border); }
.composer-header { display: flex; gap: 2px; margin-bottom: 12px; }
.btn-sub { border: none; padding: 8px 16px; font-size: 11px; font-weight: 700; cursor: pointer; background: #e2e8f0; }
.btn-sub.active { background: #334155; color: white; }

textarea { width: 100%; border: 1px solid var(--border); padding: 16px; font-size: 15px; outline: none; }
.footer-actions { display: flex; justify-content: space-between; margin-top: 16px; }
.btn-update { background: #0f172a; color: white; border: none; padding: 12px 24px; font-weight: 700; cursor: pointer; }

/* ANIMATION */
.slide-enter-active, .slide-leave-active { transition: right 0.3s ease; }
.slide-enter-from, .slide-leave-to { right: -700px; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>