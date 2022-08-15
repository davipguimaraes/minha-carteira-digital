import React, { useState } from 'react';
import { Usuario } from '../../../src/Modelo/Usuario';
import { ValdiacaoDeCampos } from '../../../src/utils/Validacao';
import Input from '../../Formulario/Input';

type Props = {
	cadastrarNovoUsuario(usuario: Usuario): Promise<void>;
	validaUsuario(usuario: Usuario): ValdiacaoDeCampos;
};

const CadastroDeUsuarioView = ({
	cadastrarNovoUsuario,
	validaUsuario,
}: Props) => {
	const [messageError, setMessageError] = useState<{
		login?: string;
		nome?: string;
		senha?: string;
	}>({});

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const { login: login$, nome: nome$, senha: senha$ } = e.target.elements;

		const usuario = new Usuario();

		usuario.login = login$?.value;
		usuario.nome = nome$?.value;
		usuario.senha = senha$?.value;

		const validacao = validaUsuario(usuario);
		if (validacao.sucesso) {
			// clean
			setMessageError({});

			cadastrarNovoUsuario(usuario);
		} else {
			setMessageError(validacao.mensagem);
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Cadastre-se</h1>

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

				<div className="text-right">
					<button
						type="submit"
						className="bg-neutral-600 hover:bg-neutral-700 outline-blue-400 text-white py-2 px-4 ">
						Cadastrar
					</button>
				</div>
			</form>
		</div>
	);
};

export default CadastroDeUsuarioView;
