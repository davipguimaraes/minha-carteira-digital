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
}
const SessaoDeUsuarioDispatchContext =
	React.createContext<SessaoDeUsuarioDispatchContextProps>({
		setSessaoDeUsuario: () => {},
	});
SessaoDeUsuarioDispatchContext.displayName = 'SessaoDeUsuarioDispatch';

interface SessaoDeUsuarioContextProviderProps {
	children?: ReactNode;
	obterSessaoDeUsuario(): Promise<SessaoDeUsuario>;
}
export const SessaoDeUsuarioContextProvider: FunctionComponent<
	SessaoDeUsuarioContextProviderProps
> = ({ children, obterSessaoDeUsuario }) => {
	const [sessaoDeUsuario, setSessaoDeUsuario] = useState<SessaoDeUsuario>();

	const _obterSessaoDeUsuario = async () => {
		const sessaoAtual = await obterSessaoDeUsuario();
		setSessaoDeUsuario(sessaoAtual);
	};

	useEffect(() => {
		_obterSessaoDeUsuario();
	}, []);

	return (
		<SessaoDeUsuarioStateContext.Provider
			value={{ sessaoDeUsuario: sessaoDeUsuario }}>
			<SessaoDeUsuarioDispatchContext.Provider
				value={{ setSessaoDeUsuario: setSessaoDeUsuario }}>
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
	const context = useContext(SessaoDeUsuarioDispatchContext);
	return context;
};
