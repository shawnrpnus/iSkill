import React from "react";
import { Row, Col, Typography } from "antd";

interface Props {
	children: any;
}

export default function PageTitle(props: Props) {
	return (
		<Row>
			<Col span={24}>
				<Typography.Title style={{ textAlign: "center" }}>{props.children}</Typography.Title>
				<hr />
			</Col>
		</Row>
	);
}
