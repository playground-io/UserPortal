<script>
// ===================================================================
// 0. STATIC CONFIGURATION (Module Level)
// ===================================================================
// We define static constants outside the <script setup> block.
// This prevents these objects from being re-created every time the
// component is mounted, saving memory and improving initialization performance.

/**
 * Theme definitions mapping logical names to specific hex colors.
 * These are applied as CSS Custom Properties (variables) on the root element.
 * @constant {Object}
 */
const THEMES = {
  light: {
    '--bg-primary': '#ffffff', // Main card background
    '--bg-secondary': '#f7f7f7', // Page/Wrapper background
    '--bg-header': '#3f51b5', // Table header background (Indigo)
    '--text-header-title': '#ffffff', // Header title text color
    '--text-default': '#444444', // Main body text
    '--text-subtle': '#999999', // Secondary/Placeholder text
    '--table-bg-odd': '#fafafa', // Zebra striping: Odd rows
    '--table-bg-hover': '#e0e0e0', // Row hover state
    '--table-header-bg': '#f5f5f5', // Sticky header background
    '--table-sorted-bg': '#e8eaf6', // Background for the currently sorted column
    '--border-color': '#eeeeee', // Borders for rows/inputs
    '--accent-color': '#3f51b5', // Active elements (Icons, Focus rings)
    '--cancel-bg': '#ef5350', // Danger actions
    /* Fixed Theme Variables */
    '--status-success': '#4caf50',
    '--status-info': '#2196f3',
    '--status-warning': '#ff9800',
    '--status-danger': '#f44336',
    '--sort-icon-size': '14px',
    '--filter-icon-size': '16px',
  },
  dark: {
    '--bg-primary': '#212121',
    '--bg-secondary': '#121212',
    '--bg-header': '#6200EE',
    '--text-header-title': '#ffffff',
    '--text-default': '#e0e0e0',
    '--text-subtle': '#bdbdbd',
    '--table-bg-odd': '#2c2c2c',
    '--table-bg-hover': '#3a3a3a',
    '--table-header-bg': '#2c2c2c',
    '--table-sorted-bg': '#424242',
    '--border-color': '#424242',
    '--accent-color': '#bb86fc',
    '--cancel-bg': '#cf6679',
    /* Fixed Theme Variables */
    '--status-success': '#4caf50',
    '--status-info': '#2196f3',
    '--status-warning': '#ff9800',
    '--status-danger': '#f44336',
    '--sort-icon-size': '14px',
    '--filter-icon-size': '16px',
  },
}

/**
 * Configuration for table columns.
 * Defines the mapping between data keys and display properties.
 * @constant {Array<Object>}
 * @property {string} value - The key in the data object (e.g., 'price').
 * @property {string} text - The header label to display.
 * @property {boolean} [sortable=true] - If false, sorting is disabled for this column.
 * @property {'left'|'center'|'right'} [justify='left'] - Text alignment.
 */
const HEADER_CONFIG = [
  { value: 'requestId', text: 'REQUESTID', sortable: true, justify: 'center' },
  { value: 'serviceType', text: 'SERVICETYPE', sortable: true, justify: 'center' },
  { value: 'requestSummary', text: 'REQUESTSUMMARY', sortable: true, justify: 'center' },
  { value: 'status', text: 'STATUS', sortable: true, justify: 'center' },
  { value: 'completion', text: 'COMPLETION', sortable: true, justify: 'center' },
  { value: 'requestedOn', text: 'REQUESTEDON', sortable: true, justify: 'center' },
  { value: 'targetName', text: 'TARGETNAME', sortable: true, justify: 'center' },
  { value: 'currentStage', text: 'CURRENTSTAGE', sortable: true, justify: 'center' },
  { value: 'requestedBy', text: 'REQUESTEDBY', sortable: true, justify: 'center' },
  { value: 'timeToCompletion', text: 'TIMETOCOMPLETION', sortable: true, justify: 'center' },
  { value: 'outputResult', text: 'OUTPUTRESULT', sortable: true, justify: 'center' },
  { value: 'linkedResources', text: 'LINKEDRESOURCES', sortable: true, justify: 'center' },
  { value: 'errorMessage', text: 'ERRORMESSAGE', sortable: true, justify: 'center' },
  { value: 'fullLogOutput', text: 'FULLLOGOUTPUT', sortable: true, justify: 'center' },
  { value: 'workflowPath', text: 'WORKFLOWPATH', sortable: true, justify: 'center' },
  { value: 'lastUpdated', text: 'LASTUPDATED', sortable: true, justify: 'center' },
]

