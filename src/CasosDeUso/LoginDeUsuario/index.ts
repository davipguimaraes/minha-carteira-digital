import { SessaoDeUsuario } from '../../Modelo/SessaoDeUsuario';
import LoginFactory from './LoginFactory';

export interface LoginCDU {
	efetuarLogin(login: string, senhaCrua: string): Promise<SessaoDeUsuario>;
	efetuarLogout(): Promise<void>;
	obterSessaoAtual(): Promise<SessaoDeUsuario>;
}

const efetuarLogin = async (
	login: string,
	senha: string,
): Promise<SessaoDeUsuario> => {
	const {
		repositorioDeUsuario,
		preparaSenhaParaPersistencia,
		repositorioDeSessaoDoUsuario,
	} = LoginFactory();

	try {
		const hashDaSenha = preparaSenhaParaPersistencia(senha);

		const usuario = await repositorioDeUsuario.autenticar(
			login,
			hashDaSenha,
		);

		await repositorioDeSessaoDoUsuario.iniciarNovaSessao(usuario.id);
		return await obterSessaoAtual();
	} catch (error) {
		throw error;
	}
};

const efetuarLogout = async (): Promise<void> => {
	const { repositorioDeSessaoDoUsuario } = LoginFactory();
	try {
		await repositorioDeSessaoDoUsuario.encerrarSessaoAtual();
	} catch (error) {
		throw error;
	}
};

const obterSessaoAtual = async (): Promise<SessaoDeUsuario> => {
	const { repositorioDeSessaoDoUsuario, repositorioDeUsuario } =
		LoginFactory();
	const sessao = await repositorioDeSessaoDoUsuario.obterSessaoAtual();

	if (sessao.usuarioAutenticado) {
		sessao.nomeUsuario = (
			await repositorioDeUsuario.obterUsuarioParaSessao(sessao.idUsuario)
		).nome;
	}
	return sessao;
};

export { efetuarLogin, efetuarLogout, obterSessaoAtual };
