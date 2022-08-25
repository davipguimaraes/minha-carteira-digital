import { SessaoDeUsuario } from '../../Modelo/SessaoDeUsuario';

export interface RepositorioDeSessaoDeUsuario {
	obterSessaoAtual(): Promise<SessaoDeUsuario>;

	iniciarNovaSessao(idUsuario?: string): Promise<SessaoDeUsuario>;
	encerrarSessaoAtual(): Promise<void>;
}
