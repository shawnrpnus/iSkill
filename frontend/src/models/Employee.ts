import SurveyForm from "./SurveyForm";
import Role from "./Role";
import Evaluation from "./Evaluation";

export default class Employee {
	private employeeId?: Number;

	private name: String;

	private username: String;

	private password: String;

	private costCenter: String;

	private shift: String;

	private role: Role;

	private createdSurveyForms?: SurveyForm[];

	private receivedEvaluations?: Evaluation[];

	private givenEvaluations?: Evaluation[];

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

	/**
	 * Getter $name
	 * @return {String}
	 */
	public get $name(): String {
		return this.name;
	}

	/**
	 * Getter $username
	 * @return {String}
	 */
	public get $username(): String {
		return this.username;
	}

	/**
	 * Getter $password
	 * @return {String}
	 */
	public get $password(): String {
		return this.password;
	}

	/**
	 * Getter $costCenter
	 * @return {String}
	 */
	public get $costCenter(): String {
		return this.costCenter;
	}

	/**
	 * Getter $shift
	 * @return {String}
	 */
	public get $shift(): String {
		return this.shift;
	}

	/**
	 * Getter $role
	 * @return {Role}
	 */
	public get $role(): Role {
		return this.role;
	}

	/**
	 * Setter $name
	 * @param {String} value
	 */
	public set $name(value: String) {
		this.name = value;
	}

	/**
	 * Setter $username
	 * @param {String} value
	 */
	public set $username(value: String) {
		this.username = value;
	}

	/**
	 * Setter $password
	 * @param {String} value
	 */
	public set $password(value: String) {
		this.password = value;
	}

	/**
	 * Setter $costCenter
	 * @param {String} value
	 */
	public set $costCenter(value: String) {
		this.costCenter = value;
	}

	/**
	 * Setter $shift
	 * @param {String} value
	 */
	public set $shift(value: String) {
		this.shift = value;
	}

	/**
	 * Setter $role
	 * @param {Role} value
	 */
	public set $role(value: Role) {
		this.role = value;
	}
}
