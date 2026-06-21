

import { createContext, useContext, useReducer, useCallback } from 'react'
import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE } from '../data/seedData'

// ── Initial State ────────────────────────────────────────────
const initialState = {
  // Auth
  currentUser:  null,
  isLoggedIn:   false,

  // Data
  employees:    INITIAL_EMPLOYEES,
  attendance:   INITIAL_ATTENDANCE,

  // Clock state (for logged-in employee)
  clockedInSince: null,   // Date object or null

  // Toast
  toast: null,            // { msg, type } or null
}

// ── Action Types ─────────────────────────────────────────────
export const ACTIONS = {
  LOGIN:            'LOGIN',
  LOGOUT:           'LOGOUT',
  ADD_EMPLOYEE:     'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE:  'UPDATE_EMPLOYEE',
  REMOVE_EMPLOYEE:  'REMOVE_EMPLOYEE',
  CLOCK_IN:         'CLOCK_IN',
  CLOCK_OUT:        'CLOCK_OUT',
  SHOW_TOAST:       'SHOW_TOAST',
  HIDE_TOAST:       'HIDE_TOAST',
}

// ── Reducer ──────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {

    case ACTIONS.LOGIN:
      return { ...state, currentUser: action.payload, isLoggedIn: true }

    case ACTIONS.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        clockedInSince: null,
      }

    case ACTIONS.ADD_EMPLOYEE: {
      const newId = Math.max(0, ...state.employees.map(e => e.id)) + 1
      return {
        ...state,
        employees: [...state.employees, { ...action.payload, id: newId }],
      }
    }

    case ACTIONS.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      }

    case ACTIONS.REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(e => e.id !== action.payload),
        attendance: state.attendance.filter(r => r.empId !== action.payload),
      }

    case ACTIONS.CLOCK_IN:
      return { ...state, clockedInSince: action.payload } // payload = Date

    case ACTIONS.CLOCK_OUT: {
      const { record } = action.payload
      const newId = Math.max(0, ...state.attendance.map(r => r.id)) + 1
      return {
        ...state,
        clockedInSince: null,
        attendance: [...state.attendance, { ...record, id: newId }],
      }
    }

    case ACTIONS.SHOW_TOAST:
      return { ...state, toast: action.payload }

    case ACTIONS.HIDE_TOAST:
      return { ...state, toast: null }

    default:
      return state
  }
}

// ── Context ──────────────────────────────────────────────────
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Toast helper — auto-hides after 3.2s
  const showToast = useCallback((msg, type = 'success') => {
    dispatch({ type: ACTIONS.SHOW_TOAST, payload: { msg, type } })
    setTimeout(() => dispatch({ type: ACTIONS.HIDE_TOAST }), 3200)
  }, [])

  // Derived helpers
  const getHoursForEmp = useCallback((empId, month) =>
    state.attendance
      .filter(r => r.empId === empId && (!month || r.date.startsWith(month)))
      .reduce((sum, r) => sum + r.hours, 0),
  [state.attendance])

  const getShiftsForEmp = useCallback((empId, month) =>
    state.attendance.filter(r =>
      r.empId === empId && (!month || r.date.startsWith(month))
    ),
  [state.attendance])

  const value = {
    ...state,
    dispatch,
    showToast,
    getHoursForEmp,
    getShiftsForEmp,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// ── Hook ─────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
