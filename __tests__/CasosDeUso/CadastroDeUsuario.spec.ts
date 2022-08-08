import validarUsuario from '../../src/CasosDeUso/CadastroDeUsuario/valdiarUsuario';
import { Usuario } from '../../src/Modelo/Usuario';

describe('Cadastro de usuario', () => {
	it('Cadastro com sucesso', () => {
		const usuario = new Usuario();
		usuario.login = 'usuario';
		usuario.senha = '12345678';

		const validacao = validarUsuario(usuario);
		expect(validacao.sucesso).toBeTruthy();
	});

	it.each([['usuario'], ['1usu'], ['12344']])(
		'Deve aceitar login %s é %s',
		(login) => {
			const usuario = new Usuario();
			usuario.login = login;
			usuario.senha = '12345678';

			const { sucesso } = validarUsuario(usuario);

			expect(sucesso).toBeTruthy();
		},
	);

	it.only.each([
		['', 'obrigatório'],
		['usu', 'deve ter mais de 4 caracteres'],
		['us ua', 'invalido'],
		['usar*', 'invalido'],
		['usard)', 'invalido'],
		['usário)', 'invalido'],
		["<script>alert('oi')</script>", 'invalido'],
		[null, 'é obrigatório'],
		[undefined, 'é obrigatório'],
	])('Erro no login "%s" é %s', (login, saida) => {
		const usuario = new Usuario();
		usuario.login = login;
		usuario.senha = '12345678';

		const { sucesso, mensagem } = validarUsuario(usuario);

		expect(sucesso).toBeFalsy();
		expect(mensagem.login).toMatch(new RegExp(saida));
	});
});
