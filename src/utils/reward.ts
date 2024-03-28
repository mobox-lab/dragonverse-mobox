import { tree } from '@/constants/tree';
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
