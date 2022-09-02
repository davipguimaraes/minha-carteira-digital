import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import GitHubCorner from '../GitHubCorner';
import LoginSummary from '../Autenticacao/loginSummary';

const PERFIL_GITHUB = 'https://github.com/davipguimaraes';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'Minha carteira digital' }: Props) => (
	<>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>

		<div className="flex flex-col h-screen gap-4">
			<header className="relative px-4">
				<nav className="max-w-7xl mx-auto py-2 border-solid border-b-2 border-emerald-300 flex items-center justify-between">
					<Link href="/">
						<a className="cursor-pointer">
							<Image
								src="/logo-minha-carteira-digital.png"
								alt="Logo Minha carteira digital"
								width="144"
								height="60"
							/>
						</a>
					</Link>
					<LoginSummary></LoginSummary>
				</nav>
				<GitHubCorner
					projectUrl={`${PERFIL_GITHUB}/minha-carteira-digital`}
				/>
			</header>
			<main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4">
				{children}
			</main>
			<footer className="bg-emerald-50 text-center py-3 text-gray-600  px-4">
				<p className="mb-1 text-base">
					Saiba mais sobre{' '}
					<Link href="/sobre">
						<a className="text-emerald-500 hover:underline">
							sobre o projeto
						</a>
					</Link>
				</p>

				<p className="text-xs">
					Desenvolvido por{' '}
					<a
						href={PERFIL_GITHUB}
						className="text-emerald-500 hover:underline"
						target="_blank"
						rel="noreferrer">
						Davi P. Guimarães
					</a>{' '}
				</p>
			</footer>
		</div>
	</>
);

export default Layout;
