import Link from 'next/link'
import Layout from '../src/components/Layout'

const IndexPage = () => (
	<Layout title="Home | Minha carteira digital">
		<h1 className="text-3xl font-bold text-emerald-400">
			Minha carteira digital
		</h1>
		<p>
			<Link href="/about">
				<a className="hover:underline">About..</a>
			</Link>
		</p>
	</Layout>
)

export default IndexPage
