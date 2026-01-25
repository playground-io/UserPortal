<script setup>
import { ref, computed } from 'vue'

// Mock Data
const tickets = ref([
  { id: 'TKT-101', subject: 'Server Latency in EU-West', status: 'Open', priority: 'High', user: 'John Doe', updated: '2m ago' },
  { id: 'TKT-102', subject: 'Billing Query: Invoice #44', status: 'Pending', priority: 'Medium', user: 'Jane Smith', updated: '1h ago' },
  { id: 'TKT-103', subject: 'New User Onboarding Help', status: 'Closed', priority: 'Low', user: 'Bob Wilson', updated: 'Yesterday' },
])

const selectedId = ref(tickets.value[0].id)
const selectedTicket = computed(() => tickets.value.find(t => t.id === selectedId.value))

const getStatusClass = (status) => {
  return {
    'status-open': status === 'Open',
    'status-pending': status === 'Pending',
    'status-closed': status === 'Closed'
  }
}
</script>

<template>
  <div class="ticket-container">
    <aside class="ticket-list">
      <div class="list-header">
        <h3>Tickets ({{ tickets.length }})</h3>
        <button class="btn-new">+ New</button>
      </div>
      
      <div 
        v-for="ticket in tickets" 
        :key="ticket.id" 
        class="ticket-item"
        :class="{ active: selectedId === ticket.id }"
        @click="selectedId = ticket.id"
      >
        <div class="item-meta">
          <span class="ticket-id">{{ ticket.id }}</span>
          <span class="ticket-time">{{ ticket.updated }}</span>
        </div>
        <p class="item-subject">{{ ticket.subject }}</p>
        <div class="item-footer">
          <span :class="['badge', getStatusClass(ticket.status)]">{{ ticket.status }}</span>
          <span class="priority-dot" :data-priority="ticket.priority"></span>
        </div>
      </div>
    </aside>

    <section class="ticket-details">
      <header class="detail-header">
        <div>
          <h2>{{ selectedTicket.subject }}</h2>
          <p>Opened by <strong>{{ selectedTicket.user }}</strong> • {{ selectedTicket.id }}</p>
        </div>
        <div class="actions">
          <button class="btn-secondary">Assign</button>
          <button class="btn-primary">Resolve</button>
        </div>
      </header>

      <div class="conversation-thread">
        <div class="message incoming">
          <div class="msg-avatar">JD</div>
          <div class="msg-content">
            <p>I've been experiencing significant lag when provisioning new nodes in the Lisbon region. Can you look into this?</p>
            <span class="msg-time">10:45 AM</span>
          </div>
        </div>

        <div class="message outgoing">
          <div class="msg-content">
            <p>Hi John, I'm investigating the EU-West-3 cluster health now. I'll update you in 10 minutes.</p>
            <span class="msg-time">10:52 AM</span>
          </div>
        </div>
      </div>

      <footer class="reply-area">
        <textarea placeholder="Type your reply..."></textarea>
        <div class="reply-actions">
          <button class="btn-primary">Send Reply</button>
        </div>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.ticket-container {
  display: flex;
  height: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

/* List Styling */
.ticket-list {
  width: 320px;
  border-right: 1px solid #e3e5e8;
  display: flex;
  flex-direction: column;
}

.list-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e5e8;
}

.ticket-item {
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f1f2;
}

.ticket-item.active {
  background: #f0f7ff;
  border-left: 4px solid #0078d4;
}

.item-subject {
  font-weight: 600;
  font-size: 14px;
  margin: 4px 0;
  color: #201f1e;
}

/* Badges */
.badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}
.status-open { background: #dff6dd; color: #107c10; }
.status-pending { background: #fff4ce; color: #797775; }

/* Detail View Styling */
.ticket-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.detail-header {
  padding: 24px;
  border-bottom: 1px solid #e3e5e8;
  display: flex;
  justify-content: space-between;
}

.conversation-thread {
  flex: 1;
  padding: 24px;
  background: #faf9f8;
  overflow-y: auto;
}

.message {
  display: flex;
  margin-bottom: 20px;
  gap: 12px;
}

.outgoing { flex-direction: row-reverse; }

.msg-content {
  max-width: 70%;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.outgoing .msg-content {
  background: #0078d4;
  color: white;
}

.reply-area {
  padding: 20px;
  border-top: 1px solid #e3e5e8;
}

textarea {
  width: 100%;
  height: 80px;
  border: 1px solid #d2d0ce;
  border-radius: 4px;
  padding: 10px;
  resize: none;
}
</style>