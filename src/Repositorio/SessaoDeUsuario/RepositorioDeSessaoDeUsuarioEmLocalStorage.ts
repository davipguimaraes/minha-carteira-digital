import { RepositorioDeSessaoDeUsuario, SessaoDeUsuario } from '.';
import RepositorioEmSessionStorage from '../RepositorioEmSessionStorage';

const LOCAL_STORAGE_KEY = 'SessaoDeUsuario';

export default class RepositorioDeSessaoDeUsuarioEmLocalStorage
	extends RepositorioEmSessionStorage<SessaoDeUsuario>
	implements RepositorioDeSessaoDeUsuario
{
	constructor() {
		super();
		this.tableName = LOCAL_STORAGE_KEY;
	}

	obterSessaoAtual(): Promise<SessaoDeUsuario> {
		return new Promise((resolve) => {
			resolve(this.obter());
		});
	}

	iniciarNovaSessao(idUsuario?: string): Promise<SessaoDeUsuario> {
		const novaSessao = new SessaoDeUsuario(idUsuario);

		this.inserir(novaSessao);

		return new Promise((resolve) => {
			resolve(novaSessao);
		});
	}

	encerrarSessaoAtual(): Promise<void> {
		return new Promise((resolve) => {
			this.inserir(null);
			resolve();
		});
	}
}
