import * as React from "react";

export interface ICategoryProps {}

export interface ICategoryState {}

export default class Category extends React.Component<ICategoryProps, ICategoryState> {
	constructor(props: ICategoryProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}
