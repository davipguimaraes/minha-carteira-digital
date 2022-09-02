import { useRouter } from 'next/router';
import React, {
	FunctionComponent,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { SessaoDeUsuario } from '../../../src/Modelo/SessaoDeUsuario';

const DEFAULT_STATE = {
	sessaoDeUsuario: undefined,
};
interface SessaoDeUsuarioContextProps {
	sessaoDeUsuario: SessaoDeUsuario | undefined;
}
const SessaoDeUsuarioStateContext =
	React.createContext<SessaoDeUsuarioContextProps>(DEFAULT_STATE);
SessaoDeUsuarioStateContext.displayName = 'SessaoDeUsuarioState';

interface SessaoDeUsuarioDispatchContextProps {
	setSessaoDeUsuario(sessaoDeUsuario: SessaoDeUsuario): void;
	encerrarSessao(): Promise<void>;
}
const SessaoDeUsuarioDispatchContext =
	React.createContext<SessaoDeUsuarioDispatchContextProps>({
		setSessaoDeUsuario: () => {},
		encerrarSessao: async () => {},
	});
SessaoDeUsuarioDispatchContext.displayName = 'SessaoDeUsuarioDispatch';

interface SessaoDeUsuarioContextProviderProps {
	children?: ReactNode;
	obterSessaoDeUsuario(): Promise<SessaoDeUsuario>;
	efetuarLogout(): Promise<void>;
}

export const SessaoDeUsuarioContextProvider: FunctionComponent<
	SessaoDeUsuarioContextProviderProps
> = ({ children, obterSessaoDeUsuario, efetuarLogout }) => {
	const router = useRouter();
	const [sessaoDeUsuario, setSessaoDeUsuario] = useState<SessaoDeUsuario>();

	const _obterSessaoDeUsuario = async () => {
		const sessaoAtual = await obterSessaoDeUsuario();
		setSessaoDeUsuario(sessaoAtual);
	};

	const encerrarSessao = async () => {
		await efetuarLogout();
		const sessaoAtual = await obterSessaoDeUsuario();
		setSessaoDeUsuario(sessaoAtual);
	};

	useEffect(() => {
		_obterSessaoDeUsuario();
	}, []);

	// todo refatorar
	useEffect(() => {
		router.push('/');
	}, [sessaoDeUsuario]);

	return (
		<SessaoDeUsuarioStateContext.Provider
			value={{ sessaoDeUsuario: sessaoDeUsuario }}>
			<SessaoDeUsuarioDispatchContext.Provider
				value={{
					setSessaoDeUsuario: setSessaoDeUsuario,
					encerrarSessao: encerrarSessao,
				}}>
				{children}
			</SessaoDeUsuarioDispatchContext.Provider>
		</SessaoDeUsuarioStateContext.Provider>
	);
};

export const useSessaoDeUsuarioState = () => {
	const context = useContext(SessaoDeUsuarioStateContext);
	if (context === undefined) {
		throw new Error(
			'useSessaoDeUsuarioContext must be used within a SessaoDeUsuarioContext',
		);
	}

	return context;
};
export const useSessaoDeUsuarioDispatch = () => {
	return useContext(SessaoDeUsuarioDispatchContext);
};
