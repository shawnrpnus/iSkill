import * as React from "react";
import { Typography, Button, Menu, Icon, Row, Col } from "antd";
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
		return (
			<div>
				<span className="headerText" style={{ height: "100%" }}>
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
				</span>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.employee.user
});

export default connect(mapStateToProps)(Header);
