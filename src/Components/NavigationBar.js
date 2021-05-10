
import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{


    render(){
       
        return(
            <Navbar bg = "dark" variant="dark">
                <Nav className="mr-auto">
                <Link to={"addUser"}className= "nav-link">Register User</Link>
                <Link to={"addDelegation"}className= "nav-link">Register Delegation</Link>
                <Link to={"listUsers"}className= "nav-link">List Users</Link>
                <Link to={"listDelegations"}className= "nav-link">List Delegations</Link>
                <Link to={"changePass"}className= "nav-link">Change Password</Link>
                <Link to={"changeAccept"}className= "nav-link">Change Accept Delegation</Link>
               
                </Nav>
           </Navbar>
        );

}

}
export default NavigationBar;