import { tree } from '@/constants/tree';
import { merlTree } from '@/constants/merlTree';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { Address } from 'viem';

export function getProofByAddress(address?: Address) {
  if (!address) return { proof: undefined, value: undefined };
  const trees = StandardMerkleTree.load(tree.tree as any);
  let value, proof;
  for (const [i, v] of trees.entries()) {
    if (v[1] === address) {
      proof = trees.getProof(i);
      value = v;
      break;
    }
  }
  return { proof, value };
}

export function getMerlProofByAddress(address?: Address) {
  if (!address) return { proof: undefined, value: undefined };
  const trees = StandardMerkleTree.load(merlTree.tree as any);
  let value, proof;
  for (const [i, v] of trees.entries()) {
    if (v[1] === address) {
      proof = trees.getProof(i);
      value = v;
      break;
    }
  }

  return { proof, value };
}

// TypeScript internationalization: chore: 🔧 update package scripts
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    chore____update_package_scripts: 'chore: 🔧 update package scripts',
    chore____update_package_scripts_description: 'Description for chore: 🔧 update package scripts'
  },
  zh: {
    chore____update_package_scripts: 'chore: 🔧 update package scripts',
    chore____update_package_scripts_description: 'chore: 🔧 update package scripts的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
