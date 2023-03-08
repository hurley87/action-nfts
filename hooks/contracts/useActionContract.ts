import { useContract, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';

import ActionContract from './abis/Action.json';

const useActionContract = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  console.log(signer);
  const contract = useContract({
    address: '0xD36A2b90Ac460774B96a8cB712CDE6c4aAdcF2b5', // Add the address that was output from your deploy script, e.g. '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'.
    abi: ActionContract.abi,
    signerOrProvider: signer || provider,
  });

  const mint = async (to: string, tokenId: string) => {
    const tx = await contract?.mint(to, tokenId, {
      gasLimit: ethers.utils.hexlify(1000000),
      value: ethers.utils.parseEther('0.025'),
    });
    const receipt = await tx?.wait();
    return receipt;
  };

  return {
    contract,
    mint,
  };
};

export default useActionContract;
