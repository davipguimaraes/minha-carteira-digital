import { Usuario } from '../../Modelo/Usuario';

export interface RepositorioDeUsuario {
	criar(login: string, senha: string): Promise<void>;
	buscarPorId(userId: string): Promise<Usuario[]>;
	autenticar(login: string, senha: string): Promise<boolean>;
}
