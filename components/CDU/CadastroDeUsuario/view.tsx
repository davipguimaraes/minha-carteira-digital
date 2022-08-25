import React, { useState } from 'react';
import { resultadoDeOpepracao } from '../../../src/CasosDeUso/type/operacao';
import { Usuario } from '../../../src/Modelo/Usuario';
import { ValdiacaoDeCampos } from '../../../src/utils/Validacao';
import Input from '../../Formulario/Input';

type Props = {
	cadastrarNovoUsuario(usuario: Usuario): Promise<resultadoDeOpepracao>;
	validaUsuario(usuario: Usuario): ValdiacaoDeCampos;
};

const CadastroDeUsuarioView = ({
	cadastrarNovoUsuario,
	validaUsuario,
}: Props) => {
	const [resultadoDeCadastro, setResultadoDeCadastro] = useState<
		resultadoDeOpepracao | undefined
	>();
	const [messageError, setMessageError] = useState<{
		login?: string;
		nome?: string;
		senha?: string;
		geral?: string;
	}>({});

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const { login: login$, nome: nome$, senha: senha$ } = e.target.elements;

		const usuario = new Usuario();

		usuario.login = login$?.value.trim();
		usuario.nome = nome$?.value.trim();
		usuario.senha = senha$?.value.trim();

		const validacao = validaUsuario(usuario);
		if (validacao.sucesso) {
			// clean
			setMessageError({});

			try {
				const resultado = await cadastrarNovoUsuario(usuario);
				setResultadoDeCadastro(resultado);
			} catch (error) {
				setResultadoDeCadastro({
					mensagem: 'Cadastro não efetuado.',
					status: 'falha',
				});
			}
		} else {
			setMessageError(validacao.mensagem);
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Cadastre-se</h1>
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
						status={messageError?.login ? 'error' : 'success'}
						message={messageError?.login}
					/>
					<Input
						type={'text'}
						name={'nome'}
						placeholder="Seu nome"
						label="Nome"
						status={messageError?.nome ? 'error' : 'success'}
						message={messageError?.nome}
					/>
					<Input
						type={'password'}
						name={'senha'}
						placeholder="$S3nh4_F0RT3"
						label="Senha"
						status={messageError?.senha ? 'error' : 'success'}
						message={messageError?.senha}
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
							Cadastrar
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default CadastroDeUsuarioView;
