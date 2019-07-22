import SurveyForm from "./SurveyForm";
import Role from "./Role";
import Evaluation from "./Evaluation";

export default class Employee {
	employeeId?: Number;

	name: String;

	username: String;

	password: String;

	costCenter: String;

	shift: String;

	role: Role;

	createdSurveyForms?: SurveyForm[];

	receivedEvaluations?: Evaluation[];

	givenEvaluations?: Evaluation[];

	constructor(
		$name: String,
		$username: String,
		$password: String,
		$costCenter: String,
		$shift: String,
		$role: Role
	) {
		this.name = $name;
		this.username = $username;
		this.password = $password;
		this.costCenter = $costCenter;
		this.shift = $shift;
		this.role = $role;
	}

}
