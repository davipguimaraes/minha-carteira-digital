import { RepositorioDeSessaoDeUsuario, SessaoDeUsuario } from '.';
import StorageConection from '../../infra/StorageConection';

export default class RepositorioDeSessaoDeUsuarioEmLocalStorage
	implements RepositorioDeSessaoDeUsuario
{
	private storageConnection: StorageConection<SessaoDeUsuario>;

	constructor(_storageConection: StorageConection<SessaoDeUsuario>) {
		this.storageConnection = _storageConection;
	}

	obterSessaoAtual(): Promise<SessaoDeUsuario> {
		return new Promise((resolve) => {
			resolve(this.storageConnection.obter());
		});
	}

	iniciarNovaSessao(idUsuario?: string): Promise<SessaoDeUsuario> {
		const novaSessao = new SessaoDeUsuario(idUsuario);

		this.storageConnection.inserir(novaSessao);

		return new Promise((resolve) => {
			resolve(novaSessao);
		});
	}

	encerrarSessaoAtual(): Promise<void> {
		return new Promise((resolve) => {
			this.storageConnection.inserir(null);
			resolve();
		});
	}
}
