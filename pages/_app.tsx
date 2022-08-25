import type { AppProps } from 'next/app';
import { SessaoDeUsuarioContextProvider } from '../components/Autenticacao/Context/SessaoDeUsuarioContext';
import { obterSessaoAtual } from '../src/CasosDeUso/LoginDeUsuario';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessaoDeUsuarioContextProvider obterSessaoDeUsuario={obterSessaoAtual}>
			<Component {...pageProps} />
		</SessaoDeUsuarioContextProvider>
	);
}
