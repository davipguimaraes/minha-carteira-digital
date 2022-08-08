export class SessaoDeUsuario {
	idUsuario?: string;
	usuarioAutenticado: boolean;

	constructor(idUsuario?: string) {
		this.idUsuario = idUsuario;
		this.usuarioAutenticado = idUsuario != undefined;
	}
}

export interface RepositorioDeSessaoDeUsuario {
	obterSessaoAtual(): Promise<SessaoDeUsuario>;

	iniciarNovaSessao(idUsuario?: string): Promise<SessaoDeUsuario>;
	encerrarSessaoAtual(): Promise<void>;
}
