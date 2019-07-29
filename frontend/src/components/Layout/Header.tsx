import * as React from "react";
import { Typography, Button } from "antd";
import "./Header.css";
import { Link } from "react-router-dom";

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
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
		);
	}
}
