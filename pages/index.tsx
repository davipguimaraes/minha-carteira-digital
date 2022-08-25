import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
	<Layout title="Home | Minha carteira digital">
		<h1 className="text-3xl font-bold text-emerald-400 mb-4">
			Minha carteira digital
		</h1>
		<p>
			Seja bem vindo ao projeto <strong>minha carteira digital</strong>,
			aqui você poderá comprar e vender criptomoedas
		</p>

		<p className="mt-8 mb-12">
			Começe aqui:{' '}
			<Link href="/login">
				<a className="inline-block bg-emerald-500 hover:bg-emerald-700 outline-blue-400 text-white py-2 px-4 hover:underline">
					Criar minha conta
				</a>
			</Link>
		</p>
		<p>
			Para saber mais{' '}
			<Link href="/sobre">
				<a className="text-emerald-400 hover:underline">
					acesse a descrição do projeto
				</a>
			</Link>
		</p>
	</Layout>
);

export default IndexPage;
