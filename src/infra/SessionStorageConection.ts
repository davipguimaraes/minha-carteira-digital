import StorageConection from './StorageConection';

export default class SessionStorageConection<T> implements StorageConection<T> {
	private tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
	}

	inserir(novo: T) {
		window.sessionStorage.setItem(this.tableName, JSON.stringify(novo));
	}

	obter() {
		const resultado = window.sessionStorage.getItem(this.tableName);

		return JSON.parse(resultado);
	}
}
