import Entity from "$lib/utils/Entity";

export enum Status {
	ACTIVE = "active",
	INACTIVE = "inactive",
	PENDING = "pending",
	BLOCKED = "blocked",
}

export default class Account extends Entity {
	public email!: string;
	public password!: string;
	public alias!: string;
	public status!: string;
	public last_login!: Date;
	public created_at!: Date;
	public updated_at!: Date;

	constructor(
		id?: number,
		email?: string,
		password?: string,
		alias?: string,
		status?: Status,
		last_login?: Date,
		created_at?: Date,
		updated_at?: Date,
	) {
		super();
		const now = new Date();
		this.id = id || 0;
		this.email = email || '';
		this.password = password || '';
		this.alias = alias || '';
		this.status = status || Status.PENDING;
		this.last_login = last_login || now;
		this.created_at = created_at || now;
		this.updated_at = updated_at || now;
	}

	serialize(): string {
		return JSON.stringify({
			id: this.id,
			email: this.email,
			password: this.password,
			alias: this.alias,
			status: this.status,
			last_login: this.last_login,
			created_at: this.created_at,
			updated_at: this.updated_at,
		});
	}
}