/**
 * Initial dataset to be used if no external data is provided via props.
 * This is now declared as a constant and passed into a ref in setup.
 * @constant {Array<Object>}
 */
const INITIAL_ITEMS = [
  {
    requestId: 'VM-20241105-001',
    serviceType: 'VM Deployment',
    requestSummary: 'Provision Production Web Server (EU)',
    status: 'Complete',
    completion: 75,
    requestedOn: '2024-11-05T09:30:00Z',
    targetName: 'prod-web-eu-01',
    currentStage: 'Verification & Handoff',
    requestedBy: 'alice.johnson@corp.com',
    timeToCompletion: '0 minutes (Completed)',
    outputResult: 'VM IP: 10.15.2.14, Access Key issued.',
    linkedResources: 'https://console.cloud.corp/vm/prod-web-eu-01',
    errorMessage: null,
    fullLogOutput: 'Successfully deployed VM using Terraform v1.1.2. Firewall rules applied.',
    workflowPath: 'DeployVM-Prod-Europe',
    lastUpdated: '2024-11-05T09:42:15Z',
  },
  {
    requestId: 'NW-20241105-002',
    serviceType: 'Network Change',
    requestSummary: 'Open Port 443 for Payment Gateway',
    status: 'Failed',
    completion: 75,
    requestedOn: '2024-11-05T10:15:00Z',
    targetName: 'SecGroup-Payments',
    currentStage: 'Applying Policy Changes',
    requestedBy: 'bob.brown@corp.com',
    timeToCompletion: 'N/A',
    outputResult: 'Policy update failed.',
    linkedResources: 'https://jira.corp/TICKET-589',
    errorMessage:
      'Validation Error: Policy requires approval from Network Admin before deployment.',
    fullLogOutput: 'Pre-flight check failed. Policy violation detected. Exit code 403.',
    workflowPath: 'NetworkPolicy-Update',
    lastUpdated: '2024-11-05T10:16:30Z',
  },
  {
    requestId: 'ST-20241105-003',
    serviceType: 'Storage Provisioning',
    requestSummary: 'Expand Analytics DB Storage to 5TB',
    status: 'In Progress',
    completion: 75,
    requestedOn: '2024-11-05T11:00:00Z',
    targetName: 'analytics-db-disk',
    currentStage: 'Resizing Disk Volume',
    requestedBy: 'charlie.davis@corp.com',
    timeToCompletion: 'Estimated 5 minutes',
    outputResult: 'Volume resizing initiated.',
    linkedResources: 'https://storage.corp/vol/analytics-db-disk',
    errorMessage: null,
    fullLogOutput: 'Resizing initiated successfully. Monitoring growth rate...',
    workflowPath: 'Storage-Resize-Standard',
    lastUpdated: '2024-11-05T11:03:00Z',
  },
  {
    requestId: 'VM-20241105-004',
    serviceType: 'VM Deployment',
    requestSummary: 'Test Environment for API V3',
    status: 'Cancelled',
    completion: 75,
    requestedOn: '2024-11-05T12:45:00Z',
    targetName: 'test-api-v3',
    currentStage: 'Initial Queuing',
    requestedBy: 'diana.evans@corp.com',
    timeToCompletion: 'N/A',
    outputResult: 'Request manually cancelled by requester.',
    linkedResources: null,
    errorMessage: 'Cancelled by user.',
    fullLogOutput: 'Request queued, but cancelled before execution began.',
    workflowPath: 'DeployVM-Test-Standard',
    lastUpdated: '2024-11-05T12:46:10Z',
  },
  {
    requestId: 'TK-20241105-005',
    serviceType: 'Open Ticket',
    requestSummary: 'Report: Slow VPN Connection',
    status: 'Pending Support',
    completion: 75,
    requestedOn: '2024-11-05T14:00:00Z',
    targetName: 'IT Support Team',
    currentStage: 'Assignment to Tier 1',
    requestedBy: 'frank.green@corp.com',
    timeToCompletion: 'SLA: 1 Hour for initial response',
    outputResult: 'Ticket created successfully.',
    linkedResources: 'https://servicedesk.corp/TICKET-1903',
    errorMessage: null,
    fullLogOutput: 'Ticket submitted to the Service Desk queue.',
    workflowPath: 'ServiceDesk-Intake',
    lastUpdated: '2024-11-05T14:00:45Z',
  },
  {
    requestId: 'ST-20241105-006',
    serviceType: 'Storage Provisioning',
    requestSummary: 'Create S3 Bucket for Log Archive',
    status: 'Complete',
    completion: 75,
    requestedOn: '2024-11-05T15:35:00Z',
    targetName: 'log-archive-2024-s3',
    currentStage: 'Finalizing Permissions',
    requestedBy: 'grace.hall@corp.com',
    timeToCompletion: '0 minutes (Completed)',
    outputResult: 'Bucket ARN: arn:aws:s3::log-archive-2024',
    linkedResources: 'https://console.cloud.corp/s3/log-archive-2024-s3',
    errorMessage: null,
    fullLogOutput: 'Bucket created. Encryption and lifecycle policies applied.',
    workflowPath: 'S3-Bucket-Standard',
    lastUpdated: '2024-11-05T15:37:12Z',
  },
  {
    requestId: 'VM-20241105-007',
    serviceType: 'VM Deployment',
    requestSummary: 'High-Mem Test Server for QA',
    status: 'Pending Approval',
    completion: 75,
    requestedOn: '2024-11-05T16:10:00Z',
    targetName: 'qa-mem-test-05',
    currentStage: 'Awaiting Financial Approval',
    requestedBy: 'ivan.jones@corp.com',
    timeToCompletion: 'Estimated 24 hours (Approval SLA)',
    outputResult: 'Pending Cost Center review.',
    linkedResources: 'https://approval.corp/request/109',
    errorMessage: null,
    fullLogOutput: 'Resource exceeds standard budget threshold. Routing to approver.',
    workflowPath: 'DeployVM-Test-HighCost',
    lastUpdated: '2024-11-05T16:10:00Z',
  },
  {
    requestId: 'NW-20241105-008',
    serviceType: 'Network Change',
    requestSummary: 'Assign Floating IP to Staging Load Balancer',
    status: 'In Progress',
    completion: 75,
    requestedOn: '2024-11-06T08:00:00Z',
    targetName: 'stg-load-balancer-01',
    currentStage: 'DNS Record Update',
    requestedBy: 'kevin.lee@corp.com',
    timeToCompletion: 'Estimated 15 minutes',
    outputResult: 'Floating IP assigned.',
    linkedResources: 'https://console.cloud.corp/lb/stg-load-balancer-01',
    errorMessage: null,
    fullLogOutput: 'IP allocated and attached. Propagation pending.',
    workflowPath: 'Network-FloatingIP-Assign',
    lastUpdated: '2024-11-06T08:05:20Z',
  },
  {
    requestId: 'TK-20241105-009',
    serviceType: 'Open Ticket',
    requestSummary: 'New Access Request: HR System',
    status: 'Complete',
    completion: 75,
    requestedOn: '2024-11-06T09:30:00Z',
    targetName: 'User: laura.martin@corp.com',
    currentStage: 'Final Handoff',
    requestedBy: 'laura.martin@corp.com',
    timeToCompletion: '0 minutes (Completed)',
    outputResult: 'Access granted. Confirmation email sent.',
    linkedResources: 'https://servicedesk.corp/TICKET-1904',
    errorMessage: null,
    fullLogOutput: 'Access request approved by manager and fulfilled by automation.',
    workflowPath: 'Access-Request-Standard',
    lastUpdated: '2024-11-06T09:31:50Z',
  },
  {
    requestId: 'ST-20241105-010',
    serviceType: 'Storage Provisioning',
    requestSummary: 'Migrate Old File Share to Archive Tier',
    status: 'Failed',
    completion: 75,
    requestedOn: '2024-11-06T10:50:00Z',
    targetName: 'fileshare-old-project',
    currentStage: 'Data Transfer',
    requestedBy: 'mike.nelson@corp.com',
    timeToCompletion: 'N/A',
    outputResult: 'Transfer failed after 20% completion.',
    linkedResources: null,
    errorMessage: 'Storage Quota Exceeded: Archive tier capacity is full. Cannot transfer 5TB.',
    fullLogOutput:
      'Data transfer aborted at 20% due to destination capacity constraint. Check available space.',
    workflowPath: 'Storage-Archive-Migrate',
    lastUpdated: '2024-11-06T11:20:00Z',
  },
]
</script>

