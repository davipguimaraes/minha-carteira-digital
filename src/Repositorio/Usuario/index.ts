import { Usuario } from '../../Modelo/Usuario';

export interface RepositorioDeUsuario {
	criar(login: string, nome: string, senha: string): Promise<void>;
	autenticar(login: string, senha: string): Promise<Usuario>;
}
