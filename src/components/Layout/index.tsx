import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import GitHubCorner from '../GitHubCorner';

const PERFIL_GITHUB = 'https://github.com/davipguimaraes';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'Minha carteira digital' }: Props) => (
	<div className="max-w-7xl mx-auto">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
		<header className="relative">
			<nav>
				<Link href="/">
					<a className="hover:underline">Home</a>
				</Link>{' '}
				|{' '}
				<Link href="/sobre">
					<a className="hover:underline">Sobre o projeto</a>
				</Link>{' '}
			</nav>
			<GitHubCorner
				projectUrl={`${PERFIL_GITHUB}/minha-carteira-digital`}></GitHubCorner>
		</header>
		{children}
		<footer>
			<hr />
			<span>
				Desenvolvido por{' '}
				<a
					href={PERFIL_GITHUB}
					className="underline text-emerald-300 hover:text-emerald-500"
					target="_blank"
					rel="noreferrer">
					Davi P. Guimarães
				</a>{' '}
			</span>
		</footer>
	</div>
);

export default Layout;