<script setup>
import { ref, shallowRef, computed, watch, onUnmounted } from 'vue'
import SvgToIcon from '../core/SvgToIcon.vue'

import { onMounted } from 'vue'

const state = ref({
  count: 0,
})

const cpuUsage = ref(0)
let timer = null

onMounted(() => {
  console.log('Monitor started: Connecting to server...')

  // 1. Start a timer to fetch data every 2 seconds
  timer = setInterval(() => {
    cpuUsage.value = Math.floor(Math.random() * 100)
  }, 2000)
})

onUnmounted(() => {
  console.log('Monitor stopped: Cleaning up resources.')

  // 2. CRITICAL: Stop the timer so it doesn't run in the background forever
  clearInterval(timer)
})

// ===================================================================
// 1. COMPONENT PROPS (Robustness)
// ===================================================================

/**
 * Defines the public interface of the component.
 * Allows external data and configuration to be passed in.
 */
const props = defineProps({
  /** Array of data items to display in the table. */
  data: {
    type: Array,
    default: () => INITIAL_ITEMS, // Use the static data as default
  },
  /** Array of column configurations (optional, uses HEADER_CONFIG if null). */
  headers: {
    type: Array,
    default: () => HEADER_CONFIG,
  },
  /** Initial theme mode. */
  initialDark: {
    type: Boolean,
    default: false,
  },
})

