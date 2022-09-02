import { efetuarLogin } from '../../../src/CasosDeUso/LoginDeUsuario';
import { resultadoDeOpepracao } from '../../../src/CasosDeUso/type/operacao';
import { useSessaoDeUsuarioDispatch } from '../../Autenticacao/Context/SessaoDeUsuarioContext';
import LoginView from './view';

const LoginUsuario = () => {
	const { setSessaoDeUsuario } = useSessaoDeUsuarioDispatch();

	const efetuarLoginView = async (
		login: string,
		senha: string,
	): Promise<resultadoDeOpepracao> => {
		try {
			const sessao = await efetuarLogin(login, senha);

			setSessaoDeUsuario(sessao);
			return {
				status: 'sucesso',
				mensagem: 'Login efetuado com sucesso',
			};
		} catch (error) {
			return {
				status: 'falha',
				mensagem: 'Login não efetuado',
			};
		}
	};

	return <LoginView efetuarLogin={efetuarLoginView} />;
};

export default LoginUsuario;
