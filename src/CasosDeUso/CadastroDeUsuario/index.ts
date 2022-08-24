import { Usuario } from '../../Modelo/Usuario';
import CadastroDeUsuarioFactory from './CadastroDeUsuarioFactory';
import validarUsuario from './valdiarUsuario';

export interface CadastroDeUsuarioCDU {
	cadastrarUsuario(usuario: Usuario): Promise<void>;
}

const cadastrarUsuario = async (usuario: Usuario): Promise<void> => {
	const { repositorioDeUsuario, preparaSenhaParaPersistencia } =
		CadastroDeUsuarioFactory();
	try {
		const { sucesso, mensagem } = validarUsuario(usuario);
		if (sucesso) {
			const hashDaSenha = preparaSenhaParaPersistencia(usuario.senha);
			await repositorioDeUsuario.criar(
				usuario.login,
				usuario.nome,
				hashDaSenha,
			);

			return;
		} else {
			const mensagemEmTexto = Object.values(mensagem).join(', ');
			throw Error(mensagemEmTexto);
		}
	} catch (error) {
		throw error;
	}
};

export default cadastrarUsuario;
