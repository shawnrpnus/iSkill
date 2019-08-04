import * as React from "react";
import { Typography, Button, Menu, Icon } from "antd";
import "./Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Employee from "../../models/Employee";

export interface IHeaderProps {
	user: Employee;
}

export interface IHeaderState {}

class Header extends React.Component<IHeaderProps, IHeaderState> {
	constructor(props: IHeaderProps) {
		super(props);

		this.state = {};
	}

	public render() {
		// const userLinks: any = (<Button style={{
		// 	position: "absolute",
		// 	right: "10px",
		// 	top: "10px"
		// }}>
		// 	<Link to="/logout">Login</Link>
		// </Button>);
		// const guestLinks : any =(<Button style={{
		// 	position: "absolute",
		// 	right: "10px",
		// 	top: "10px"
		// }}>
		// 	<Link to="/login">Login</Link>
		// </Button>);
		return (
			<div>
				<div className="headerText" style={{ height: "100%" }}>
					<Typography.Title
						style={{
							color: "white",
							marginBottom: 0,
							height: "100%",
							lineHeight: "64px"
						}}
					>
						iSkill
					</Typography.Title>
				</div>
				{this.props.user && this.props.user.name ? (
					<div style={{ textAlign: "right" }}>
						<Menu theme="dark" mode="horizontal">
							<Menu.Item>
								<Icon type="user" />
								<span>{this.props.user.name}</span>
							</Menu.Item>
							<Menu.Item>
								<span>Logout</span>
							</Menu.Item>
						</Menu>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.employee.user
});

export default connect(mapStateToProps)(Header);
