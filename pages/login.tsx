import CadastroDeUsuario from '../components/CDU/CadastroDeUsuario';
import LoginUsuario from '../components/CDU/Login';
import Layout from '../components/Layout';

const IndexPage = () => (
	<Layout title="Login | Minha carteira digital">
		<div className="flex gap-8 w-4/5 mx-auto my-8">
			<div className="flex-auto">
				<CadastroDeUsuario />
			</div>
			<div className="h-80 border-r-2 border-zinc-300"></div>
			<div className="flex-auto">
				<LoginUsuario />
			</div>
		</div>
	</Layout>
);

export default IndexPage;
