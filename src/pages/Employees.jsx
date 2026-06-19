import { useState } from 'react'
import { useApp, ACTIONS } from '../context/AppContext'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import styles from './Pages.module.css'

const EMPTY_FORM = {
  name: '', email: '', dept: 'Engineering',
  jobTitle: '', rate: '', start: new Date().toISOString().split('T')[0],
  status: 'active',
}

export default function Employees() {
  const { employees, dispatch, showToast } = useApp()
  const [search, setSearch]   = useState('')
  const [deptFilter, setDept] = useState('')
  const [showModal, setModal] = useState(false)
  const [editTarget, setEdit] = useState(null)  // employee being edited
  const [form, setForm]       = useState(EMPTY_FORM)

  const filtered = employees.filter(e => {
    const q = search.toLowerCase()
    return (
      (!q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)) &&
      (!deptFilter || e.dept === deptFilter)
    )
  })

  const openAdd = () => {
    setEdit(null)
    setForm({ ...EMPTY_FORM, avatar: '' })
    setModal(true)
  }

  const openEdit = (emp) => {
    setEdit(emp)
    setForm({ ...emp })
    setModal(true)
  }

  const handleRemove = (emp) => {
    if (!window.confirm(`Remove ${emp.name} from the system?`)) return
    dispatch({ type: ACTIONS.REMOVE_EMPLOYEE, payload: emp.id })
    showToast(`${emp.name} removed.`, 'success')
  }

  const handleSave = () => {
    const { name, email, jobTitle, rate, start } = form
    if (!name.trim() || !email.trim() || !jobTitle.trim() || !rate || !start) {
      showToast('Please fill in all fields.', 'danger')
      return
    }
    const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    if (editTarget) {
      dispatch({ type: ACTIONS.UPDATE_EMPLOYEE, payload: { ...form, id: editTarget.id, avatar: initials, rate: parseFloat(form.rate) } })
      showToast(`${name} updated.`, 'success')
    } else {
      dispatch({ type: ACTIONS.ADD_EMPLOYEE, payload: { ...form, avatar: initials, rate: parseFloat(form.rate) } })
      showToast(`${name} added.`, 'success')
    }
    setModal(false)
  }

  const field = (key) => ({
    value: form[key],
    onChange: e => setForm(f => ({ ...f, [key]: e.target.value })),
  })

  return (
    <div className={styles.section}>
      {/* Filter bar */}
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search employees…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search employees"
        />
        <select
          className={styles.selectInput}
          value={deptFilter}
          onChange={e => setDept(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="QA">QA</option>
          <option value="Product">Product</option>
        </select>
        <Button variant="primary" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Employee
        </Button>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Rate</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.emptyRow}>No employees found</td>
              </tr>
            )}
            {filtered.map(e => (
              <tr key={e.id}>
                <td>
                  <div className={styles.empCell}>
                    <div className={styles.empAvatar}>{e.avatar}</div>
                    <strong>{e.name}</strong>
                  </div>
                </td>
                <td><Badge variant="accent">{e.dept}</Badge></td>
                <td className={styles.emailCell}>{e.email}</td>
                <td>{e.jobTitle}</td>
                <td className="mono">£{e.rate}/hr</td>
                <td className={styles.muted}>{e.start}</td>
                <td><Badge variant="success" dot>Active</Badge></td>
                <td>
                  <div className={styles.actionBtns}>
                    <Button size="sm" onClick={() => openEdit(e)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleRemove(e)}>Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setModal(false)}
        title={editTarget ? `Edit — ${editTarget.name}` : 'Add New Employee'}
      >
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name</label>
            <input className={styles.formInput} placeholder="e.g. Jane Smith" {...field('name')} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <input className={styles.formInput} type="email" placeholder="jane@company.com" {...field('email')} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Department</label>
            <select className={styles.formInput} {...field('dept')}>
              <option>Engineering</option>
              <option>Design</option>
              <option>QA</option>
              <option>Product</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Job Title</label>
            <input className={styles.formInput} placeholder="e.g. Frontend Developer" {...field('jobTitle')} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Hourly Rate (£)</label>
            <input className={styles.formInput} type="number" min="1" placeholder="25.00" {...field('rate')} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Start Date</label>
            <input className={styles.formInput} type="date" {...field('start')} />
          </div>
        </div>
        <div className={styles.modalActions}>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            {editTarget ? 'Save Changes' : 'Add Employee'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
