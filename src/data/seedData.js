// ============================================================
// SEED DATA — PayrollPro v2
// Extended with PIN auth, leaves, shifts, performance, currency
// ============================================================

export const INITIAL_EMPLOYEES = [
  { id:1, name:'James Carter',  email:'j.carter@payrollpro.io', dept:'Engineering', jobTitle:'Frontend Developer', rate:28, currency:'GBP', start:'2022-03-15', status:'active', avatar:'JC', pin:'1234', phone:'+44 7700 900001', address:'12 Baker St, London' },
  { id:2, name:'Priya Patel',   email:'p.patel@payrollpro.io',  dept:'Engineering', jobTitle:'Backend Developer',  rate:30, currency:'GBP', start:'2021-09-01', status:'active', avatar:'PP', pin:'2345', phone:'+44 7700 900002', address:'8 Canary Wharf, London' },
  { id:3, name:'Marcus Brown',  email:'m.brown@payrollpro.io',  dept:'Design',      jobTitle:'UI/UX Designer',    rate:25, currency:'EUR', start:'2023-01-10', status:'active', avatar:'MB', pin:'3456', phone:'+44 7700 900003', address:'45 Old Street, London' },
  { id:4, name:'Aisha Khan',    email:'a.khan@payrollpro.io',   dept:'QA',          jobTitle:'QA Engineer',       rate:24, currency:'USD', start:'2022-07-20', status:'active', avatar:'AK', pin:'4567', phone:'+44 7700 900004', address:'3 Greenwich Ave, London' },
]

export const INITIAL_ATTENDANCE = [
  { id:101, empId:1, date:'2025-07-01', clockIn:'08:30', clockOut:'17:00', hours:8.5, scheduledHours:8, late:false },
  { id:102, empId:1, date:'2025-07-02', clockIn:'09:15', clockOut:'18:00', hours:8.75, scheduledHours:8, late:true },
  { id:103, empId:1, date:'2025-07-03', clockIn:'08:45', clockOut:'18:30', hours:9.75, scheduledHours:8, late:false },
  { id:104, empId:1, date:'2025-07-07', clockIn:'08:30', clockOut:'17:00', hours:8.5,  scheduledHours:8, late:false },
  { id:201, empId:2, date:'2025-07-01', clockIn:'09:00', clockOut:'17:30', hours:8.5,  scheduledHours:8, late:false },
  { id:202, empId:2, date:'2025-07-02', clockIn:'08:30', clockOut:'17:00', hours:8.5,  scheduledHours:8, late:false },
  { id:203, empId:2, date:'2025-07-03', clockIn:'09:20', clockOut:'18:15', hours:8.92, scheduledHours:8, late:true },
  { id:204, empId:2, date:'2025-07-07', clockIn:'09:00', clockOut:'17:30', hours:8.5,  scheduledHours:8, late:false },
  { id:301, empId:3, date:'2025-07-01', clockIn:'10:00', clockOut:'18:00', hours:8.0,  scheduledHours:8, late:false },
  { id:302, empId:3, date:'2025-07-02', clockIn:'10:30', clockOut:'18:30', hours:8.0,  scheduledHours:8, late:true },
  { id:303, empId:3, date:'2025-07-07', clockIn:'10:00', clockOut:'19:00', hours:9.0,  scheduledHours:8, late:false },
  { id:401, empId:4, date:'2025-07-01', clockIn:'08:00', clockOut:'16:30', hours:8.5,  scheduledHours:8, late:false },
  { id:402, empId:4, date:'2025-07-02', clockIn:'08:15', clockOut:'16:45', hours:8.5,  scheduledHours:8, late:false },
  { id:403, empId:4, date:'2025-07-03', clockIn:'08:00', clockOut:'16:30', hours:8.5,  scheduledHours:8, late:false },
  { id:404, empId:4, date:'2025-07-07', clockIn:'08:00', clockOut:'17:30', hours:9.5,  scheduledHours:8, late:false },
]

export const INITIAL_LEAVES = [
  { id:1, empId:1, type:'Annual',  startDate:'2025-07-14', endDate:'2025-07-15', days:2, reason:'Family holiday',    status:'approved',  appliedOn:'2025-07-01' },
  { id:2, empId:2, type:'Sick',    startDate:'2025-07-08', endDate:'2025-07-08', days:1, reason:'Unwell',            status:'approved',  appliedOn:'2025-07-07' },
  { id:3, empId:3, type:'Unpaid',  startDate:'2025-07-21', endDate:'2025-07-21', days:1, reason:'Personal errand',  status:'pending',   appliedOn:'2025-07-10' },
  { id:4, empId:4, type:'Annual',  startDate:'2025-07-28', endDate:'2025-07-29', days:2, reason:'Short break',       status:'pending',   appliedOn:'2025-07-11' },
]

