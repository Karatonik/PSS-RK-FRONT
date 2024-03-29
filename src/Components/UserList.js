import React from 'react';
import {Card,Table,ButtonGroup,Button,InputGroup,FormControl} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faUser,faFastForward,faStepForward,faFastBackward, faTrash,faTimes,faStepBackward,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import {Link} from 'react-router-dom';


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            users:[],
            search:'',
            currentPage:1,
            usersPerPage:5
        };
    }
   
    componentDidMount(){
        this.findAllUsers();
    }

    



    findAllUsers(){
        axios.get("https://pssrk2021-api.herokuapp.com/users/")
        .then(response=>response.data)
        .then((data)=>{
            this.setState({users: data})
            console.log(data)
        });
      
    }
    deleteUser=(userId)=>{
        axios.delete("https://pssrk2021-api.herokuapp.com/users/deleteUser/"+userId)
        .then(response=>{
            if(response.data!=null){
                this.setState({"show":true});
                setTimeout(()=>this.setState({"show":false}),3000);
                this.setState({
                    users:this.state.users.filter(user => user.userId !== userId)
                });
            }
            else{
                this.setState({"show":false});
            }
        });
    };

    setUserAsAdmin = (userId)=>{
        axios.put("https://pssrk2021-api.herokuapp.com/users/setadmin/"+localStorage.getItem('id')+"/"+userId)
        .then(response=>{
            if(response.data!=null){
                this.setState({
                    
                });
                window.location.reload();
            }
            console.log(response)
        }).catch((error)=>{
            console.error("Error - " +error);
        });
    }

    changePage = event=>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };
    firstPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:1
            });
        }
    };
    prevPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:this.state.currentPage-1
            });
        }
    };
    lastPage=()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.users.length/this.state.usersPerPage)
            });
        }
    };
    nextPage=()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:this.state.currentPage+1
            });
        }
    };

   updateSearch(event){
       this.setState({search:event.target.value.substr(0,20)})
   }
    cancelSearch = ()=>{
        this.setState({"search":''})
    }

    onChange=e=>{
        this.setState({search:e.target.value})
    }
    render(){
        const mystyle = {      
         
            height: "500px",
            width: "1700px",
            marginLeft:"-300px"
        };
        const{users,currentPage,usersPerPage,search}=this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex= lastIndex-usersPerPage;
        const currentUsers = users.slice(firstIndex,lastIndex);
        const totalPages = (users.length/usersPerPage).toFixed();
        const pageNumCss={
            width :"45px",
            border:"1px solid  #17A2B8",
            color:"#17A2B8",
            textAlign:"center",
            fontWeight:"bold"
        };
        const infoBorder={
            border:"1px solid #17A2B8"
        }
        const filteredUsers=currentUsers.filter(user=>{
            return user.name.toLowerCase().indexOf(search)!==-1
        })
       
        return(
          
            <div style={mystyle}>
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"User Deleted Successfully."}type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                    <FontAwesomeIcon icon= {faUser}/> User List
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name = "search" className={" bg-dark text-white"}
                             style={infoBorder}
                            onChange={this.onChange}/>
                            <InputGroup.Append>
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                            <FontAwesomeIcon icon= {faTimes}/>
                                </Button>
                            </InputGroup.Append>
                    </InputGroup>
                    </div>
                   </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Company Address</th>
                                <th>Company NIP</th>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.length===0 ?
                            <tr align="center">
                                 <td colSpan ="22"> Users.</td>
                            </tr>:
                           filteredUsers.map((user,index)=>(
                                <tr key={user.id}>
                                    <td>{user.userId}</td>
                                    <td>{user.companyName}</td>
                                    <td>{user.companyAddress}</td>
                                    <td>{user.companyNip}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.status.toString()}</td>
                                    <td>{user.registrationDate}</td>
                                   
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"edit/"+user.userId }className= "btn btn-sm btn-outline-primary"><FontAwesomeIcon icon= {faEdit}/></Link>{' '}
                                            <Button size = "sm"variant="outline-danger"onClick={this.deleteUser.bind(this,user.userId)} ><FontAwesomeIcon icon= {faTrash}/></Button>
                                            <Button size = "sm"variant="outline-success"onClick={this.setUserAsAdmin.bind(this,user.userId,user.userId)} ><FontAwesomeIcon icon={faCheckCircle}/></Button>
                                        </ButtonGroup>
                                    </td>
                                    
                                </tr>
                            ))
                            
                         }
                        </tbody>

                    </Table>
                </Card.Body>
                <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage===1 ? true: false}
                                    onClick={this.firstPage}>
                                    <FontAwesomeIcon icon= {faFastBackward}/>  First
                                    </Button>
                                    <Button type="button" variant="outline-info"disabled={currentPage===1 ? true: false}
                                    onClick={this.prevPage}>
                                    <FontAwesomeIcon icon= {faStepBackward}/>  Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} className={"bg-dark"} name ="currentPage" value={currentPage}
                                onChange={this.changePage}/>
                                <InputGroup.Append>
                                <Button type="button" variant="outline-info"disabled={currentPage===totalPages ? true: false}
                                onClick={this.nextPage}>
                                <FontAwesomeIcon icon= {faStepForward}/>Next
                                    </Button>
                                    <Button type="button" variant="outline-info"disabled={currentPage===totalPages ? true: false}
                                    onClick={this.lastPage}>
                                    <FontAwesomeIcon icon= {faFastForward}/>Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                </Card.Footer>

           </Card>

            </div>
          
        );
    }
}
export default UserList;