// ===================================================================
// 2. STATE MANAGEMENT
// ===================================================================

/**
 * The main data set, initialized from props.data.
 * OPTIMIZATION: Uses `shallowRef` to avoid deep reactivity overhead on large lists.
 */
const items = shallowRef(props.data)

// Reactive references for UI state
const currentHeaders = ref(props.headers) // Renamed for clarity vs. prop name
const sortKey = ref('id') // The ID of the column currently being sorted
const sortDir = ref('asc') // 'asc' or 'desc'
const filters = ref({}) // Map of active filters: { columnId: "search text" }
const activeFilterKey = ref(null) // Tracks which column filter dropdown is visible
const isDark = ref(props.initialDark) // Toggles between Light/Dark mode
const filterTimers = new Map() // Stores debounce timers to prevent rapid updates

// ===================================================================
// 3. COMPUTED PROPERTIES (Logic Separation & Efficiency)
// ===================================================================

/**
 * Filtered Dataset.
 * OPTIMIZATION: Separates filtering (O(N)) from sorting (O(N log N)).
 * Only re-runs when `items` or `filters` change.
 */
const filteredItems = computed(() => {
  const activeFilterKeys = Object.keys(filters.value)

  // Fast path: if no filters, return a shallow copy of original items
  if (activeFilterKeys.length === 0) return items.value.slice() // Use slice() for shallow copy

  // Filter logic: Item must match ALL active filters (AND condition)
  return items.value.filter((item) => {
    return activeFilterKeys.every((key) => {
      const filterText = filters.value[key]
      // Use optional chaining and nullish coalescing for safe access/default
      const itemValue = String(item?.[key] ?? '').toLowerCase()
      return itemValue.includes(filterText)
    })
  })
})

/**
 * Sorted Dataset.
 * Derived from `filteredItems`. Re-runs only when filter results change
 * or sort state changes (`sortKey`, `sortDir`).
 */
