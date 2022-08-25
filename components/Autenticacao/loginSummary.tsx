import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useSessaoDeUsuarioState } from './Context/SessaoDeUsuarioContext';

interface loginSummaryProps {}

const LoginSummary: FunctionComponent<loginSummaryProps> = ({}) => {
	const { sessaoDeUsuario } = useSessaoDeUsuarioState();

	const loginComponent = (
		<Link href="/login">
			<a className="inline-block text-emerald-500 hover:text-emerald-700 outline-blue-400 py-2 px-4 ">
				Login
			</a>
		</Link>
	);

	return (
		<>
			{sessaoDeUsuario && sessaoDeUsuario.usuarioAutenticado ? (
				<>Bem vindo</>
			) : (
				loginComponent
			)}
		</>
	);
};

export default LoginSummary;
