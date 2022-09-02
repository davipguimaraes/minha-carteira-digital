import React, { useState } from 'react';
import { resultadoDeOpepracao } from '../../../src/CasosDeUso/type/operacao';
import Input from '../../Formulario/Input';

type Props = {
	efetuarLogin(login: string, senha: string): Promise<resultadoDeOpepracao>;
};

const LoginView = ({ efetuarLogin }: Props) => {
	const [resultadoDeCadastro, setResultadoDeCadastro] = useState<
		resultadoDeOpepracao | undefined
	>();

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const { login: login$, senha: senha$ } = e.target.elements;

		const login = login$?.value.trim();
		const senha = senha$?.value.trim();

		try {
			const resultado = await efetuarLogin(login, senha);
			setResultadoDeCadastro(resultado);
		} catch (error) {
			setResultadoDeCadastro({
				mensagem: 'Login não efetuado.',
				status: 'falha',
			});
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			{resultadoDeCadastro && resultadoDeCadastro.status == 'sucesso' ? (
				<p className={`text-lg text-green-400`}>
					{resultadoDeCadastro.mensagem}
				</p>
			) : (
				<form onSubmit={handleFormSubmit}>
					<Input
						type={'text'}
						name={'login'}
						placeholder="seu_login"
						label="Login"
					/>
					<Input
						type={'password'}
						name={'senha'}
						placeholder="$S3nh4_F0RT3"
						label="Senha"
					/>

					{resultadoDeCadastro &&
						resultadoDeCadastro.status == 'falha' && (
							<p className={`text-sm text-red-400`}>
								{resultadoDeCadastro.mensagem}
							</p>
						)}
					<div className="text-right">
						<button
							type="submit"
							className="bg-neutral-600 hover:bg-neutral-700 outline-blue-400 text-white py-2 px-4 ">
							Entrar
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default LoginView;
