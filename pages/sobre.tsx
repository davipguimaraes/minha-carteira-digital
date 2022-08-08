import Link from 'next/link';
import Layout from '../src/components/Layout';

const SobreOProjetoPage = () => (
	<Layout title="Sobre o projeto | Minha Carteira digital">
		<h1 className="text-3xl font-bold text-emerald-400">Sobre o projeto</h1>
		<p>This is the about page</p>
		<p>
			<Link href="/">
				<a className="hover:underline">Go home</a>
			</Link>
		</p>
	</Layout>
);

export default SobreOProjetoPage;
