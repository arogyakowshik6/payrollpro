import { createContext, useContext, useReducer, useCallback } from 'react'
import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE, INITIAL_LEAVES, INITIAL_SHIFTS, INITIAL_NOTIFICATIONS, CALENDAR_EVENTS, PAYSLIP_HISTORY } from '../data/seedData'

const initialState = {
  currentUser: null, isLoggedIn: false,
  employees: INITIAL_EMPLOYEES,
  attendance: INITIAL_ATTENDANCE,
  leaves: INITIAL_LEAVES,
  shifts: INITIAL_SHIFTS,
  notifications: INITIAL_NOTIFICATIONS,
  calendarEvents: CALENDAR_EVENTS,
  payslipHistory: PAYSLIP_HISTORY,
  clockedInSince: null,
  toast: null,
}

export const ACTIONS = {
  LOGIN:'LOGIN', LOGOUT:'LOGOUT',
  ADD_EMPLOYEE:'ADD_EMPLOYEE', UPDATE_EMPLOYEE:'UPDATE_EMPLOYEE', REMOVE_EMPLOYEE:'REMOVE_EMPLOYEE',
  CLOCK_IN:'CLOCK_IN', CLOCK_OUT:'CLOCK_OUT',
  ADD_LEAVE:'ADD_LEAVE', UPDATE_LEAVE:'UPDATE_LEAVE',
  ADD_SHIFT:'ADD_SHIFT', REMOVE_SHIFT:'REMOVE_SHIFT',
  MARK_NOTIFICATION_READ:'MARK_NOTIFICATION_READ', MARK_ALL_READ:'MARK_ALL_READ', ADD_NOTIFICATION:'ADD_NOTIFICATION',
  SHOW_TOAST:'SHOW_TOAST', HIDE_TOAST:'HIDE_TOAST',
  UPDATE_SELF:'UPDATE_SELF',
}

function appReducer(state, action){
  switch(action.type){
    case ACTIONS.LOGIN:    return {...state, currentUser:action.payload, isLoggedIn:true}
    case ACTIONS.LOGOUT:   return {...state, currentUser:null, isLoggedIn:false, clockedInSince:null}
    case ACTIONS.ADD_EMPLOYEE: {
      const newId = Math.max(0,...state.employees.map(e=>e.id))+1
      return {...state, employees:[...state.employees,{...action.payload,id:newId}]}
    }
    case ACTIONS.UPDATE_EMPLOYEE:
      return {...state, employees:state.employees.map(e=>e.id===action.payload.id?{...e,...action.payload}:e)}
    case ACTIONS.REMOVE_EMPLOYEE:
      return {...state,
        employees:state.employees.filter(e=>e.id!==action.payload),
        attendance:state.attendance.filter(r=>r.empId!==action.payload),
        leaves:state.leaves.filter(l=>l.empId!==action.payload),
        shifts:state.shifts.filter(s=>s.empId!==action.payload),
      }
    case ACTIONS.CLOCK_IN:  return {...state, clockedInSince:action.payload}
    case ACTIONS.CLOCK_OUT: {
      const newId=Math.max(0,...state.attendance.map(r=>r.id))+1
      return {...state, clockedInSince:null, attendance:[...state.attendance,{...action.payload.record,id:newId}]}
    }
    case ACTIONS.ADD_LEAVE: {
      const newId=Math.max(0,...state.leaves.map(l=>l.id))+1
      return {...state, leaves:[...state.leaves,{...action.payload,id:newId}]}
    }
    case ACTIONS.UPDATE_LEAVE:
      return {...state, leaves:state.leaves.map(l=>l.id===action.payload.id?{...l,...action.payload}:l)}
    case ACTIONS.ADD_SHIFT: {
      const newId=Math.max(0,...state.shifts.map(s=>s.id))+1
      return {...state, shifts:[...state.shifts,{...action.payload,id:newId}]}
    }
    case ACTIONS.REMOVE_SHIFT:
      return {...state, shifts:state.shifts.filter(s=>s.id!==action.payload)}
    case ACTIONS.MARK_NOTIFICATION_READ:
      return {...state, notifications:state.notifications.map(n=>n.id===action.payload?{...n,read:true}:n)}
    case ACTIONS.MARK_ALL_READ:
      return {...state, notifications:state.notifications.map(n=>({...n,read:true}))}
    case ACTIONS.ADD_NOTIFICATION: {
      const newId=Math.max(0,...state.notifications.map(n=>n.id))+1
      return {...state, notifications:[{...action.payload,id:newId,read:false},...state.notifications]}
    }
    case ACTIONS.UPDATE_SELF:
      return {...state,
        employees:state.employees.map(e=>e.id===action.payload.id?{...e,...action.payload}:e),
        currentUser:{...state.currentUser,...action.payload}
      }
    case ACTIONS.SHOW_TOAST: return {...state, toast:action.payload}
    case ACTIONS.HIDE_TOAST: return {...state, toast:null}
    default: return state
  }
}

const AppContext = createContext(null)

export function AppProvider({children}){
  const [state, dispatch] = useReducer(appReducer, initialState)

  const showToast = useCallback((msg, type='success')=>{
    dispatch({type:ACTIONS.SHOW_TOAST, payload:{msg,type}})
    setTimeout(()=>dispatch({type:ACTIONS.HIDE_TOAST}), 3200)
  },[])

  const getHoursForEmp = useCallback((empId, month)=>
    state.attendance.filter(r=>r.empId===empId&&(!month||r.date.startsWith(month))).reduce((s,r)=>s+r.hours,0)
  ,[state.attendance])

  const getShiftsForEmp = useCallback((empId, month)=>
    state.attendance.filter(r=>r.empId===empId&&(!month||r.date.startsWith(month)))
  ,[state.attendance])

  const getUnreadCount = useCallback((userId)=>
    state.notifications.filter(n=>!n.read&&(n.userId===userId||n.userId===`emp${userId}`)).length
  ,[state.notifications])

  const getUserNotifications = useCallback((user)=>{
    if(!user) return []
    const key = user.role==='hr' ? 'hr' : `emp${user.empId}`
    return state.notifications.filter(n=>n.userId===key||n.userId===String(user.empId))
  },[state.notifications])

  return (
    <AppContext.Provider value={{...state,dispatch,showToast,getHoursForEmp,getShiftsForEmp,getUnreadCount,getUserNotifications}}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(){
  const ctx = useContext(AppContext)
  if(!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
