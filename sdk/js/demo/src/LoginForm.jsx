import React from "react";
import { Form, Icon, Input, Button,Checkbox } from "antd";
import { reactLocalStorage } from "reactjs-localstorage";

class LoginForm extends React.Component {

  componentDidMount = () => {
    const {form} = this.props;
    console.log("window.location:" + window.location);
    console.log("url:" + window.location.protocol + window.location.host + "  " +  window.location.pathname + window.location.query);

    let params = this.getRequest();

    let roomId = null;
    let displayName = 'Guest';
    let audioOnly = true;

    let localStorage = reactLocalStorage.getObject("loginInfo");

    if(localStorage){
      displayName = localStorage.displayName;
    }

    if (params && params.hasOwnProperty('room')) {
      // TODO: load wave details
      roomId = params.room;
    }

    if (roomId == null) {
      // TODO: Make this cryptographically secure
      roomId = Math.random().toString(36).split(".")[1];
    }

    form.setFieldsValue({
      'roomId': roomId,
      'displayName': displayName,
      'audioOnly': audioOnly,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const handleLogin = this.props.handleLogin;
        handleLogin(values);
        console.log("Received values of form: ", values);
      }
    });
  };

  getRequest() {
    let url = location.search; 
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {getFieldDecorator("roomId", {
            rules: [{ required: true, message: "Please enter your room Id!" }]
          })(
            <Input
              hidden
              placeholder="Room Id"
            />
          )}
        <Form.Item>
          {getFieldDecorator("displayName", {
            rules: [{ required: true, message: "Please enter your Name!" }]
          })(
            <Input
              prefix={
                <Icon type="contacts" className="login-input-icon" />
              }
              placeholder="Display Name"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-join-button">
            go live
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);
export default WrappedLoginForm;
