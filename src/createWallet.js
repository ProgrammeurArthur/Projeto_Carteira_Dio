const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

// Definir a rede
const network = bitcoin.networks.testnet;

// Derivação de carteira HD (determinística) /1-teste /0-rede principal
const path = `m/49'/1'/0'/0`;

// Criando o mnemonic para o seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criando uma conta - par chave privada e chave pública
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço:", btcAddress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:", mnemonic);
