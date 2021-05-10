import React from 'react';
import {Card,Table,ButtonGroup,Button,InputGroup,FormControl} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faTrash,faFastForward,faStepForward,faFastBackward, faFilePdf,faTimes,faStepBackward, faUndo,faList,faPrint,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import {Link} from 'react-router-dom';


class DelegationList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            delegations:[],
            search:'',
            currentPage:1,
            delegationsPerPage:5
        };
    }
   
    componentDidMount(){
        this.findAllDelegations();
    }

    
    getPDF=(delegationdId)=>{
        axios.get("http://localhost:8080/pdf/local/"+delegationdId)
        .then(response=>{
            if(response.data!=null){
                this.setState({});
             
                this.setState({
                    
                });
            }
            else{
                this.setState({"GetPDF":false});
            }
        });
    };
    drukPDF=(delegationdId)=>{
        axios.get("http://localhost:8080/pdf/"+delegationdId)
        .then(response=>{
                window.open("http://localhost:8080/pdf/"+delegationdId)
                this.setState({
                   
                });
            
            
        });
    };
 
    changeAcceptDel = (delegationId,userId)=>{
        axios.put("http://localhost:8080/delegations/acc/"+delegationId+"/"+localStorage.getItem('id'))
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
    chagenFinished = (delegationId)=>{
        axios.put("http://localhost:8080/delegations/finished/"+delegationId)
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


    findAllDelegations(){
        axios.get(" http://localhost:8080/delegations/orderByDateStartDesc")
        .then(response=>response.data)
        
        .then((data)=>{
            console.log(data)
            this.setState({delegations: data})
            
        });
        
    }
    deleteDelegation=(delegationdId)=>{
        axios.delete("http://localhost:8080/delegations/deleteDelegations/"+delegationdId)
        .then(response=>{
            if(response.data!=null){
                this.setState({"show":true});
                setTimeout(()=>this.setState({"show":false}),3000);
                this.setState({
                    delegations:this.state.delegations.filter(delegation => delegation.delegationId !== delegationdId)
                });
            }
            else{
                this.setState({"show":false});
            }
        });
    };
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
        if(this.state.currentPage < Math.ceil(this.state.delegations.length/this.state.delegationsPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.delegations.length/this.state.delegationsPerPage)
            });
        }
    };
    nextPage=()=>{
        if(this.state.currentPage < Math.ceil(this.state.delegations.length/this.state.delegationsPerPage)){
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
     
        const columnstyle = {      
         
            height: "500px",
            width: "1900px",
            marginLeft:"-395px"
        };
      
        const{delegations,currentPage,delegationsPerPage,search}=this.state;
        const lastIndex = currentPage * delegationsPerPage;
        const firstIndex= lastIndex-delegationsPerPage;
        const currentDelegations = delegations.slice(firstIndex,lastIndex);
        const totalPages = (delegations.length/delegationsPerPage).toFixed();
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
        const filteredDelegations=currentDelegations.filter(delegation=>{
            return delegation.description.toLowerCase().indexOf(search)!==-1
        })
       
        return(
          
            <div style={columnstyle} >
                 <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Delegation Deleted Successfully."}type={"danger"}/>
                
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <div style={{"float":"left"}}>
                    <FontAwesomeIcon icon= {faList}/> Delegation List(Sorted By Date Start)
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
                <Card.Body >
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Date Time Start</th>
                                <th>Date Time Stop</th>
                                <th>Travel Diet Amount</th>
                                <th>Breakfast Number</th>
                                <th>Dinner Number</th>
                                <th>Supper Number</th>
                                <th>Transport Type</th>
                                <th>Ticket Price Date</th>
                                <th>Auto Capacity</th>
                                <th>Km</th>
                                <th>Accomodation Price</th>
                                <th>Other Tickets Price</th>
                                <th>Other Outlay Desc</th>
                                <th>Other Outlay Price</th>
                                <th>Confirmation</th>
                                <th>Finished Edition</th>
                                <th>Actions</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                        
                        {delegations.length===0 ?
                         
                            <tr align="center">
                                <td colSpan ="22"> Delegations.</td>
                            </tr>:
                           filteredDelegations.map((delegation,index)=>(
                                <tr key={delegation.id}>
                                    <td>{delegation.delegationId}</td>
                                    <td>{delegation.description}</td>
                                    <td>{delegation.dateTimeStart}</td>
                                    <td>{delegation.dateTimeStop}</td>
                                    <td>{delegation.travelDietAmount}</td>
                                    <td>{delegation.breakfastNumber}</td>
                                    <td>{delegation.dinnerNumber}</td>
                                    <td>{delegation.supperNumber}</td>
                                    <td>{delegation.transportType}</td>
                                    <td>{delegation.ticketPrice}</td>
                                    <td>{delegation.autoCapacity}</td>
                                    <td>{delegation.km}</td>
                                    <td>{delegation.accomodationPrice}</td>
                                    <td>{delegation.otherTicketsPrice}</td>
                                    <td>{delegation.otherOutlayDesc}</td>
                                    <td>{delegation.otherOutlayPrice}</td>
                                    <td>{delegation.confirmation.toString()}</td>
                                    <td>{delegation.finishedEdition.toString()}</td>
                                  
                                   
                                   
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editDelegation/"+delegation.delegationId }className= "btn btn-sm btn-outline-primary"><FontAwesomeIcon icon= {faEdit}/></Link>{' '}
                                            <Button size = "sm"variant="outline-danger"onClick={this.deleteDelegation.bind(this,delegation.delegationId)} ><FontAwesomeIcon icon= {faTrash}/></Button>
                                            <Button size = "sm"variant="outline-info"onClick={this.getPDF.bind(this,delegation.delegationId)} ><FontAwesomeIcon icon={faFilePdf}/></Button>
                                            <Button size = "sm"variant="outline-primary"onClick={this.drukPDF.bind(this,delegation.delegationId)} ><FontAwesomeIcon icon={faPrint}/></Button>
                                            <Button size = "sm"variant="outline-success"onClick={this.changeAcceptDel.bind(this,delegation.delegationId,delegation.userId)} ><FontAwesomeIcon icon={faCheckCircle}/></Button>
                                            <Button size = "sm"variant="outline-warning"onClick={this.chagenFinished.bind(this,delegation.delegationId)} ><FontAwesomeIcon icon={faUndo}/></Button>
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
export default DelegationList;