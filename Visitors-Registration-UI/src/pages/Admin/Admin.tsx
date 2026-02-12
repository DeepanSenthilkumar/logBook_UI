import { useState, useEffect, useMemo } from "react";
import AppPagination from "../../components/Pagination/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import styles from './Admin.module.css'
import api from '../../service/api.service.ts'
import Button from "../../components/buttons/buttons.tsx";

const pageSize = 10;

function Admin() {
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  // const [visitors, setVisitors] = useState<any>({ data: [], totalPages: 0, totalRecords: 0, pageNumber: 1, pageSize: 10 });
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [editedOutTime, setEditedOutTime] = useState("");
  const [originalOutTime, setOriginalOutTime] = useState("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, dateFilter]);

  useEffect(() => {
    if (!isEditMode) {
      getVisitors();
    }
  }, [currentPage, debouncedSearch, dateFilter]);

  // useEffect(() => {
  //   if (selectedVisitor) {
  //     const val = selectedVisitor.outTime || "";
  //     setEditedOutTime(val);
  //     setOriginalOutTime(val);
  //   }
  // }, [selectedVisitor]);

  const getVisitors = async () => {
    debugger
    try {
      const requestBody = {
        pageNumber: currentPage,
        pageSize: pageSize,
        searchName: debouncedSearch,
        date: dateFilter
      };

      const res = (await api.getVisitors(requestBody)) as any;
      console.log(res);
      if (res) {
        debugger
        setPaginatedData(res.data ?? []) 
        setTotalPages(res?.totalPages?? 1);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const changeToEdit = (selectedData: any)=> {
    setSelectedVisitor(selectedData);
    setEditedOutTime(selectedData.outTime?? "");
    setOriginalOutTime(selectedData.outTime?? "");
    setIsEditMode(true);
  }

  const validateTime = (value: string) => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

    if (!value.trim()) {
      setTimeError("Out time is required");
      return false;
    }

    if (!regex.test(value)) {
      setTimeError("Prefered format hh:mm AM");
      return false;
    }

    setTimeError("");
    return true;
  };

  const handleOutTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEditedOutTime(val);
    validateTime(val);
  };

  const cancelEdit = () => {
    setSelectedVisitor(null);
    setIsEditMode(false);
  }

  const updateOutTime = async() => {
    try {
      const requestBody = {
        "outTime": editedOutTime
      }

      const response = (await api.updateTimeById(selectedVisitor.visitorId, requestBody)) as any;
      if (response.updated) {
        getVisitors();
        cancelEdit();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isChanged = useMemo(() => {
    return ( editedOutTime.trim() !== originalOutTime.trim() && !timeError && editedOutTime.trim() !== "" );
  }, [editedOutTime, originalOutTime, timeError]);

  return (
    <>
    {!isEditMode ? (
      <div className={`container-fluid py-5 ${styles.Admin}`} >
        <h2> Welcome to iCodex. Please Enter your details </h2>

        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <input className="form-control" placeholder="Search name or purpose" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>

          <div className="col-12 col-md-6">
            <input type="date" className="form-control" value ={dateFilter} 
              onInput={(e) => { const value = (e.target as HTMLInputElement).value; 
                if (value === "" || value.length === 10) {
                  setDateFilter(value);
                }
              }} />
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
              {paginatedData.length > 0 ? ( paginatedData.map((r) => (
                  <tr key={r._id}>
                    <td>{r.filterCount}</td>
                    <td>{r.firstName} {r.lastName}</td>
                    <td>{r.visitDate?.split("T")[0]}</td>
                    <td>{r.inTime}</td>
                    <td>{r.outTime || "-"}</td>
                    <td>{r.purposeOfVisit}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => changeToEdit(r)}>
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
      ) : (
        <div className={`container-fluid py-5 ${styles.Admin}`}>
          <h2 className="mb-4">Edit Visitor</h2>

          <div className={`card p-4 shadow-sm ${styles.editCard}`}>
            <div className={`row mb-3 ${styles.fieldGap}`}>
              <div className="col-md-6"><strong>Name:</strong> {selectedVisitor?.firstName} {selectedVisitor?.lastName}</div>
              <div className="col-md-6"><strong>Mobile:</strong> {selectedVisitor?.mobileNumber}</div>
            </div>

            <div className={`row mb-3 ${styles.fieldGap}`}>
              <div className="col-md-6"><strong>Date:</strong> {selectedVisitor?.visitDate?.split("T")[0]}</div>
              <div className="col-md-6"><strong>InTime:</strong> {selectedVisitor?.inTime}</div>
            </div>

            <div className={`${styles.inputDiv}`}>
              <div className={`fw-semibold ${styles.formLable}`}>OutTime:</div>

              <div>
                <input type="text" className={`form-control ${styles.fieldWidth}`} value={editedOutTime} 
                  onChange={handleOutTimeChange} placeholder="Please enter OutTime" />

                {timeError && ( <small className="text-danger">{timeError}</small> )}
              </div>
            </div>

            <div className={`${styles.buttonRow} mt-4`}>
              <Button variant="admin-landing btn-size" text="Cancel" onClick={() => cancelEdit()} />

              <Button variant="visitor-landing btn-size" text="Update" disabled={!isChanged} 
                onClick={() => { if (!validateTime(editedOutTime)) return; updateOutTime(); }} />
            </div>
          </div>
        </div>

      )}
    </>
  );
}

export default Admin;
