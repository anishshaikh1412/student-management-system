import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStudents, updateStudent, deleteStudent } from '../redux/actions/studentActions';

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading } = useSelector((state) => state.students);
  const student = students.find((s) => String(s.id) === String(id));

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  // If the page is loaded/refreshed directly on a details URL, students won't be in the store yet
  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  useEffect(() => {
    if (student) setForm(student);
  }, [student]);

  if (loading && !student) {
    return (
      <div className="sms-page">
        <p className="text-center py-5">Loading...</p>
      </div>
    );
  }

  if (!student || !form) {
    return (
      <div className="sms-page">
        <p className="text-center py-5">Student not found.</p>
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(
        updateStudent(student.id, {
          ...form,
          marks: Number(form.marks) || 0,
          totalMarks: Number(form.totalMarks) || 100,
          age: Number(form.age) || null,
        })
      );
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${student.name}? This cannot be undone.`)) {
      dispatch(deleteStudent(student.id));
      navigate('/');
    }
  };

  return (
    <div className="sms-page">
      <div className="sms-card sms-form-card">
        <div className="sms-details-header">
          <img
            className="sms-avatar-lg"
            src={student.image || 'https://i.pravatar.cc/150?img=12'}
            alt={student.name}
          />
          <div>
            <h3>{student.name}</h3>
            <p className="text-muted mb-0">
              {student.class} &bull; Roll No. {student.rollNumber}
            </p>
          </div>
        </div>

        {!editMode ? (
          <div className="sms-details-grid">
            <div>
              <span>Subject</span>
              <p>{student.subject}</p>
            </div>
            <div>
              <span>Marks Scored</span>
              <p>
                {student.marks} / {student.totalMarks || 100}
              </p>
            </div>
            <div>
              <span>Type of Exam</span>
              <p>{student.examType}</p>
            </div>
            <div>
              <span>Age</span>
              <p>{student.age || '—'}</p>
            </div>
            <div>
              <span>Phone</span>
              <p>{student.phone || '—'}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{student.email || '—'}</p>
            </div>

            <div className="col-12 d-flex gap-3 mt-4">
              <button className="btn sms-btn-primary" onClick={() => setEditMode(true)}>
                Edit Details
              </button>
              <button className="btn sms-btn-danger" onClick={handleDelete}>
                Delete Student
              </button>
              <button className="btn sms-btn-outline-dark" onClick={() => navigate('/')}>
                Back
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="row g-3 mt-1">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control sms-input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Class / Grade</label>
              <input
                name="class"
                className="form-control sms-input"
                value={form.class}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Subject</label>
              <input
                name="subject"
                className="form-control sms-input"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Marks</label>
              <input
                type="number"
                name="marks"
                className="form-control sms-input"
                value={form.marks}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Out of</label>
              <input
                type="number"
                name="totalMarks"
                className="form-control sms-input"
                value={form.totalMarks}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type of Exam</label>
              <select
                name="examType"
                className="form-select sms-select"
                value={form.examType}
                onChange={handleChange}
              >
                <option>Class Exam</option>
                <option>Online Exam</option>
                <option>Missed Exam</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control sms-input"
                value={form.age || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                className="form-control sms-input"
                value={form.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control sms-input"
                value={form.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 d-flex gap-3 mt-3">
              <button type="submit" className="btn sms-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn sms-btn-outline-dark"
                onClick={() => {
                  setEditMode(false);
                  setForm(student);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
