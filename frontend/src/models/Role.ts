import Employee from "./Employee";

export default class Role {
	private roleId?: Number;

	private name: String;

	private employees?: Employee[];

	constructor($name: String) {
		this.name = $name;
	}

	/**
	 * Getter $name
	 * @return {String}
	 */
	public get $name(): String {
		return this.name;
	}

	/**
	 * Setter $name
	 * @param {String} value
	 */
	public set $name(value: String) {
		this.name = value;
	}
}
