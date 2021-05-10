import React, {  } from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';




  

class Delegation extends React.Component{


    constructor(props){
        super(props);
        this.state = {value: 'coconut'};
        this.state=this.initialState;
        this.state.show=false;
        this.delegationChange =this.delegationChange.bind(this);
        this.sumbitDelegation=this.sumbitDelegation.bind(this); 
     
    }
    initialState={
        delegationId:"",description:"",dateTimeStart:"",dateTimeStop:"",travelDietAmount:"",breakfastNumber:"",dinnerNumber:"",
        supperNumber:"",transportType:"",ticketPrice:"",autoCapacity:"",km:"",accomodationPrice:"",otherTicketsPrice:"",
        otherOutlayDesc:"",otherOutlayPrice:"",user:""
    }
    componentDidMount(){
        const delegationId=+this.props.match.params.id;
        if(delegationId){
            this.findDelegationById(delegationId)
        }
    }
  
    
    resetDelegation =()=>{
        this.setState(()=>this.initialState);

    }
   
    sumbitDelegation(event){

        event.preventDefault();

        const delegation={
            delegationId: this.state.delegationId,
            description:this.state.description,
            dateTimeStart:this.state.dateTimeStart,
            dateTimeStop:this.state.dateTimeStop,
            travelDietAmount: this.state.travelDietAmount,
            breakfastNumber:this.state.breakfastNumber,
            dinnerNumber:this.state.dinnerNumber,
            supperNumber:this.state.supperNumber,
            otherOutlayPrice:this.state.otherOutlayPrice,
            transportType:this.state.transportType,
            ticketPrice:this.state.ticketPrice,
            autoCapacity:this.state.autoCapacity,
            km:this.state.km,
            accomodationPrice:this.state.accomodationPrice,
            otherTicketsPrice:this.state.otherTicketsPrice,
            otherOutlayDesc:this.state.otherOutlayDesc,
            user:this.state.user
            
                    

        };
        axios.post("http://localhost:8080/users/setDelegation/"+delegation.user,delegation)
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
   
    findDelegationById = (delegationId)=>{
        axios.put("http://localhost:8080/delegations/delegationEdit/"+delegationId)
        .then(response=>{
            if(response.data!=null){
                this.setState({
                    delegationId:response.data.delegationId,
                    description:response.data.description,
                    dateTimeStart:response.data.dateTimeStart,
                    dateTimeStop:response.data.dateTimeStop,
                    travelDietAmount:response.data.travelDietAmount,
                    breakfastNumber:response.data.breakfastNumber,
                    dinnerNumber:response.data.dinnerNumber,
                    supperNumber:response.data.supperNumber,
                    otherOutlayPrice:response.data.otherOutlayPrice,
                    transportType:response.data.transportType,
                    ticketPrice:response.data.ticketPrice,
                    autoCapacity:response.data.autoCapacity,
                    km:response.data.km,
                    accomodationPrice:response.data.accomodationPrice,
                    otherTicketsPrice:response.data.otherTicketsPrice,
                    otherOutlayDesc:response.data.otherOutlayDesc,
                    user:response.data.user
                });
            }
        }).catch((error)=>{
            console.error("Error - " +error);
        });
    }
    delegationChange(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}

delegationList = () =>{
    return this.props.history.push("/listDelegations");
};



    render(){
        
        const style1 = {      
         
            height: "500px",
            width: "1900px",
            marginLeft:"-395px"
        };
        const columnstyle={
           top:"24px"
            
        }
       
        const{description,dateTimeStop,travelDietAmount,breakfastNumber,dinnerNumber,
        supperNumber,transportType,ticketPrice,autoCapacity,km,accomodationPrice,otherTicketsPrice,
        otherOutlayDesc,otherOutlayPrice,user}=this.state
       
      
        return(
            <div style={style1}>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.delegationId ?"Delegation Updated Successfully." :"Delegation Saved Successfully." }type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon= {this.state.userId ? faEdit : faPlusSquare}/>{this.state.userId ? "Save Delegation": "Registration Delegation"}</Card.Header>   
                    <Form onReset={this.resetDelegation} onSubmit={this.sumbitDelegation} id = "zadanieFormId">
                        <Card.Body >
                        
                             <Form.Row>
                                <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfCreate">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "description"
                                        value={description}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Description"
                                        />
                                </Form.Group>
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Date Time Stop</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "dateTimeStop"
                                        value={dateTimeStop}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Date Time Stop"/>
                                 </Form.Group>
                                 <Form.Group  as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Travel Diet Amount</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "travelDietAmount"
                                        value={travelDietAmount}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Travel Diet Amount"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Breakfast Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "breakfastNumber"
                                        value={breakfastNumber}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Breakfast Number"/>
                                 </Form.Group>
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Dinner Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "dinnerNumber"
                                        value={dinnerNumber}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Dinner Number"/>
                                 </Form.Group>
                                 <Form.Group  as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Supper Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "supperNumber"
                                        value={supperNumber }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Supper Number"/>
                                 </Form.Group>
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Transport Type</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "transportType"
                                        value={transportType}
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        pattern="(Auto|Bus|Train)"
                                        title="U must choose: Auto or Bus or Train" 
                                        placeholder="Transport Type"/>
                                 </Form.Group>
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Ticket Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "ticketPrice"
                                        value={ticketPrice }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Ticket Price"/>
                                 </Form.Group>
                                  <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Auto Capacity</Form.Label>
                                    <Form.Control  required autoComplete="off"
                                        type="text"
                                        name = "autoCapacity"
                                        value={autoCapacity }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        pattern="(Up|Down)"
                                        title="U must choose: Up or Down" 
                                        placeholder="Auto Capacity"/>
                                 </Form.Group> 
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>KM</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "km"
                                        value={km }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="KM"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Accomodation Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "accomodationPrice"
                                        value={accomodationPrice }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Accomodation Price"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Other Tickets Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "otherTicketsPrice"
                                        value={otherTicketsPrice }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Other Tickets Price"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Other Outlay Desc</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "otherOutlayDesc"
                                        value={otherOutlayDesc }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Other Outlay Desc"/>
                                 </Form.Group>
                                 <Form.Group as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>Other Outlay Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "otherOutlayPrice"
                                        value={otherOutlayPrice }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Other Outlay Price"/>
                                 </Form.Group>
                                 <Form.Group style={columnstyle} as={Col}controlId="formGridDateOfImplementation">
                                    <Form.Label>User Id</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text"
                                        name = "user"
                                        value={user }
                                        onChange={this.delegationChange}
                                        className={"bg-dark text-white"}
                                        placeholder="User Id"/>
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
                        <Button size="sm" variant ="info" type = "button"onClick={this.delegationList.bind()}>
                            <FontAwesomeIcon icon= {faList}/> Delegation List
                        </Button>
                       
                    </Card.Footer>
                </Form>
            </Card>
            </div>
            

        );
    }
}

export default Delegation;