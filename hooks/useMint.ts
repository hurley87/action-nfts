import { useMutation } from 'react-query';
import useActionContract from './contracts/useActionContract';

interface MintParams {
  to: string;
  path: string;
}

const useMint = () => {
  const contract = useActionContract();
  return useMutation(async ({ to, path }: MintParams) => {
    await contract.mint(to, path);
  });
};

export default useMint;
