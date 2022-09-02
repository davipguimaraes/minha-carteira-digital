export interface CodificadorDeString {
	codificar(texto: string): string;
	decodificar(texto: string): string;
}

export class CodificadorDeStringEmBase64 implements CodificadorDeString {
	decodificar(texto: string): string {
		return atob(texto);
	}
	public codificar(texto: string) {
		return btoa(texto);
	}
}
