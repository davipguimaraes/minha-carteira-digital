export class SessaoDeUsuario {
	usuarioAutenticado: boolean;
	idUsuario?: string;
	nomeUsuario?: string;

	constructor(idUsuario?: string) {
		this.idUsuario = idUsuario;
		this.usuarioAutenticado = idUsuario != undefined;
	}
}
