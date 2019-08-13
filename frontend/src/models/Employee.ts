import SurveyForm from "./SurveyForm";
import Role from "./Role";
import Evaluation from "./Evaluation";

export default class Employee {
	employeeId?: number;

	name: string;

	username: string;

	password: string;

	confirmPassword: string;

	costCenter: string;

	shift: string;

	role: Role;

	createdSurveyForms?: SurveyForm[];

	receivedEvaluations?: Evaluation[];

	givenEvaluations?: Evaluation[];

	constructor(
		$name: string,
		$username: string,
		$password: string,
		$confirmPassword: string,
		$costCenter: string,
		$shift: string,
		$role: Role
	) {
		this.name = $name;
		this.username = $username;
		this.password = $password;
		this.confirmPassword = $confirmPassword;
		this.costCenter = $costCenter;
		this.shift = $shift;
		this.role = $role;
	}

}
