export default abstract class RepositorioEmSessionStorage<T> {
	protected tableName: string;

	protected inserir(novo: T) {
		window.sessionStorage.setItem(this.tableName, JSON.stringify(novo));
	}

	protected obter() {
		const resultado = window.sessionStorage.getItem(this.tableName);
		return JSON.parse(resultado);
	}
}