export const INITIAL_SHIFTS = [
  { id:1, empId:1, date:'2025-07-14', startTime:'09:00', endTime:'17:00', shiftType:'Morning' },
  { id:2, empId:1, date:'2025-07-15', startTime:'09:00', endTime:'17:00', shiftType:'Morning' },
  { id:3, empId:2, date:'2025-07-14', startTime:'08:00', endTime:'16:00', shiftType:'Early' },
  { id:4, empId:3, date:'2025-07-14', startTime:'10:00', endTime:'18:00', shiftType:'Late' },
  { id:5, empId:4, date:'2025-07-14', startTime:'08:00', endTime:'16:00', shiftType:'Early' },
  { id:6, empId:4, date:'2025-07-15', startTime:'08:00', endTime:'16:00', shiftType:'Early' },
]

export const INITIAL_NOTIFICATIONS = [
  { id:1, userId:'hr',   type:'leave',   msg:'Aisha Khan has requested 2 days annual leave',     time:'2025-07-11 09:15', read:false },
  { id:2, userId:'hr',   type:'leave',   msg:'Marcus Brown has requested 1 day unpaid leave',    time:'2025-07-10 14:30', read:false },
  { id:3, userId:'emp1', type:'payslip', msg:'Your July 2025 payslip is now available',           time:'2025-07-31 09:00', read:false },
  { id:4, userId:'emp2', type:'payslip', msg:'Your July 2025 payslip is now available',           time:'2025-07-31 09:00', read:false },
  { id:5, userId:'emp3', type:'leave',   msg:'Your leave request for 21 Jul is under review',    time:'2025-07-10 14:31', read:false },
  { id:6, userId:'emp4', type:'leave',   msg:'Your leave request for 28-29 Jul is under review', time:'2025-07-11 09:16', read:false },
  { id:7, userId:'emp1', type:'shift',   msg:'You have a shift scheduled: 14 Jul 09:00–17:00',   time:'2025-07-12 08:00', read:true  },
]

export const CALENDAR_EVENTS = [
  { id:1, empId:1, title:'Morning Shift',      date:'2025-07-14', time:'09:00–17:00', type:'shift'   },
  { id:2, empId:1, title:'Morning Shift',      date:'2025-07-15', time:'09:00–17:00', type:'shift'   },
  { id:3, empId:1, title:'Annual Leave',       date:'2025-07-14', time:'All day',     type:'leave'   },
  { id:4, empId:2, title:'Early Shift',        date:'2025-07-14', time:'08:00–16:00', type:'shift'   },
  { id:5, empId:2, title:'Team Standup',       date:'2025-07-14', time:'09:30',       type:'meeting' },
  { id:6, empId:3, title:'Late Shift',         date:'2025-07-14', time:'10:00–18:00', type:'shift'   },
  { id:7, empId:4, title:'Early Shift',        date:'2025-07-14', time:'08:00–16:00', type:'shift'   },
  { id:8, empId:4, title:'Payroll Review',     date:'2025-07-31', time:'10:00',       type:'meeting' },
]

export const PAYSLIP_HISTORY = [
  { month:'2025-06', label:'June 2025',     issued:'2025-06-30' },
  { month:'2025-05', label:'May 2025',      issued:'2025-05-31' },
  { month:'2025-04', label:'April 2025',    issued:'2025-04-30' },
]

// Mock exchange rates (base: GBP)
export const EXCHANGE_RATES = { GBP:1.0, USD:1.27, EUR:1.17, INR:105.4 }

export const CURRENCY_SYMBOLS = { GBP:'£', USD:'$', EUR:'€', INR:'₹' }

export const DEMO_USERS = [
  { id:0,  name:'Sarah Johnson', role:'hr',  avatar:'SJ', dept:'HR',          rate:0,  empId:null, pin:'0000' },
  { id:1,  name:'James Carter',  role:'emp', avatar:'JC', dept:'Engineering', rate:28, empId:1,    pin:'1234' },
  { id:2,  name:'Priya Patel',   role:'emp', avatar:'PP', dept:'Engineering', rate:30, empId:2,    pin:'2345' },
  { id:3,  name:'Marcus Brown',  role:'emp', avatar:'MB', dept:'Design',      rate:25, empId:3,    pin:'3456' },
  { id:4,  name:'Aisha Khan',    role:'emp', avatar:'AK', dept:'QA',          rate:24, empId:4,    pin:'4567' },
]

export const TAX_RATE = 0.20
export const NI_RATE  = 0.12
export const LATE_THRESHOLD_MINS = 10

export const PAYROLL_MONTHS = [
  { value:'2025-07', label:'July 2025' },
  { value:'2025-06', label:'June 2025' },
  { value:'2025-05', label:'May 2025' },
]

export const LEAVE_TYPES   = ['Annual','Sick','Unpaid']
export const SHIFT_TYPES   = ['Early','Morning','Late','Night']
export const DEPARTMENTS   = ['Engineering','Design','QA','Product','HR']
export const CURRENCIES    = ['GBP','USD','EUR','INR']
