import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import {
	useSessaoDeUsuarioDispatch,
	useSessaoDeUsuarioState,
} from './Context/SessaoDeUsuarioContext';

interface loginSummaryProps {}

const LoginSummary: FunctionComponent<loginSummaryProps> = ({}) => {
	const { sessaoDeUsuario } = useSessaoDeUsuarioState();
	const { encerrarSessao } = useSessaoDeUsuarioDispatch();

	return (
		<>
			{sessaoDeUsuario && sessaoDeUsuario.usuarioAutenticado ? (
				<div className="max-w-xs text-right">
					<p className="truncate">
						Bem vindo,{' '}
						<span className="italic">
							{sessaoDeUsuario.nomeUsuario}
						</span>
						!
					</p>
					<p className="trucate">
						<button
							className="text-emerald-500 hover:text-emerald-700"
							onClick={async () => await encerrarSessao()}>
							sair da conta?
						</button>
					</p>
				</div>
			) : (
				<Link href="/login">
					<a className="inline-block text-emerald-500 hover:text-emerald-700 outline-blue-400 py-2 px-4 ">
						Login
					</a>
				</Link>
			)}
		</>
	);
};

export default LoginSummary;
