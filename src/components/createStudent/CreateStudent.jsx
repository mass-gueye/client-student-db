import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
}));

export default function CreateStudent() {
    const classes = useStyles();
    const [student, setStudent] = useState({
        regNo: 0,
        studentName: "Jonh Doe",
        grade: "5th",
        section: "A",
    });

    const handleChange = (e) => {
        switch (e.target.id) {
            case "standard-basic regNo":
                setStudent({
                    ...student, regNo: e.target.value,
                })
                break;
            case "standard-basic name":

                setStudent({
                    ...student, studentName: _.capitalize(e.target.value),
                })
                break;
            case "standard-basic grade":
                setStudent({
                    ...student, grade: e.target.value,
                })
                break;
            case "standard-basic section":
                setStudent({
                    ...student, section: e.target.value.toUpperCase(),
                })
                break;
            default:
                console.log("Not there", e.target.id)
                break;
        }
    };

    const handleCreation = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Student will be created!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5cb85c',
            cancelButtonColor: '#d9534f',
            confirmButtonText: 'Create!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8000/students', student)
                    .then(() => {
                        window.location.reload(false)
                    })
                Swal.fire(
                    'Created!',
                    'Student  has been created.',
                    'success'
                )
            }
        })


    }



    return (
        <div>
            <h2>Create Student</h2>
            <form className={classes.root} noValidate autoComplete="off" action="POST">
                <TextField id="standard-basic regNo" label="Registration No" value={student.regNo} onChange={handleChange} required />
                <TextField id="standard-basic name" label="Name" value={student.studentName} onChange={handleChange} required />
                <TextField id="standard-basic grade" label="Grade" value={student.grade} onChange={handleChange} required />
                <TextField id="standard-basic section" label="Section" value={student.section} onChange={handleChange} required />

                <Button variant="contained" color="secondary" onClick={handleCreation}>Create</Button>
            </form>
        </div>
    );
}
