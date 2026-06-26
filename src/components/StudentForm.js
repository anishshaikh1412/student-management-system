import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../redux/actions/studentActions';

const initialForm = {
  name: '',
  rollNumber: '',
  phone: '',
  email: '',
  age: '',
  class: '',
  subject: '',
  marks: '',
  totalMarks: 100,
  examType: 'Class Exam',
  image: '',
};

const StudentForm = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(
        addStudent({
          ...form,
          marks: Number(form.marks) || 0,
          totalMarks: Number(form.totalMarks) || 100,
          age: Number(form.age) || null,
          image: form.image || `https://i.pravatar.cc/150?u=${Date.now()}`,
        })
      );
      navigate('/');
    } catch (err) {
      // error is already captured in redux state and shown elsewhere if needed
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sms-page">
      <div className="sms-card sms-form-card">
        <h3 className="sms-form-title">Add New Student</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Student's Name</label>
            <input
              name="name"
              className="form-control sms-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Roll Number</label>
            <input
              name="rollNumber"
              className="form-control sms-input"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Class / Grade</label>
            <input
              name="class"
              className="form-control sms-input"
              placeholder="Grade 3"
              value={form.class}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control sms-input"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              className="form-control sms-input"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control sms-input"
              value={form.email}
              onChange={handleChange}
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
            <label className="form-label">Marks Scored</label>
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
            <label className="form-label">Photo URL (optional)</label>
            <input
              name="image"
              className="form-control sms-input"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 d-flex gap-3 mt-4">
            <button type="submit" className="btn sms-btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Add Student'}
            </button>
            <button type="button" className="btn sms-btn-outline-dark" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
