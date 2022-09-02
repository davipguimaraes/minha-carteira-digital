export default interface StorageConection<T> {
	inserir(novo: T): void;
	obter(): T;
}
