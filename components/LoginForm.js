import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

// Actions
import { login, logout, signup, checkForExpiredToken } from "../redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount = () => {
    this.props.checkForToken();
  };

  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handlelogin = () => {
    this.props.login();
  };

  handlelogout = () => {
    this.props.logout();
  };
  handleSignup = () => {
    this.props.signup();
  };

  render() {
    const { username, password } = this.state;
    console.log(this.state);
    if (this.state.user) {
      return (
        <Container>
          <Header />
          <Content>
            <Button onPress={this.handlelogout}>
              <Text>logout</Text>
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header />
          <Content>
            <Form>
              <Item>
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChangeText={username =>
                    this.handleChange({ username: username })
                  }
                />
              </Item>
              <Item last>
                <Input
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  name="password"
                  onChangeText={password =>
                    this.handleChange({ password: password })
                  }
                />
              </Item>
              <Button onPress={this.handlelogin}>
                <Text>Login</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: (userData, navigation) => dispatch(login(userData, navigation)),
    logout: () => dispatch(logout()),
    signup: (userData, navigation) => dispatch(signup(userData, navigation)),
    checkForToken: navigation => dispatch(checkForExpiredToken(navigation))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