const sortedItems = computed(() => {
  const data = filteredItems.value.slice() // Shallow copy the filtered results

  data.sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    let comparison = 0

    // Robust Type-aware comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue
    } else {
      // OPTIMIZATION: Handle null/undefined values gracefully and use localeCompare for strings
      const strA = String(aValue ?? '').toLowerCase()
      const strB = String(bValue ?? '').toLowerCase()
      comparison = strA.localeCompare(strB)
    }

    // Apply direction modifier
    return sortDir.value === 'asc' ? comparison : comparison * -1
  })

  return data
})

/**
 * Generates the style object for the root wrapper.
 * This injects the selected theme variables into the CSS scope.
 */
const themeStyles = computed(() => ({
  // Use spread for merging theme properties
  ...(isDark.value ? THEMES.dark : THEMES.light),
}))

// ===================================================================
// 4. METHODS & UTILS
// ===================================================================

/** Toggles between Light and Dark mode */
const toggleTheme = () => (isDark.value = !isDark.value)

/**
 * Handles column header clicks for sorting.
 * Cycles: Ascending -> Descending -> None (removed cycle to `id` for simplicity)
 */
const sortByColumn = (key) => {
  const header = currentHeaders.value.find((h) => h.value === key)
  // Guard clause: ignore clicks on non-sortable columns
  if (!header || header.sortable === false) return

  if (sortKey.value === key) {
    // Toggle direction if same column
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Reset to ascending for new column
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

/** Opens/Closes the filter dropdown for a specific column */
const toggleFilter = (key) => {
  // If clicking the current open filter, close it; otherwise, open the new one
  activeFilterKey.value = activeFilterKey.value === key ? null : key
}

/**
 * Updates the filter state with Debounce.
 * Prevents filtering calculation on every keystroke.
 * @param {string} key - Column ID
 * @param {Event} event - Input event
 */
const updateFilter = (key, event) => {
  const rawValue = event.target.value
  const value = String(rawValue || '')
    .toLowerCase()
    .trim()
  const DEBOUNCE_TIME = 200 // Time in milliseconds

  // Clear existing timer for this specific column if user keeps typing
  if (filterTimers.has(key)) clearTimeout(filterTimers.get(key))

  const timer = setTimeout(() => {
    if (value) {
      // Use spread to create a new object, preserving reactivity
      filters.value = { ...filters.value, [key]: value }
    } else {
      // Use object destructuring to safely remove the key if input is empty
      const { [key]: _, ...rest } = filters.value
      filters.value = rest
    }
    filterTimers.delete(key)
  }, DEBOUNCE_TIME)

  filterTimers.set(key, timer)
}

/** Clears a specific filter instantly */
const clearFilter = (key) => {
  // Safely remove the filter key
  const { [key]: _, ...rest } = filters.value
  filters.value = rest
  // Also clear the debounce timer if one exists for this key
  if (filterTimers.has(key)) {
    clearTimeout(filterTimers.get(key))
    filterTimers.delete(key)
  }
}

/** * Returns the correct CSS variable based on the completion percentage.
 * @param {number} completion - The percentage value.
 * @returns {string} A CSS variable string for the corresponding status color.
 */
const getCompletionColor = (completion) => {
  if (completion === 100) return 'var(--status-success)'
  if (completion >= 70) return 'var(--status-info)'
  if (completion >= 40) return 'var(--status-warning)'
  return 'var(--status-danger)'
}

// --- Mock Actions ---
const cancelItem = (item) => {
  // In a real application, this would emit an event or call a store action.
  console.log(`ACTION: Item ${item.id} (${item.product}) cancelled.`)
}

const selectRow = (item) => {
  // In a real application, this would emit a 'row-selected' event.
  console.log(`SELECTED: Item ${item.id}`)
}

/** * Returns a CSS class for text alignment.
 * @param {'left'|'center'|'right'} justify - Alignment string.
 * @returns {string} The corresponding CSS class.
 */
const getJustifyClass = (justify) => {
  if (justify === 'right') return 'justify-right'
  if (justify === 'center') return 'justify-center'
  return 'justify-left'
}

/** * Returns the class object for a header cell, including sort/justify state.
 * @param {Object} header - The header configuration object.
 * @returns {Object} A class object for Vue's class binding.
 */
const getHeaderClass = (header) => ({
  'header-cell': true,
  'is-sorted': sortKey.value === header.value,
  'is-sortable': header.sortable !== false,
  [getJustifyClass(header.justify)]: true,
})

/** * Returns ARIA sort attribute for accessibility.
 * @param {Object} header - The header configuration object.
 * @returns {"none" | "ascending" | "descending"} ARIA sort attribute value.
 */
const getAriaSort = (header) => {
  if (sortKey.value !== header.value) return 'none'
  return sortDir.value === 'asc' ? 'ascending' : 'descending'
}

// ===================================================================
// 5. EFFICIENT GLOBAL LISTENERS (Optimized Cleanup)
// ===================================================================

/**
 * Handles clicks outside the filter dropdown to close it.
 * This is crucial for user experience and accessibility.
 */
const closeFilterOnOutsideClick = (event) => {
  // Check if the click target or any of its ancestors match the selector
  const clickedOnFilterIcon = event.target.closest('.filter-icon')
  const clickedOnFilterDropdown = event.target.closest('.filter-dropdown')

  // Only close if the click was truly outside both the icon and the dropdown
  if (!clickedOnFilterIcon && !clickedOnFilterDropdown) {
    activeFilterKey.value = null
  }
}

/**
 * OPTIMIZATION: Dynamic Event Listener
 * The global 'click' listener is only attached when a filter is open and detached
 * when closed, reducing overhead.
 */
watch(
  activeFilterKey,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // Transition from closed (null) to open
      // Use setTimeout(0) to push attachment to next tick, preventing the
      // click that opened the menu from immediately closing it.
      document.addEventListener('click', closeFilterOnOutsideClick, { capture: true }) // Use capture for reliability
    } else if (!newVal && oldVal) {
      // Transition from open to closed (null)
      document.removeEventListener('click', closeFilterOnOutsideClick, { capture: true })
    }
  },
  { immediate: true },
) // Check initial state for robustness

