import Employee from "./Employee";

export default class Role {
	roleId?: Number;

	name: String;

	employees?: Employee[];

	constructor($name: String) {
		this.name = $name;
	}

}
