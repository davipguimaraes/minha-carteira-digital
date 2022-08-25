import { RepositorioDeUsuario } from '.';
import { Usuario } from '../../Modelo/Usuario';
import StorageConection from '../../infra/StorageConection';

export default class RepositorioDeUsuarioEmLocalStorage
	implements RepositorioDeUsuario
{
	private storageConnection: StorageConection<Usuario[]>;

	constructor(_storageConection: StorageConection<Usuario[]>) {
		this.storageConnection = _storageConection;
	}

	private buscarUsuarioLogin(loginProcurado: string) {
		const usuarios = new Set(this.storageConnection.obter());

		let usuario: Usuario;
		usuarios.forEach(({ login, senha, nome, id }) => {
			if (login === loginProcurado) {
				usuario = new Usuario();
				usuario.login = login;
				usuario.senha = senha;
				usuario.nome = nome;
				usuario.id = id;

				return false;
			}
		});

		return usuario;
	}

	criar(login: string, nome: string, senha: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				const usuarioComEsseLogin = this.buscarUsuarioLogin(login);

				if (usuarioComEsseLogin !== undefined)
					reject('Usuário já cadastrado.');
				else {
					let usuarios: Usuario[] =
						this.storageConnection.obter() || [];

					const novoUsuario = new Usuario();
					novoUsuario.login = login;
					novoUsuario.senha = senha;
					novoUsuario.nome = nome;
					novoUsuario.id = `${usuarios.length}`;

					usuarios.push(novoUsuario);
					this.storageConnection.inserir(usuarios);
					resolve();
				}
			} catch (error) {
				reject('Usuário não cadastrado');
			}
		});
	}

	autenticar(login: string, senha: string): Promise<Usuario> {
		return new Promise((resolve, reject) => {
			try {
				const usuarioComEsseLogin = this.buscarUsuarioLogin(login);
				if (senha == usuarioComEsseLogin.senha) {
					const usuario = new Usuario();
					usuario.id = usuarioComEsseLogin.id;

					usuario.login = usuarioComEsseLogin.login;
					usuario.nome = usuarioComEsseLogin.nome;

					resolve(usuario);
				} else {
					throw new Error();
				}
			} catch (error) {
				reject('Login não efetuado');
			}
		});
	}
}
