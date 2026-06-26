import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../redux/actions/studentActions';

const EXAM_TABS = ['All', 'Class Exam', 'Online Exam', 'Missed Exam'];

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = useMemo(() => {
    const set = new Set(students.map((s) => s.class).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [students]);

  const subjectCount = useMemo(
    () => new Set(students.map((s) => s.subject).filter(Boolean)).size,
    [students]
  );

  const filteredStudents = useMemo(() => {
    let list = [...students];

    if (examFilter !== 'All') {
      list = list.filter((s) => s.examType === examFilter);
    }
    if (classFilter !== 'All') {
      list = list.filter((s) => s.class === classFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.subject?.toLowerCase().includes(q) ||
          String(s.rollNumber || '').includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'rollNumber') {
        return String(a.rollNumber || '').localeCompare(String(b.rollNumber || ''), undefined, {
          numeric: true,
        });
      }
      return String(a.name || '').localeCompare(String(b.name || ''));
    });

    return list;
  }, [students, examFilter, classFilter, search, sortBy]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove ${name} from records?`)) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="sms-page">
      <div className="sms-card">
        <div className="sms-card-header">
          <div className="sms-profile">
            <img
              className="sms-avatar-lg"
              src="https://i.pravatar.cc/150?img=47"
              alt={user?.name || 'Admin'}
            />
            <div>
              <h3 className="sms-admin-name">{user?.name || 'Admin'}</h3>
              <p className="sms-admin-school">Orchids International School, Noida</p>
            </div>
          </div>
          <div className="sms-stats">
            <div className="sms-stat">
              <span className="sms-stat-number">{students.length}</span>
              <span className="sms-stat-label">Students</span>
            </div>
            <div className="sms-stat">
              <span className="sms-stat-number">{String(subjectCount).padStart(2, '0')}</span>
              <span className="sms-stat-label">Subjects</span>
            </div>
            <div className="sms-stat">
              <span className="sms-stat-number">
                {students.filter((s) => s.examType).length}
              </span>
              <span className="sms-stat-label">Exams</span>
            </div>
          </div>
        </div>

        <div className="sms-toolbar">
          <div className="sms-toolbar-field">
            <label>Filter by Class</label>
            <select
              className="form-select sms-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="sms-toolbar-field">
            <label>Sort By</label>
            <select
              className="form-select sms-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
            </select>
          </div>
          <Link to="/add" className="btn sms-btn-primary sms-add-btn">
            + ADD NOW
          </Link>
        </div>

        <div className="sms-tablebar">
          <div className="sms-tabs">
            {EXAM_TABS.map((tab) => (
              <button
                key={tab}
                className={`sms-tab ${examFilter === tab ? 'active' : ''}`}
                onClick={() => setExamFilter(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="sms-search">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span role="img" aria-label="search">🔍</span>
          </div>
        </div>

        {loading && <p className="text-center py-4">Loading students...</p>}
        {error && <p className="text-center text-danger py-4">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="sms-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Marks Scored</th>
                  <th>Type of Exam</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="sms-name-cell">
                        <img src={s.image || 'https://i.pravatar.cc/150?img=12'} alt={s.name} />
                        <div>
                          <Link to={`/students/${s.id}`} className="sms-student-name">
                            {s.name}
                          </Link>
                          <div className="sms-student-grade">{s.class}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.subject}</td>
                    <td>
                      {s.marks} / {s.totalMarks || 100}
                    </td>
                    <td>
                      <span
                        className={`sms-exam-type ${s.examType === 'Missed Exam' ? 'missed' : ''}`}
                      >
                        {s.examType}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link to={`/students/${s.id}`} className="sms-edit-link">
                        Edit
                      </Link>
                      <button
                        className="sms-delete-link"
                        onClick={() => handleDelete(s.id, s.name)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
