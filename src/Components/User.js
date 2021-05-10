import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

class User extends React.Component{

    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.userChange =this.userChange.bind(this);
        this.sumbitUser=this.sumbitUser.bind(this); 
     
    }
    initialState={
        userId:"",companyName:"",companyAddress:"",companyNip:"",name:"",lastName:"",email:"",password:""
    }
    componentDidMount(){
        const userId=+this.props.match.params.id;
        if(userId){
            this.findUserById(userId)
        }
    }
  
    
    resetUser =()=>{
        this.setState(()=>this.initialState);

    }
   
    sumbitUser(event){

        event.preventDefault();

        const user={
            userId: this.state.userId,
            companyName:this.state.companyName,
            companyAddress:this.state.companyAddress,
            companyNip:this.state.companyNip,
            name: this.state.name,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
                    

        };
        axios.post("http://localhost:8080/users/register",user)
        .then(response=>{
            if(response.data!=null){
                this.setState({"show":true});
                setTimeout(()=>this.setState({"show":false}),3000);
            }else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);

    }
    findUserById = (userId)=>{
        axios.put("http://localhost:8080/users/userEdit/"+userId)
        .then(response=>{
            if(response.data!=null){
                this.setState({
                    userId:response.data.userId,
                    companyName:response.data.companyName,
                    companyAddress:response.data.companyAddress,
                    companyNip:response.data.companyNip,
                    name:response.data.name,
                    lastName:response.data.lastName,
                    email:response.data.email,
                    password:response.data.password,
                });
            }
        }).catch((error)=>{
            console.error("Error - " +error);
        });
    }
    userChange(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}

usersList = () =>{
    return this.props.history.push("/listUsers");
};

    render(){
        const mystyle = {      
            height: "500px",
            width: "1400px",
            marginLeft:"-200px"
        };
        const{companyName,companyAddress,companyNip,name,lastName,email,password}=this.state
      
        return(
            <div style={mystyle}>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.userId ?"User Updated Successfully." :"User Saved Successfully." }type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon= {this.state.userId ? faEdit : faPlusSquare}/>{this.state.userId ? "Save User": "Registration"}</Card.Header>   
                    <Form onReset={this.resetUser} onSubmit={this.sumbitUser} id = "zadanieFormId">
                        <Card.Body>
                             <Form.Row>
                                <Form.Group as={Col}controlId="formGridDateOfCreate">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "companyName"
                                        value={companyName}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Company Name"/>
                                </Form.Group>
                                <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Company Address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "companyAddress"
                                        value={companyAddress}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Company Address"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Company NIP</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "companyNip"
                                        value={companyNip}
                                        pattern="^[0-9]{10}$"
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Company NIP"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "name"
                                        value={name}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Name"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "lastName"
                                        value={lastName}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Last Name"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "email"
                                        value={email}
                                        pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Email"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "password"
                                        value={password }
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Password"/>
                                 </Form.Group>
                             </Form.Row>         
                         </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant ="success" type = "submit">
                        <FontAwesomeIcon icon= {faSave}/> {this.state.sutdentId ? "Save": "Save"}
                        </Button>{' '}
                        <Button size="sm" variant ="info" type = "reset">
                            <FontAwesomeIcon icon= {faUndo}/> Reset
                        </Button>
                        {' '}
                        <Button size="sm" variant ="info" type = "button"onClick={this.usersList.bind()}>
                            <FontAwesomeIcon icon= {faList}/> User List
                        </Button>
                       
                    </Card.Footer>
                </Form>
            </Card>
            </div>
            

        );
    }
}
export default User;