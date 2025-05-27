import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Link } from "react-router-dom"
import { CardRegister, SignInContainer } from "../utils/style"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMajor } from '../redux/action/majorAction'
import { authRegister } from '../redux/action/authAction'

const Register = () => {
    const { register, handleSubmit } = useForm()
    const major = useSelector(root => root?.major)
    const auth = useSelector(root => root)
    const dispatch = useDispatch()

    useEffect(() => dispatch(fetchMajor()), [])

    const onSubmit = (value) => dispatch(authRegister(value))

    return (<>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
            <CardRegister variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign Up
                </Typography>
                {
                    auth?.message !== "" && <Alert severity="success">{auth?.message}</Alert>
                }
            
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <TextField
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...register('username')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    placeholder="••••••"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...register('password')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    id="emil"
                                    type="text"
                                    placeholder="Email"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...register('email')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <TextField
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    autoComplete="firstName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...register('firstName')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <TextField
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    autoComplete="lastName"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    {...register('lastName')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth style={{ marginTop: 23 }}>
                                <InputLabel >Classes</InputLabel>
                                <Select
                                    label="Classes"
                                    {...register('classes')}
                                >
                                    <MenuItem value={"X"}>X</MenuItem>
                                    <MenuItem value={"XI"}>XI</MenuItem>
                                    <MenuItem value={"XII"}>XII</MenuItem>
                                    <MenuItem value={"XIII"}>XIII</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth style={{ marginTop: 23 }}>
                                <InputLabel id="demo-simple-select-label-major">Majors</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    {...register('major_id')}
                                    label="Majors"
                                >
                                    {
                                        major?.data?.map((m, i) => <MenuItem
                                            key={i}
                                            value={m?.id}>{m?.name}</MenuItem>)
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth style={{ marginTop: 23 }}>
                                <InputLabel id="demo-simple-select-label-gender">Gender</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Gender"
                                    {...register('gender')}
                                >
                                    <MenuItem value={"M"}>Male</MenuItem>
                                    <MenuItem value={"F"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                    <center>
                        <Link to={"/login"}>
                            Have account?
                        </Link>
                    </center>
                    {!!auth?.err &&
                        !!auth?.err?.errors &&
                        auth?.err?.errors.map((e, i) => (
                            <Typography
                                key={i}
                                variant="body2"
                                color="error"
                                sx={{ textAlign: "center" }}
                            >
                                {e.msg}
                            </Typography>
                        ))}
                </Box>
            </CardRegister>
        </SignInContainer>
    </>)
}

export default Register