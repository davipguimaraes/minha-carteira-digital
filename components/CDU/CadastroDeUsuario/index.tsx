import React from 'react';
import cadastrarUsuario from '../../../src/CasosDeUso/CadastroDeUsuario';
import validarUsuario from '../../../src/CasosDeUso/CadastroDeUsuario/valdiarUsuario';
import CadastroDeUsuarioView from './view';

const CadastroDeUsuario = () => {
	return (
		<CadastroDeUsuarioView
			cadastrarNovoUsuario={cadastrarUsuario}
			validaUsuario={validarUsuario}
		/>
	);
};

export default CadastroDeUsuario;
