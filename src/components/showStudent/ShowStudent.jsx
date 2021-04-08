import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2';



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});




export default function ShowStudent() {
    const classes = useStyles();


    const [students, setStudents] = useState([]);


    const deleteStudent = async (id) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // remove
                axios.delete(`http://localhost:8000/students/${id}`)
                    .then(() => window.location.reload(false))

                console.log("====sad=====")
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }

    useEffect(() => {
        axios.get("http://localhost:8000/students")
            .then((response) => {
                setStudents(response.data)

            })
    }, []);






    return (
        <div>
            <h2>All Students</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Registration Number</TableCell>
                            <TableCell align="right">Grade</TableCell>
                            <TableCell align="right">Section</TableCell>
                            <TableCell align="right">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student._id}>
                                <TableCell component="th" scope="row">
                                    {student.studentName}
                                </TableCell>
                                <TableCell align="right">{student.regNo}</TableCell>
                                <TableCell align="right">{student.grade}</TableCell>
                                <TableCell align="right">{student.section}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteStudent(student._id)}>
                                        <DeleteIcon fontSize="small" color="primary" />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

