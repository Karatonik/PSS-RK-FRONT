import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

class ChangePass extends React.Component{

    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.userChange =this.userChange.bind(this);
        this.sumbitUser=this.sumbitUser.bind(this); 
     
    }
    initialState={
        userId:"",newPassword:""
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
            newPassword:this.state.newPassword,
            userId: this.state.userId
           
           
            
          

        };
        axios.post("http://localhost:8080/users/changePassword/"+user.userId +"/"+ user.newPassword,user)
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
        const{userId,newPassword}=this.state
      
        return(
            <div style={mystyle}>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.userId ?"Password Changed Successfully." :"Password Changed Successfully." }type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon= {this.state.userId ? faEdit : faPlusSquare}/>{this.state.userId ? "Save User": "Changing Password"}</Card.Header>   
                    <Form onReset={this.resetUser} onSubmit={this.sumbitUser} id = "zadanieFormId">
                        <Card.Body>
                             <Form.Row>
                                <Form.Group as={Col}controlId="formGridDateOfCreate">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "userId"
                                        value={userId}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="User ID"/>
                                </Form.Group>
                                <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="password"
                                        name = "newPassword"
                                        value={newPassword}
                                        onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                        title="Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                                        placeholder="New Password"/>
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
export default ChangePass;