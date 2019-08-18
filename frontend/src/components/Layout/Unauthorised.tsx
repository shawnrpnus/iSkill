import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

interface Props {}

export const Unauthorised: React.FC<Props> = () => {
	return (
		<Result
			status="403"
			title="Access Denied"
			subTitle="Sorry, you are not authorized to access this page."
			extra={
				<Button type="primary">
					<Link to="/">Back Home</Link>
				</Button>
			}
		/>
	);
};
