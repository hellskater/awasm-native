import { useEffect, useState } from 'react';

import {
  adler32,
  md5,
  crc32c,
  blake3,
  sha512,
  sha3,
  keccak,
  ripemd160,
  createHMAC,
  createSHA256,
  pbkdf2,
  sm3,
  whirlpool,
  argon2id,
  bcrypt
} from 'hash-wasm';
import { useSession } from 'next-auth/react';

const sha256Algo = createSHA256();

const Cryptography = () => {
  // To make sure the user is logged in to access this page
  useSession({
    required: true
  });
  const [input, setInput] = useState('');
  const [hash, setHash] = useState<any>({});

  const computeHMAC = async () => {
    const hasher = await createHMAC(sha256Algo, 'petrified');
    hasher.init();
    hasher.update(input);
    return hasher.digest();
  };

  const computeHash = async () => {
    const ret: any = {};
    const salt = new Uint8Array(16);
    window.crypto.getRandomValues(salt);

    await Promise.all([
      (async () => (ret.adler32 = await adler32(input)))(),
      (async () => (ret.md5 = await md5(input)))(),
      (async () => (ret.crc32c = await crc32c(input)))(),
      (async () => (ret.blake3 = await blake3(input)))(),
      (async () => (ret.sha512 = await sha512(input)))(),
      (async () => (ret.sha3 = await sha3(input)))(),
      (async () => (ret.keccak = await keccak(input)))(),
      (async () => (ret.ripemd160 = await ripemd160(input)))(),
      (async () => (ret.sm3 = await sm3(input)))(),
      (async () => (ret.whirlpool = await whirlpool(input)))(),
      (async () => (ret.hmac = await computeHMAC()))(),
      (async () =>
        (ret.pbkdf2 = await pbkdf2({
          password: input,
          salt: 'salt',
          iterations: 16,
          hashLength: 32,
          hashFunction: createSHA256()
        })))(),
      (async () =>
        input
          ? (ret.argon2id = await argon2id({
              password: input,
              salt,
              parallelism: 1,
              memorySize: 128,
              iterations: 4,
              hashLength: 16,
              outputType: 'encoded'
            }))
          : '')(),
      (async () =>
        input && input.length < 72
          ? (ret.bcrypt = await bcrypt({
              password: input,
              salt,
              costFactor: 8,
              outputType: 'encoded'
            }))
          : '')()
    ]);

    setHash(ret);
  };

  useEffect(() => {
    computeHash();
  }, [input]);

  return (
    <div className="pt-16 min-h-screen p-14 font-mono">
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <h1 className="text-6xl">Hash Generator</h1>
        <input
          type="text"
          value={input}
          className="w-[60%] h-14 mt-10 bg-gray-700 p-5 rounded-lg outline-none text-lg"
          placeholder="Enter or paste your text"
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="mt-20 flex flex-col gap-5 text-base w-full">
        <p>
          <span className="font-semibold text-lg">Adler-32:</span>{' '}
          {hash.adler32}
        </p>
        <p>
          <span className="font-semibold text-lg">MD5:</span> {hash.md5}
        </p>
        <p>
          <span className="font-semibold text-lg">CRC32C:</span> {hash.crc32c}
        </p>
        <p>
          <span className="font-semibold text-lg">BLAKE3:</span> {hash.blake3}
        </p>
        <p>
          <span className="font-semibold text-lg">SHA512:</span>
          {hash.sha512}{' '}
        </p>
        <p>
          <span className="font-semibold text-lg">SHA3-512:</span> {hash.sha3}
        </p>
        <p>
          <span className="font-semibold text-lg">Keccak:</span> {hash.keccak}
        </p>
        <p>
          <span className="font-semibold text-lg">SM3:</span> {hash.sm3}
        </p>
        <p>
          <span className="font-semibold text-lg">Whirlpool:</span>{' '}
          {hash.whirlpool}
        </p>
        <p>
          <span className="font-semibold text-lg">RIPEMD-160:</span>{' '}
          {hash.ripemd160}
        </p>
        <p className="line">---</p>
        <p>
          <span className="font-semibold text-lg">
            HMAC-SHA256 with key=&quot;petrified&quot;:
          </span>{' '}
          {hash.hmac}
        </p>
        <p>
          <span className="font-semibold text-lg">PBKDF2(SHA256):</span>{' '}
          {hash.pbkdf2}
        </p>
        <p>
          <span className="font-semibold text-lg">Argon2id:</span>{' '}
          {hash.argon2id}
        </p>
        <p>
          <span className="font-semibold text-lg">Bcrypt:</span> {hash.bcrypt}
        </p>
      </div>
    </div>
  );
};

export default Cryptography;
