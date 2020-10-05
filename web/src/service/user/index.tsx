import React, { Component } from 'react';
import UserService from './user.service';

const UserContext = React.createContext<UserService>(new UserService());
const USER_SERVICE_OBJ = new UserService();
class UserProvider extends Component {
    
    userSrv: UserService = USER_SERVICE_OBJ;
    render() {
        const { children } = this.props;
    
        return (
          <UserContext.Provider value={this.userSrv}>
            {children}
          </UserContext.Provider>
        );
    }
}
export default UserContext;

export { UserProvider };