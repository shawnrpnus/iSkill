import Employee from "./Employee";

export default class Role {
	roleId?: number;

	name: String;

	employees?: Employee[];

	constructor($name: String) {
		this.name = $name;
	}

}
