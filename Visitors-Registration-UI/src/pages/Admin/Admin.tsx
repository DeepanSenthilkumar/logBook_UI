import { useState, useEffect, useMemo } from "react";
import AppPagination from "../../components/Pagination/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import styles from './Admin.module.css'

interface VisitorRecord {
  id: number;
  name: string;
  date: string;
  inTime: string;
  outTime: string;
  purposeOfVisit: string;
}

const dummyData: VisitorRecord[] = [
  { id: 1, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 2, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 3, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 4, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 5, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 6, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 7, name: "Olivia Rhye", date: "2024-01-15", inTime: "09:00", outTime: "11:30", purposeOfVisit: "Client Meeting" },
  { id: 8, name: "Phoenix Baker", date: "2024-01-15", inTime: "10:15", outTime: "", purposeOfVisit: "Interview" },
  { id: 9, name: "Lana Steiner", date: "2024-01-14", inTime: "14:00", outTime: "16:45", purposeOfVisit: "Vendor Visit" },
  { id: 10, name: "Demi Wilkinson", date: "2024-01-14", inTime: "09:30", outTime: "12:00", purposeOfVisit: "Maintenance" },
  { id: 11, name: "Demi Wilkinson", date: "2024-01-14", inTime: "09:30", outTime: "12:00", purposeOfVisit: "Maintenance" },
  { id: 12, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 13, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 14, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 15, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 16, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 17, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 18, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 19, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 20, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 21, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 22, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 23, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 24, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 25, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 26, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 27, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
  { id: 28, name: "Candice Wu", date: "2024-01-13", inTime: "11:00", outTime: "13:30", purposeOfVisit: "Delivery" },
];

const ITEMS_PER_PAGE = 10;

function Admin() {
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, dateFilter]);

  const filteredData = useMemo(() => {
    return dummyData.filter(item => {
      const matchesSearch = !debouncedSearch || item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || item.purposeOfVisit.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesDate = !dateFilter || item.date === dateFilter;

      return matchesSearch && matchesDate;
    });
  }, [debouncedSearch, dateFilter]);
  // debugger

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice( startIndex, startIndex + ITEMS_PER_PAGE );

  return (
    <div className={`container-fluid py-5 ${styles.Admin}`} >
      <h2> Welcome to iCodex. Please Enter your details </h2>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <input className="form-control" placeholder="Search name or purpose" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>

        <div className="col-12 col-md-6">
          <input type="date" className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <div className="overflow-auto mb-3">
        <table className="table table-bordered align-middle mb-0" style={{ minWidth: 700 }} >
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>In</th>
              <th>Out</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? ( paginatedData.map((r, i) => (
                <tr key={r.id}>
                  <td>{startIndex + i + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.date}</td>
                  <td>{r.inTime}</td>
                  <td>{r.outTime || "-"}</td>
                  <td>{r.purposeOfVisit}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary">
                      <EditIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AppPagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default Admin;
