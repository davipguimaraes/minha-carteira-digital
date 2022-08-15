export class Usuario {
	protected _id: string;
	protected _login: string;
	protected _senha?: string;
	protected _nome: string;

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

	public get nome(): string {
		return this._nome;
	}

	public set nome(nome: string) {
		this._nome = nome;
	}

	public set senha(senha: string) {
		this._senha = senha;
	}

	public get senha() {
		return this._senha;
	}
}
