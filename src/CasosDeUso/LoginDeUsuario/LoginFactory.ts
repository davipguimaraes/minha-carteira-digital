import SessionStorageConection from '../../infra/SessionStorageConection';
import { RepositorioDeSessaoDeUsuario } from '../../Repositorio/SessaoDeUsuario';
import RepositorioDeSessaoDeUsuarioEmLocalStorage from '../../Repositorio/SessaoDeUsuario/RepositorioDeSessaoDeUsuarioEmLocalStorage';
import { RepositorioDeUsuario } from '../../Repositorio/Usuario';
import RepositorioDeUsuarioEmLocalStorage from '../../Repositorio/Usuario/RepositorioDeUsuarioEmLocalStorage';
import { CodificadorDeStringEmBase64 } from '../../utils/codificarString';
import sha256 from '../../utils/sha256';

export interface loginFactory {
	repositorioDeUsuario: RepositorioDeUsuario;
	preparaSenhaParaPersistencia(text: string): string;
	repositorioDeSessaoDoUsuario: RepositorioDeSessaoDeUsuario;
}

const LoginFactory = (): loginFactory => {
	const preparaSenhaParaPersistencia = sha256;
	const repositorioDeUsuario = new RepositorioDeUsuarioEmLocalStorage(
		new SessionStorageConection(
			window.localStorage,
			'usuarios',
			new CodificadorDeStringEmBase64(),
		),
	);
	const repositorioDeSessaoDoUsuario =
		new RepositorioDeSessaoDeUsuarioEmLocalStorage(
			new SessionStorageConection(
				window.sessionStorage,
				'sessao_usuarios',
				new CodificadorDeStringEmBase64(),
			),
		);

	return {
		repositorioDeUsuario,
		preparaSenhaParaPersistencia,
		repositorioDeSessaoDoUsuario,
	};
};

export default LoginFactory;
