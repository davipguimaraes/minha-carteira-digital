import { isMaxLength, isMinLength } from './validacoes';

interface RegraDeValidacaoDeTexto {
	tamanhoMinimo?: number;
	tamanhoMaximo?: number;
	obrigatorio?: boolean;
	formato?(campo: string): boolean;
}

interface validacao {
	ehValido: boolean;
	mensagens: string[];
}

export const validadorDeTexto = (
	titulo: string,
	valor: string,
	regras: RegraDeValidacaoDeTexto,
): validacao => {
	const { tamanhoMinimo, tamanhoMaximo, obrigatorio, formato } = regras;
	const mensagens: string[] = [];

	if (!!!valor) {
		if (obrigatorio) {
			mensagens.push(`${titulo} é obrigatório`);
		}
	} else {
		if (tamanhoMinimo !== undefined) {
			if (!isMinLength(valor, tamanhoMinimo)) {
				mensagens.push(
					`${titulo} deve ter mais de ${tamanhoMinimo} caracteres`,
				);
			}
		}
		if (tamanhoMaximo !== undefined) {
			if (!isMaxLength(valor, tamanhoMaximo)) {
				mensagens.push(
					`${titulo} deve ter menos de ${tamanhoMaximo} caracteres`,
				);
			}
		}
		if (formato !== undefined) {
			try {
				if (!formato(valor)) {
					mensagens.push(`${titulo} invalido`);
				}
			} catch (error) {
				mensagens.push(`${titulo} invalido`);
			}
		}
	}

	return {
		mensagens,
		ehValido: mensagens.length == 0,
	};
};