// Cleanup: Ensure no listeners or timers hang around if component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', closeFilterOnOutsideClick, { capture: true })
  // Cleanup all potential pending debounce timers
  for (const t of filterTimers.values()) clearTimeout(t)
})
</script>

<template>
  <div class="table-wrapper" :style="themeStyles">
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="header in currentHeaders"
              :key="header.value"
              :data-key="header.value"
              :class="getHeaderClass(header)"
              scope="col"
              :aria-sort="getAriaSort(header)"
            >
              <div class="header-inner">
                <div
                  class="header-content"
                  :class="{ 'non-sortable': header.sortable === false }"
                  @click="sortByColumn(header.value)"
                  role="button"
                  :tabindex="header.sortable !== false ? 0 : -1"
                >
                  <span>{{ header.text }}</span>
                  <div v-if="header.sortable !== false" class="sort-icon-container">
                    <svg
                      class="sort-arrow sort-asc"
                      viewBox="7 9 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      :class="{ 'is-active-dir': sortKey === header.value && sortDir === 'asc' }"
                    >
                      <path d="M7 14L12 9L17 14H7Z" fill="currentColor" />
                    </svg>
                    <svg
                      class="sort-arrow sort-desc"
                      viewBox="7 10 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      :class="{ 'is-active-dir': sortKey === header.value && sortDir === 'desc' }"
                    >
                      <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <button
                  v-if="header.value !== 'actions'"
                  class="filter-icon"
                  type="button"
                  @click.stop="toggleFilter(header.value)"
                  :class="{ 'is-active-filter': filters[header.value] }"
                  :aria-expanded="activeFilterKey === header.value"
                  aria-controls="filter-dropdown"
                  :aria-label="`Filter by ${header.text} - ${filters[header.value] ? 'Active' : 'Inactive'}`"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M14.072 13.918L21.414 6.574C22.195 5.793 21.652 4.5 20.579 4.5H3.42C2.348 4.5 1.805 5.793 2.586 6.574L9.928 13.918C10.026 14.016 10.081 14.148 10.081 14.288V20.5C10.081 21.328 10.871 21.758 11.536 21.353L13.149 20.375C13.737 20.02 14.081 19.387 14.081 18.694V14.288C14.081 14.148 14.026 14.016 14.072 13.918Z"
                      stroke="none"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>

              <div class="filter-dropdown-wrapper">
                <div
                  v-if="activeFilterKey === header.value"
                  class="filter-dropdown"
                  @click.stop
                  id="filter-dropdown"
                  role="search"
                >
                  <div class="filter-controls">
                    <input
                      type="text"
                      :value="filters[header.value] || ''"
                      @input="updateFilter(header.value, $event)"
                      :placeholder="`Filter ${header.text}...`"
                      :aria-label="`Filter by ${header.text}`"
                      autofocus
                    />
                    <button
                      v-if="filters[header.value]"
                      class="clear-filter-button"
                      type="button"
                      @click.stop="
                        clearFilter(header.value)
                        toggleFilter(header.value)
                      "
                      aria-label="Clear filter and close"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in sortedItems"
            :key="item.id"
            class="data-row"
            @click="selectRow(item)"
            @keydown.enter.space.prevent="selectRow(item)"
            role="row"
            tabindex="0"
          >
            <td
              v-for="header in currentHeaders"
              :key="header.value"
              class="data-cell"
              :class="[
                getJustifyClass(header.justify),
                { 'cell-product': header.value === 'product' },
              ]"
              role="cell"
            >
              <template v-if="header.value === 'price'">
                <span class="cell-price">${{ item.price.toFixed(2) }}</span>
              </template>
              <template v-else-if="header.value === 'rating'">
                <span class="cell-rating">{{ item.rating }} <span aria-hidden="true">★</span></span>
              </template>
              <template v-else-if="header.value === 'completion'">
                <div class="completion-bar-wrapper">
                  <div
                    role="progressbar"
                    :aria-valuenow="item.completion"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    class="completion-bar-container"
                  >
                    <div
                      class="completion-bar"
                      :style="{
                        width: item.completion + '%',
                        backgroundColor: getCompletionColor(item.completion),
                      }"
                    ></div>
                  </div>
                  <span class="completion-text">{{ item.completion }}%</span>
                </div>
              </template>
              <template v-else-if="header.value === 'actions'">
                <div class="actions-cell">
                  <button
                    class="cancel-button"
                    type="button"
                    @click.stop="cancelItem(item)"
                    :disabled="item.completion === 100"
                    :class="{ disabled: item.completion === 100 }"
                  >
                    {{ item.completion === 100 ? 'Completed' : 'Cancel' }}
                  </button>
                </div>
              </template>
              <template v-else>
                <span>{{ item[header.value] }}</span>
              </template>
            </td>
          </tr>
          <tr v-if="!sortedItems.length">
            <td :colspan="currentHeaders.length" class="empty-state">
              No items found matching the current filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  color: var(--text-default);
  background-color: white; //var(--bg-primary);
}

