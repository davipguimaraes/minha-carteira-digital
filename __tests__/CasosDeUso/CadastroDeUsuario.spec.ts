import validarUsuario from '../../src/CasosDeUso/CadastroDeUsuario/valdiarUsuario';
import { Usuario } from '../../src/Modelo/Usuario';
import sha256 from '../../src/utils/sha256';

describe('Validação de dados do Usuário', () => {
	it('Cadastro com sucesso', () => {
		const usuario = new Usuario();
		usuario.login = 'usuario';
		usuario.senha = '12345678';
		usuario.nome = 'Usuario';

		const validacao = validarUsuario(usuario);
		expect(validacao.sucesso).toBe(true);
	});

	it.each([['usuario'], ['1usu'], ['12344']])(
		'Deve aceitar login %s é %s',
		(login) => {
			const usuario = new Usuario();
			usuario.login = login;
			usuario.senha = '12345678';
			usuario.nome = 'Usuario';

			const { sucesso } = validarUsuario(usuario);

			expect(sucesso).toBe(true);
		},
	);

	it.each([
		['', 'obrigatório'],
		[null, 'é obrigatório'],
		[undefined, 'é obrigatório'],
		['usu', 'deve ter mais de 4 caracteres'],
		['us ua', 'invalido'],
		['usar*', 'invalido'],
		['usard)', 'invalido'],
		['usário', 'invalido'],
		['_usário', 'invalido'],
		['usário)', 'invalido'],
		["<script>alert('oi')</script>", 'invalido'],
	])('Erro no login "%s" é %s', (login, saida) => {
		const usuario = new Usuario();
		usuario.login = login;
		usuario.senha = '12345678';
		usuario.nome = 'Usuario';

		const { sucesso, mensagem } = validarUsuario(usuario);

		expect(sucesso).toBeFalsy();
		expect(mensagem.login).toMatch(new RegExp(saida));
	});

	it.each([['senha123'], ['12345678'], ['123456789']])(
		'Deve aceitar senha %s é %s',
		(senha) => {
			const usuario = new Usuario();
			usuario.login = 'usuario';
			usuario.senha = senha;
			usuario.nome = 'Usuario';

			const { sucesso } = validarUsuario(usuario);

			expect(sucesso).toBe(true);
		},
	);

	it.each([
		['', 'obrigatório'],
		[null, 'é obrigatório'],
		[undefined, 'é obrigatório'],
		['1234567', 'deve ter mais de 8 caracteres'],
	])('Erro no senha "%s" é %s', (senha, saida) => {
		const usuario = new Usuario();
		usuario.login = 'usuario';
		usuario.senha = senha;
		usuario.nome = 'Usuario';

		const { sucesso, mensagem } = validarUsuario(usuario);

		expect(sucesso).toBe(false);
		expect(mensagem.senha).toMatch(new RegExp(saida));
	});

	it.each([['sa'], ['Usuário'], ['a'.repeat(127)], ['a'.repeat(126)]])(
		'Deve aceitar senha %s é %s',
		(nome) => {
			const usuario = new Usuario();
			usuario.login = 'usuario';
			usuario.senha = '12345678';
			usuario.nome = nome;

			const { sucesso } = validarUsuario(usuario);
			expect(sucesso).toBe(true);
		},
	);

	it.each([
		['', 'obrigatório'],
		[null, 'é obrigatório'],
		[undefined, 'é obrigatório'],
		['1', 'deve ter mais de 2 caracteres'],
		['a'.repeat(128), 'deve ter menos de 127 caracteres'],
		['a'.repeat(1024), 'deve ter menos de 127 caracteres'],
	])('Erro no senha "%s" é %s', (nome, saida) => {
		const usuario = new Usuario();
		usuario.login = 'usuario';
		usuario.senha = '12345678';
		usuario.nome = nome;

		const { sucesso, mensagem } = validarUsuario(usuario);

		expect(sucesso).toBe(false);
		expect(mensagem.nome).toMatch(new RegExp(saida));
	});
});

const SHA256_FINAL_LENTHG_TO_HEXA = 64;
describe('Salva senha de maneira segura', () => {
	it('Cria hash para senha', () => {
		const senha = '12345678';
		const hashDaSenha = sha256(senha);

		expect(hashDaSenha !== senha).toBe(true);
		expect(hashDaSenha).toHaveLength(SHA256_FINAL_LENTHG_TO_HEXA);
	});
});
