import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormModal(props) {
    const {btnname,type,id}=props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
    const [user,setuser]=useState({firstname:"",lastname:"",email:"",avatar:""});
    const [error,seterror]=useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlechange=(property,e)=>{
    const usercopy={...user};
    usercopy[property]=e.target.value;
    setuser(usercopy);
  }
  const handlecancle=()=>{
      setOpen(false);
  }
  const handleupdate=()=>{
     
      const userdata={
        first_name:user.firstname,
        last_name:user.lastname,
        email:user.email,
        avatar:user.avatar
       }
    if(!user.firstname || !user.lastname || !user.email || !user.avatar){
        seterror("please provide infromation correct");
        
    }
    else{
      if(type==="post" || user.firstname || user.lastname || user.email || user.avatar){
        setOpen(false);
        seterror("");
          axios.post("https://reqres.in/api/users",userdata)
          .then(response=>{
              console.log(response.data);
              setuser({firstname:"",lastname:"",email:"",avatar:""});
          }
              )
          .catch(error=>console.log(error));
      }
      else if(type==="put" || user.firstname || user.lastname || user.email || user.avatar){
          seterror("");
            axios.put("https://reqres.in/api/users",userdata)
            .then(response=>{
                console.log(response.data);
                setuser({firstname:"",lastname:"",email:"",avatar:""});
            }
                )
            .catch(error=>console.log(error));
      }
      }
  }
  return (
    <div>
      <button type="button" onClick={handleOpen} >
        {btnname}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p>First Name</p>
            <input type="text" value={user.firstname} onChange={(e)=>handlechange("firstname",e)} />
            <p>Last Name</p>
            <input type="text" value={user.lastname} onChange={(e)=>handlechange("lastname",e)}/>
            <p>Email-Id</p>
            <input type="email" value={user.email} onChange={(e)=>handlechange("email",e)}/>
            <p>Avatar</p>
            <input type="text" placeholder="Enter the url of profile image" value={user.avatar} onChange={(e)=>handlechange("avatar",e)} />
            <p>{error}</p>
            <div className="btns">
                <button onClick={handlecancle}>cancel</button>
            <button onClick={handleupdate}>update</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
