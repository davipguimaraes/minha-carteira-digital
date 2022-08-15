import { RepositorioDeUsuario } from '../../Repositorio/Usuario';
import RepositorioDeUsuarioEmLocalStorage from '../../Repositorio/Usuario/RepositorioDeUsuarioEmLocalStorage';
import sha256 from '../../utils/sha256';

export interface cadastroDeUsuarioFactory {
	repositorioDeUsuario: RepositorioDeUsuario;
	preparaSenhaParaPersistencia(text: string): string;
}

const CadastroDeUsuarioFactory = (): cadastroDeUsuarioFactory => {
	const repositorioDeUsuario = new RepositorioDeUsuarioEmLocalStorage();
	const preparaSenhaParaPersistencia = sha256;

	return {
		repositorioDeUsuario,
		preparaSenhaParaPersistencia,
	};
};

export default CadastroDeUsuarioFactory;
