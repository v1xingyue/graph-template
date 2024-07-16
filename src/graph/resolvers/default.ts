import { MyContext } from "../../utils/context";
import nacl from "tweetnacl";

export const headers = (_parent: any, args: any, _context: MyContext) => {
  return _context.headers;
};

export const StreamUpdate = async (
  _parent: any,
  args: any,
  context: MyContext
): Promise<String> => {
  const { id } = args;
  return id;
};

export const Hello = async (
  _parent: any,
  args: any,
  _context: MyContext
): Promise<String> => {
  let { name } = args;
  return String(name).toUpperCase();
};

export const validate = async (
  _parent: any,
  args: any,
  _context: MyContext
) => {
  const { fullMessage, signature, publicKey, address } = args;

  // https://aptos.dev/standards/wallets/
  // parse public key from wallet standard

  try {
    const key = publicKey!.slice(2, 66);
    const verified = nacl.sign.detached.verify(
      new TextEncoder().encode(fullMessage),
      Buffer.from(signature, "hex"),
      // new HexString(signature.signature).toUint8Array(),
      Buffer.from(key, "hex")
      // new HexString(key).toUint8Array()
    );
    return {
      verified,
      expired_at: verified ? 3600 : 0,
      address,
    };
  } catch (_error) {
    return {
      verified: false,
      expired_at: 0,
      address,
    };
  }
};
