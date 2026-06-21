
export const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'James Carter',
    email: 'j.carter@payrollpro.io',
    dept: 'Engineering',
    jobTitle: 'Frontend Developer',
    rate: 28,
    start: '2022-03-15',
    status: 'active',
    avatar: 'JC',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'p.patel@payrollpro.io',
    dept: 'Engineering',
    jobTitle: 'Backend Developer',
    rate: 30,
    start: '2021-09-01',
    status: 'active',
    avatar: 'PP',
  },
  {
    id: 3,
    name: 'Marcus Brown',
    email: 'm.brown@payrollpro.io',
    dept: 'Design',
    jobTitle: 'UI/UX Designer',
    rate: 25,
    start: '2023-01-10',
    status: 'active',
    avatar: 'MB',
  },
  {
    id: 4,
    name: 'Aisha Khan',
    email: 'a.khan@payrollpro.io',
    dept: 'QA',
    jobTitle: 'QA Engineer',
    rate: 24,
    start: '2022-07-20',
    status: 'active',
    avatar: 'AK',
  },
]

export const INITIAL_ATTENDANCE = [
  // James Carter (id:1)
  { id: 101, empId: 1, date: '2025-07-01', clockIn: '08:30', clockOut: '17:00', hours: 8.5 },
  { id: 102, empId: 1, date: '2025-07-02', clockIn: '08:45', clockOut: '17:30', hours: 8.75 },
  { id: 103, empId: 1, date: '2025-07-03', clockIn: '09:00', clockOut: '18:00', hours: 9.0 },
  { id: 104, empId: 1, date: '2025-07-07', clockIn: '08:30', clockOut: '17:00', hours: 8.5 },
  // Priya Patel (id:2)
  { id: 201, empId: 2, date: '2025-07-01', clockIn: '09:00', clockOut: '17:30', hours: 8.5 },
  { id: 202, empId: 2, date: '2025-07-02', clockIn: '08:30', clockOut: '17:00', hours: 8.5 },
  { id: 203, empId: 2, date: '2025-07-03', clockIn: '09:15', clockOut: '18:15', hours: 9.0 },
  { id: 204, empId: 2, date: '2025-07-07', clockIn: '09:00', clockOut: '17:30', hours: 8.5 },
  // Marcus Brown (id:3)
  { id: 301, empId: 3, date: '2025-07-01', clockIn: '10:00', clockOut: '18:00', hours: 8.0 },
  { id: 302, empId: 3, date: '2025-07-02', clockIn: '09:30', clockOut: '17:30', hours: 8.0 },
  { id: 303, empId: 3, date: '2025-07-07', clockIn: '10:00', clockOut: '18:30', hours: 8.5 },
  // Aisha Khan (id:4)
  { id: 401, empId: 4, date: '2025-07-01', clockIn: '08:00', clockOut: '16:30', hours: 8.5 },
  { id: 402, empId: 4, date: '2025-07-02', clockIn: '08:15', clockOut: '16:45', hours: 8.5 },
  { id: 403, empId: 4, date: '2025-07-03', clockIn: '08:00', clockOut: '16:30', hours: 8.5 },
  { id: 404, empId: 4, date: '2025-07-07', clockIn: '08:00', clockOut: '16:30', hours: 8.5 },
]

// Demo login users — role maps to what pages they can access (RBAC)
export const DEMO_USERS = [
  { id: 0,  name: 'Sarah Johnson', role: 'hr',  avatar: 'SJ', dept: 'HR',          rate: 0,  empId: null },
  { id: 1,  name: 'James Carter',  role: 'emp', avatar: 'JC', dept: 'Engineering', rate: 28, empId: 1    },
  { id: 2,  name: 'Priya Patel',   role: 'emp', avatar: 'PP', dept: 'Engineering', rate: 30, empId: 2    },
  { id: 3,  name: 'Marcus Brown',  role: 'emp', avatar: 'MB', dept: 'Design',      rate: 25, empId: 3    },
  { id: 4,  name: 'Aisha Khan',    role: 'emp', avatar: 'AK', dept: 'QA',          rate: 24, empId: 4    },
]

// UK payroll deduction rates
export const TAX_RATE = 0.20
export const NI_RATE  = 0.12

// Payroll month options shown in selects
export const PAYROLL_MONTHS = [
  { value: '2025-07', label: 'July 2025' },
  { value: '2025-06', label: 'June 2025' },
  { value: '2025-05', label: 'May 2025' },
]
