import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class ProfileIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            ...prevState,
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onSignOutCall = () => {
        fetch('http://192.168.99.100:3001/signout', {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.localStorage.getItem('token')
            }
        }).then(resp => resp.json())
        .then(data => {
            if(data === 'Signout successfully') {
                window.localStorage.removeItem("token");
                this.props.onRouteChange('signout');
            }
        })
        
        
    }

    render() {

        return (
            <div class="pa4 tc">
            <Dropdown style={{marginRight: '70px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
            >
            <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-100 h3 w3 dib" alt="avatar" />
            </DropdownToggle>
            <DropdownMenu className="b--transparent shadow-5" style={{marginTop: '-10px', background: 'rgba(255, 255, 255, 0.5)'}}>
            <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
            <DropdownItem onClick={this.onSignOutCall}>Sign Out</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            </div>

            
            
        )
    }
}

export default ProfileIcon;