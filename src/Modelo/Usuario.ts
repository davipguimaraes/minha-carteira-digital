export class Usuario {
	protected _id: string;
	protected _login: string;
	protected _senha?: string;

	public get id(): string {
		return this._id;
	}

	public set id(id: string) {
		this._id = id;
	}

	public get login(): string {
		return this._login;
	}

	public set login(login: string) {
		this._login = login;
	}

	public set senha(senha: string) {
		this._senha = senha;
	}
}
