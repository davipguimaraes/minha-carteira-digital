import { RepositorioDeUsuario } from '.';
import { Usuario } from '../../Modelo/Usuario';

export default class RepositorioDeUsuarioEmLocalStorage
	implements RepositorioDeUsuario
{
	criar(login: string, senha: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
	buscarPorId(userId: string): Promise<Usuario[]> {
		throw new Error('Method not implemented.');
	}
	autenticar(login: string, senha: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
