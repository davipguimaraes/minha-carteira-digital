import { CodificadorDeString } from '../utils/codificarString';
import StorageConection from './StorageConection';

export default class SessionStorageConection<T> implements StorageConection<T> {
	private tableName: string;
	private codificadorDeString: CodificadorDeString;

	constructor(tableName: string, codificadorDeString?: CodificadorDeString) {
		this.tableName = tableName;
		this.codificadorDeString = codificadorDeString;
	}

	inserir(novo: T) {
		let dadoEmTexto = JSON.stringify(novo);
		if (this.codificadorDeString) {
			dadoEmTexto = this.codificadorDeString.codificar(dadoEmTexto);
		}

		window.sessionStorage.setItem(this.tableName, dadoEmTexto);
	}

	obter() {
		try {
			let resultado = window.sessionStorage.getItem(this.tableName);
			if (this.codificadorDeString) {
				resultado = this.codificadorDeString.decodificar(resultado);
			}
			return JSON.parse(resultado);
		} catch (error) {
			return undefined;
		}
	}
}
