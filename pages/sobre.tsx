import Link from 'next/link';
import Layout from '../components/Layout';

const SobreOProjetoPage = () => (
	<Layout title="Sobre o projeto | Minha Carteira digital">
		<div className="text-center">
			<h1 className="text-3xl font-bold mb-4">Sobre o projeto</h1>
			<p>
				Esse projeto foi desenvolvido para demonstração de habilidades.
			</p>
			<p>
				Os valores e transações realizadas nessa aplicação são
				fiquiticios.
			</p>
			<Link href="/">
				<a className="block mt-4 text-emerald-500 hover:underline">
					voltar ao projeto
				</a>
			</Link>
		</div>
	</Layout>
);

export default SobreOProjetoPage;
