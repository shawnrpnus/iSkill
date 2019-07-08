import * as React from "react";
import { Typography } from "antd";
import "./Header.css";

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
	constructor(props: IHeaderProps) {
		super(props);

		this.state = {};
	}

	public render() {
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
