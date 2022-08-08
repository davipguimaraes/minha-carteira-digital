import { Usuario } from '../../Modelo/Usuario';
import { ValdiacaoDeCampos } from '../../utils/Validacao';
import { validadorDeTexto } from '../../utils/Validacao/validadorDeCampo';

const validarUsuario = (usuario: Usuario): ValdiacaoDeCampos => {
	const LOGIN_MIN_LENGTH = 4;
	const LOGIN_REGEX_CARACTERES_PERMITIDOS = /^[a-zA-Z0-9]*$/;

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

	return {
		sucesso: Object.keys(mensagem).length == 0, // todo: refatorar
		mensagem,
	};
};

export default validarUsuario;
