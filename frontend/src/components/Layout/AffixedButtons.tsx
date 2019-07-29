import React from "react";
import { Row, Col, Affix, Button, Icon } from "antd";

interface Props {
	leftButtonText: string;
	leftButtonOnClickFunction: any;
	leftButtonIconType: string;
	rightButtonText: string;
	rightButtonOnSubmitFunction: any;
	rightButtonIconType: string;
}

export default function AffixedButtons(props: Props) {
	return (
		<React.Fragment>
			<Row type="flex" justify="end" gutter={8}>
				<Col md={6} sm={8} xs={10}>
					<Affix offsetBottom={10}>
						<Button
							type="primary"
							size="large"
							htmlType="button"
							block
							onClick={props.leftButtonOnClickFunction}
						>
							<Icon type={props.leftButtonIconType} />
							{props.leftButtonText}
						</Button>
					</Affix>
				</Col>
				<Col md={6} sm={8} xs={10}>
					<Affix offsetBottom={10}>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							block
							onSubmit={props.rightButtonOnSubmitFunction}
						>
							<Icon type={props.rightButtonIconType} />
							{props.rightButtonText}
						</Button>
					</Affix>
				</Col>
			</Row>
		</React.Fragment>
	);
}
