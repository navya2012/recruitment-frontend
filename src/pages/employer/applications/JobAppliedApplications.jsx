import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllAppliedJobPostsPostedByEmployer } from '../../../api\'s/employerApi\'s'
import TableContainer from '@mui/material/TableContainer';
import { Box, Paper, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, } from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
 fontSize:'16px',
 textAlign:'center',
  fontWeight:'500',

}));

const Headings = [
  { id: 'name', label: 'Employee Name', minWidth: 50},
  { id: 'email', label: 'Email', minWidth: 50 },
  { id: 'companyName', label: 'Company Name', minWidth: 50 },
  { id: 'role', label: 'Role', minWidth: 50},
  { id: 'jobAppliedDate', label: 'Date of Apply', minWidth: 50 }
];


const JobAppliedApplications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await dispatch(getAllAppliedJobPostsPostedByEmployer()); 
        setAppliedJobs(response.data.jobAppliedPostsList);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  };
  return (
    <>
      <Box >
        <Paper elevation={3} sx={{ width: '100%', padding: '60px 40px' }}>
          <Typography variant="h4" sx={{ padding: '20px 40px' }}>Job Posts</Typography>
          <TableContainer  >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Headings.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ 
                        minWidth: column.minWidth,
                        textAlign:'center',
                        fontWeight:'bold',
                        fontSize:'18px',
                        // fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appliedJobs.length > 0 ? (
                  appliedJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, id) => (
                    <TableRow key={id} >
                      <StyledTableCell >
                        {data.firstName === "" ? ("-") : data.firstName}{"  "}
                        {data.lastName === "" ? ("-") : data.lastName}
                      </StyledTableCell>
                      <StyledTableCell >
                        {data.email === "" ? ("-") : data.email} 
                      </StyledTableCell>
                      <StyledTableCell >{data.companyName === "" ? ("-") : data.companyName}</StyledTableCell>
                      <StyledTableCell >{data.role === "" ? ("-") : data.role}</StyledTableCell>
                      <StyledTableCell >
                        {data.jobAppliedDate === "" ? ("-") : formatDate(data.jobAppliedDate)}
                        </StyledTableCell>
                    </TableRow>
                  ))
                ) : ("")}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[ 6, 12, 18]}
            component="div"
            count={appliedJobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          >
          </TablePagination>
        </Paper>
      </Box>

    </>
  )
}

export default JobAppliedApplications