/* Header */
.table-header {
  padding: 0px 12px;
  color: #ac1414; //var(--text-header-title);
  background-color: rgb(176, 35, 35); //#d2d2d2b1; //var(--bg-header);
  border-bottom: 1px black dashed;
}

.table-header:hover {
  border-radius: 20px;
  background-color: #ce0707b1; //var(--bg-header);
}

.table-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.table-container {
  overflow-y: scroll;

  scroll-behavior: smooth;
}

.data-table {
  /* ... (rest of styles) */
}

.header-cell {
  /* ... (rest of styles) */
  position: sticky;
  top: 0;
  z-index: 5;
  /* Optimize sticky rendering */
  will-change: transform;
  /* ... (rest of styles) */
}

/* --- Accessibility/Robustness Improvements (Minor CSS) --- */
.filter-dropdown input:focus,
.header-content:focus-visible {
  /* Add outline for keyboard users */
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  border-radius: 4px;
}
.completion-bar-container {
  /* ... (original styles) */
  position: relative; /* Added for progress bar */
}
.completion-bar {
  /* ... (original styles) */
  border-radius: 0px;
}
.cell-rating > span[aria-hidden='true'] {
  color: #ffc107; /* Ensure the star icon is still yellow */
}

/* Table Structure */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  //min-width: 900px;
}

