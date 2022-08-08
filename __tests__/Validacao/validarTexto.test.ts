import { validadorDeTexto } from '../../src/utils/Validacao/validadorDeCampo';

const MIN_LENGTH = 3;
const MAX_LENGTH = 30;
describe('Validação de texto', () => {
	it('Erro texto obrigatorio', () => {
		const validacaoDoLogin = validadorDeTexto('login', null, {
			obrigatorio: true,
		});

		expect(validacaoDoLogin.ehValido).toBe(false);
		expect(validacaoDoLogin.mensagens.join(' ,')).toMatch(
			new RegExp(`obrigatório`),
		);
	});
	it('Erro texto obrigatorio', () => {
		const validacaoDoLogin = validadorDeTexto('login', undefined, {
			obrigatorio: true,
		});

		expect(validacaoDoLogin.ehValido).toBe(false);
		expect(validacaoDoLogin.mensagens.join(' ,')).toMatch(
			new RegExp(`obrigatório`),
		);
	});
	it('Não exibir erro com texto opcional', () => {
		const validacaoDoLogin = validadorDeTexto('login', undefined, {
			obrigatorio: false,
		});

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});

	it('Tamanho minimo correto', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'A'.repeat(MIN_LENGTH),
			{
				tamanhoMinimo: MIN_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});
	it('Tamanho minimo correto +1', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'a'.repeat(MIN_LENGTH + 1),
			{
				tamanhoMinimo: MIN_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});
	it('Erro com texto de tamanho minimo -1', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'A'.repeat(MIN_LENGTH - 1),
			{
				tamanhoMinimo: MIN_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(false);
		expect(validacaoDoLogin.mensagens.join(' ,')).toMatch(
			new RegExp(`deve ter mais de ${MIN_LENGTH} caracteres`),
		);
	});

	it('Tamanho Maximo correto -1', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'A'.repeat(MAX_LENGTH - 1),
			{
				tamanhoMaximo: MAX_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});
	it('Tamanho maximo', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'a'.repeat(MAX_LENGTH),
			{
				tamanhoMaximo: MAX_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});
	it('Erro com tamanho maximo +1', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'a'.repeat(MAX_LENGTH + 1),
			{
				tamanhoMaximo: MAX_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(false);
		expect(validacaoDoLogin.mensagens.join(' ,')).toMatch(
			new RegExp(`deve ter menos de ${MAX_LENGTH} caracteres`),
		);
	});
	it('Erro com tamanho maximo *2', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'a'.repeat(MAX_LENGTH * 2),
			{
				tamanhoMaximo: MAX_LENGTH,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(false);
		expect(validacaoDoLogin.mensagens.join(' ,')).toMatch(
			new RegExp(`deve ter menos de ${MAX_LENGTH} caracteres`),
		);
	});

	it('Formato + tamanho minimo correto', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'A'.repeat(MIN_LENGTH),
			{
				tamanhoMinimo: MIN_LENGTH,
				formato: () => true,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(true);
		expect(validacaoDoLogin.mensagens).toHaveLength(0);
	});
	it('Erro no formato + tamanho minimo correto', () => {
		const validacaoDoLogin = validadorDeTexto(
			'login',
			'A'.repeat(MIN_LENGTH - 1),
			{
				obrigatorio: true,
				tamanhoMinimo: MIN_LENGTH,
				formato: () => false,
			},
		);

		expect(validacaoDoLogin.ehValido).toBe(false);
		const mensagens = validacaoDoLogin.mensagens.join(', ');
		expect(mensagens).toMatch(new RegExp(`invalido`));
		expect(mensagens).toMatch(
			new RegExp(`deve ter mais de ${MIN_LENGTH} caracteres`),
		);
	});
});
