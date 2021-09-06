import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

import Head from "next/head";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";
import { baseUrl } from "../../utils/baseUrl";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    container: {
        marginTop: theme.spacing(10),
    },
    table: {
        marginTop: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        color: theme.palette.info.main,
    },
    errorMessage: {
        color: theme.palette.error.main,
        margin: 0,
    },
}));

export default function Admin() {
    const classes = useStyles();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseUrl}/admin`)
            .then((res) => {
                setUsers(res.data.users)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [users]);

    return (
        <>
            <Head>
                <title>Admin Page</title>
                <meta
                    name="description"
                    content="Admin Page - Todo App dashboard"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h5">
                            Admin Page
                        </Typography>
                        <Button color="inherit">Log out</Button>
                    </Toolbar>
                </AppBar>
                <Container component="main" className={classes.container}>
                    <Typography component="h1" variant="h6">
                        Registered User
                    </Typography>
                    <TableContainer component={Paper} className={classes.table}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell align="left">Role</StyledTableCell>
                                    <StyledTableCell align="left">Is Active</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <StyledTableRow key={user.email}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{user.role}</StyledTableCell>
                                        <StyledTableCell align="left">{user.isActive}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </body>
        </>
    )
}