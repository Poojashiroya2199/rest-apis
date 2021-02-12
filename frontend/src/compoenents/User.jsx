import React,{useState,useEffect} from "react";
import axios from "axios";
import Dropdown from "./Menu";
// import {Button} from "@material-ui/core";
import FormModal from "./Form";
export default function  User(props){
    const [list,setlist]=useState([]);
    const email=props.match.params.email;
    const name=email.split("@");
    const listuser=async()=>{
        await axios.get("https://reqres.in/api/users?page=2")
        .then(response=>{
            console.log(response.data);
            setlist(response.data.data);
        })
        .catch(err=>console.log(err));
    }
    const handledelete=(id)=>{
        console.log(id);
        axios.delete("https://reqres.in/api/users/"+id)
        .then(function(response){
            console.log(response);
            listuser();
        })
        .catch(function(error){
            console.log(error);
        });
    }
    useEffect(() => {
        listuser();
    }, []);
    return (
        <>
        <header className="header">
            <div>
                Hello {name[0]}
            </div>
            <div>
                <Dropdown email={email} />
            </div>
        </header>
        <div className="adduser">
        <FormModal btnname="Add user" type="post" />
         </div>
         <div className="table">
             <table>
                 <tr>
                     <th>Sr. No.</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email-Id</th>
                     <th>Avatar</th>
                     <th>Update/ Delete</th>
                 </tr>
                 {
                     list.map((user,index)=>(
                         <tr key={user.id}>
                             <td>{index+1}</td>
                             <td>{user.first_name}</td>
                             <td>{user.last_name}</td>
                             <td>{user.email}</td>
                             <td><img src={user.avatar} alt=""/></td>
                             <td className="btns">
                                 <FormModal btnname="Edit" type="put" id={user.id}/>
                                 <button className="deletebtn" onClick={()=>handledelete(user.id)}>
                                    Delete
                                  </button>
                            </td>
                         </tr>
                     ))
                 }
             </table>
         </div>
         <footer>
             <div>Developed By: <strong>Pooja Shiroya</strong></div>
             <div>All rights are reserved </div>
         </footer>
        </>
    )
}