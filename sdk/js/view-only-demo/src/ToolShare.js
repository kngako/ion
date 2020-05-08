import React from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { Modal, Button, Tooltip, Input,Icon } from 'antd';
import DotsVerticalIcon from "mdi-react/DotsVerticalIcon";
import ShareIcon from "mdi-react/ShareIcon";

export default class ToolShare extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            invitePresentersVisible: false,
            shareWithAudienceVisible: false,
            application: 'SFU',
         };
    }
    showInvitePresenterModal = () => {
        this.setState({
            invitePresentersVisible: true,
        });

        let loginInfo = this.props.loginInfo;
        let host = window.location.host;
        let url = window.location.protocol + "//" + host + "/live?current=" + loginInfo.roomId;
        this.setState({ url });
    }
    showShareWithAudienceModal = () => {
        this.setState({
            shareWithAudienceVisible: true,
        });

        let loginInfo = this.props.loginInfo;
        let host = window.location.host;
        let url = window.location.protocol + "//" + host + "/current/" + loginInfo.roomId;
        this.setState({ url });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    onFocus = (e) => {
        ReactDOM.findDOMNode(e.target).select();
    }

    render() {
        return (
            <div className="app-header-tool-container">
                <Tooltip title='Share with audience'>
                    <Button ghost size="large" type="link" onClick={this.showShareWithAudienceModal}>
                        <Icon
                            component={ShareIcon}
                            style={{ display: "flex", justifyContent: "center" }}
                        />
                    </Button>
                </Tooltip>
                <Tooltip title='Invite Presenters'>
                    <Button ghost size="large" type="link" onClick={this.showInvitePresenterModal}>
                    <Icon
                        component={DotsVerticalIcon}
                        style={{ display: "flex", justifyContent: "center" }}
                    />
                    </Button>
                </Tooltip>
                <Modal
                    title='Invite Presenters'
                    visible={this.state.invitePresentersVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='Ok'
                    cancelText='Cancel'>
                    <div>
                        <div>
                            <span>be careful who you invite to talk on this broadcast.</span>
                            <Input onFocus={this.onFocus} readOnly={true} value={this.state.url} />
                        </div>
                    </div>
                </Modal>
                <Modal
                    title='Share with audience'
                    visible={this.state.shareWithAudienceVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='Ok'
                    cancelText='Cancel'>
                    <div>
                        <div>
                            <span>Send link to your listeners</span>
                            <Input onFocus={this.onFocus} readOnly={true} value={this.state.url} />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

ToolShare.propTypes = {
    roomInfo: PropTypes.any,
}

