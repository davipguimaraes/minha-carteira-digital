import { Usuario } from '../../Modelo/Usuario';
import { ValdiacaoDeCampos } from '../../utils/Validacao';
import { validadorDeTexto } from '../../utils/Validacao/validadorDeCampo';

const validarUsuario = (usuario: Usuario): ValdiacaoDeCampos => {
	const LOGIN_MIN_LENGTH = 4;
	const LOGIN_REGEX_CARACTERES_PERMITIDOS = /^[a-zA-Z0-9]*$/;

	const SENHA_MIN_LENGTH = 8;

	const NOME_MIN_LENGTH = 2;
	const NOME_MAX_LENGTH = 127;

	const mensagem: {
		[s: string]: string;
	} = {};

	const validacaoDoLogin = validadorDeTexto('login', usuario.login, {
		tamanhoMinimo: LOGIN_MIN_LENGTH,
		obrigatorio: true,
		formato(campo) {
			return LOGIN_REGEX_CARACTERES_PERMITIDOS.test(campo);
		},
	});
	if (!validacaoDoLogin.ehValido) {
		mensagem['login'] = validacaoDoLogin.mensagens.join(', ');
	}

	const validacaoDoSenha = validadorDeTexto('senha', usuario.senha, {
		tamanhoMinimo: SENHA_MIN_LENGTH,
		obrigatorio: true,
	});

	if (!validacaoDoSenha.ehValido) {
		mensagem['senha'] = validacaoDoSenha.mensagens.join(', ');
	}

	const validacaoDoNome = validadorDeTexto('nome', usuario.nome, {
		tamanhoMinimo: NOME_MIN_LENGTH,
		tamanhoMaximo: NOME_MAX_LENGTH,
		obrigatorio: true,
	});

	if (!validacaoDoNome.ehValido) {
		mensagem['nome'] = validacaoDoNome.mensagens.join(', ');
	}

	return {
		sucesso: Object.keys(mensagem).length == 0, // todo: refatorar
		mensagem,
	};
};

export default validarUsuario;
