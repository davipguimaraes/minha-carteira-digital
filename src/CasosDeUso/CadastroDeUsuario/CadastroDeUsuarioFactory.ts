import { RepositorioDeUsuario } from '../../Repositorio/Usuario';
import RepositorioDeUsuarioEmLocalStorage from '../../Repositorio/Usuario/RepositorioDeUsuarioEmLocalStorage';

export interface cadastroDeUsuarioFactory {
	repositorioDeUsuario: RepositorioDeUsuario;
}

const CadastroDeUsuarioFactory = (): cadastroDeUsuarioFactory => {
	const repositorioDeUsuario = new RepositorioDeUsuarioEmLocalStorage();

	return {
		repositorioDeUsuario,
	};
};

export default CadastroDeUsuarioFactory;
