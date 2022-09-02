import React from 'react';
import cadastrarUsuario from '../../../src/CasosDeUso/CadastroDeUsuario';
import validarUsuario from '../../../src/CasosDeUso/CadastroDeUsuario/valdiarUsuario';
import { resultadoDeOpepracao } from '../../../src/CasosDeUso/type/operacao';
import { Usuario } from '../../../src/Modelo/Usuario';
import CadastroDeUsuarioView from './view';

const CadastroDeUsuario = () => {
	const cadastrarNovoUsuario = async (
		usuario: Usuario,
	): Promise<resultadoDeOpepracao> => {
		try {
			await cadastrarUsuario(usuario);
			return {
				status: 'sucesso',
				mensagem: 'Usuário cadastrado com sucesso',
			};
		} catch (error) {
			return {
				status: 'falha',
				mensagem: error.message,
			};
		}
	};

	return (
		<CadastroDeUsuarioView
			cadastrarNovoUsuario={cadastrarNovoUsuario}
			validaUsuario={validarUsuario}
		/>
	);
};

export default CadastroDeUsuario;
