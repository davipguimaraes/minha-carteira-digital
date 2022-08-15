import { hash, codec } from 'sjcl';

const sha256 = (text: string) => {
	const arrayDeBits = hash.sha256.hash(text);
	return codec.hex.fromBits(arrayDeBits);
};

export default sha256;
