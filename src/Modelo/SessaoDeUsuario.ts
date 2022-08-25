export class SessaoDeUsuario {
	idUsuario?: string;
	usuarioAutenticado: boolean;

	constructor(idUsuario?: string) {
		this.idUsuario = idUsuario;
		this.usuarioAutenticado = idUsuario != undefined;
	}
}
