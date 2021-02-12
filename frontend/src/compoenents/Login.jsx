import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Swal from 'sweetalert2'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [user,setuser]=useState({email:"",password:""});
  const [error,seterror]=useState("");
  const handlechange=(property,e)=>{
      const usercopy={...user};
      usercopy[property]=e.target.value;
      setuser(usercopy);
  }
  const handlesubmit=()=>{
    console.log(user.email);
    if(!user.email ){
        seterror("please enter the valid user EmailId");
    }
    else if(user.password!=="A123"){
        seterror("please enter valid password");
    }
    else{
        seterror("");
        const useremail={
            email:user.email,
            password:user.password
        };
        axios.post("https://reqres.in/api/login",useremail)
        .then(response=>{
            console.log(response.data);
            Swal.fire('Conratulations', 'Successfully signin!', 'success');
            props.history.push("/user/"+user.email);
        })
        .catch(error=>{
            console.log(error);
            Swal.fire('Oops...', 'Something went wrong!', 'error')
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={(e)=>handlechange("email",e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={(e)=>handlechange("password",e)}
          />
          <p>{error}</p>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlesubmit}
          >
            Sign In
          </Button>     
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}