/* Utils */
.justify-left {
  text-align: left;
}
.justify-center {
  text-align: center;
}
.justify-right {
  text-align: right;
}

/* Header Cells */
.header-cell {
  padding: 6px 24px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1c1c1c; //var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  user-select: none;
  border-left: 1px solid var(--border-color);
  background-color: rgb(255, 255, 255); //var(--table-header-bg);
  transition: background-color 0.15s ease-in-out;
  border-bottom: 1px solid var(--border-color);
  //border-top: 1px solid var(--border-color);
  white-space: nowrap;
}

.header-cell.is-sortable:hover {
  background-color: var(--table-bg-hover);
}

.header-cell.is-sorted {
  background-color: var(--table-sorted-bg);
  color: var(--accent-color);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.header-cell.justify-center .header-inner {
  justify-content: center;
}
.header-cell.justify-right .header-inner {
  justify-content: flex-end;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.header-content.non-sortable {
  cursor: default;
  opacity: 0.9;
}

/* Icons */
.filter-icon {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--text-subtle);
  transition: color 0.15s ease-in-out;
  flex-shrink: 0;
}
.filter-icon:hover {
  color: var(--text-default);
}
.filter-icon svg {
  width: var(--filter-icon-size);
  height: var(--filter-icon-size);
}
.filter-icon.is-active-filter {
  color: var(--accent-color);
}

/* Filter Dropdown */
.filter-dropdown-wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 8px;
  z-index: 20;
}

.filter-dropdown {
  background-color: var(--bg-primary);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 12px;
  width: 250px;
  border: 1px solid var(--border-color);
}

.filter-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-dropdown input {
  flex-grow: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: var(--bg-secondary);
  color: var(--text-default);
  transition: border-color 0.15s;
}

.clear-filter-button {
  flex-shrink: 0;
  padding: 8px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: var(--cancel-bg);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.clear-filter-button:hover {
  filter: brightness(1.1);
}

/* Sort Icons */
.sort-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--sort-icon-size);
  height: calc(var(--sort-icon-size) + 4px);
}

.sort-arrow {
  width: var(--sort-icon-size);
  height: calc(var(--sort-icon-size) / 2 + 4px);
  color: var(--text-subtle);
  opacity: 0.4;
  transition:
    color 0.15s ease-in-out,
    opacity 0.15s;
  margin: -1px 0;
}

.sort-arrow.is-active-dir {
  color: grey; //var(--accent-color);
  opacity: 1;
}

/* Rows & Cells */
.data-row {
  transition: background-color 0.1s ease-in-out;
  cursor: default;
}
.data-row:nth-child(even) {
  background-color: var(--table-bg-odd);
}
.data-row:hover {
  background-color: var(--table-bg-hover);
}

.data-cell {
  padding: 0px 24px;
  font-size: 1.2rem;
  color: var(--text-default);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  border-bottom: 1px solid var(--border-color);
}

.cell-product {
  font-weight: 600;
}
.cell-price {
  font-weight: 600;
  color: var(--status-success);
}
.cell-rating {
  font-weight: 600;
  color: #ffc107;
}

/* Completion Bar */
.completion-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.completion-bar-container {
  width: 100px;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}
.completion-bar {
  height: 100%;
  transition:
    width 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  border-radius: 4px;
}
.completion-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-subtle);
}

/* Actions */
.actions-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cancel-button {
  padding: 2px 4px;
  background-color: var(--cancel-bg);
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.15s ease;
}
.cancel-button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
.cancel-button.disabled {
  background-color: var(--status-success);
  cursor: not-allowed;
  color: white;
  box-shadow: none;
  pointer-events: none;
  opacity: 0.8;
}

.empty-state {
  padding: 40px 24px;
  text-align: center;
  color: var(--text-subtle);
  font-size: 1.1rem;
  font-style: italic;
  border-bottom: none !important;
}
</style>
