import { Box, Button, Stack, Skeleton, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { create } from 'ipfs-http-client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import useActionContract from '@/hooks/contracts/useActionContract';
import PrimaryButton from './PrimaryButton';
import { Connect } from './Connect';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const projectId = process.env.NEXT_PUBLIC_INFRA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFRA_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      'base64'
    )}`,
  },
});

const movementOptions = [
  'Surrealism',
  'Abstract Expressionism',
  'CoBrA',
  'Art Brut',
];

const techniqueOptions = [
  'Automatic drawing',
  'Collage',
  'Frottage',
  'Grattage',
  'Decalcomania',
];
const artistOptions = [
  'André Masson',
  'Joan Miró',
  'Jackson Pollock',
  'Lee Krasner',
  'Max Ernst',
];

const Art: NextPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState('');
  const [movement, setMovement] = useState(movementOptions[0]);
  const [technique, setTechnique] = useState(techniqueOptions[0]);
  const [artist, setArtist] = useState(artistOptions[0]);
  const [isMinting, setIsMinting] = useState(false);
  const [viewOpensea, setViewOpensea] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const { address } = useAccount();
  const actionContract = useActionContract();

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');

    const prompt = `A ${technique.toLocaleLowerCase()} painting in the style of ${artist} during the ${movement} movement.`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const { url } = data;

    setApiOutput(`${url}`);
    setIsGenerating(false);
  };

  const handleMint = async () => {
    setIsMinting(true);
    const mintJson = {
      name: 'AI Art',
      description: `A ${technique.toLocaleLowerCase()} painting in the style of ${artist} during the ${movement} movement.`,
      image: apiOutput,
      attributes: [
        { trait_type: 'Movement', value: movement },
        { trait_type: 'Technique', value: technique },
        { trait_type: 'Artist', value: artist },
      ],
    };
    const uploaded = await ipfs.add(JSON.stringify(mintJson));
    console.log('Uploaded Hash: ', uploaded);
    const path = uploaded.path;

    try {
      if (address) {
        const transaction = await actionContract.mint(address, path);
        console.log('Transaction: ', transaction.transactionHash);
        setTransactionHash(transaction.transactionHash);
        toast.success('NFT minted!');
        setViewOpensea(true);
      }
      setIsMinting(false);
    } catch {
      toast.error('Error minting NFT');
      setIsMinting(false);
    }
  };

  return (
    <Flex pt="20px">
      <Stack w="full" maxW="400px" gap="6">
        <Text>
          <Link href="/traits">
            <Text display="inline" color="blue.500">
              NFT traits
            </Text>
          </Link>{' '}
          are based on the artists, techniques and movements that helped define
          automatism in art.
        </Text>
        <Box>
          <Text>Choose an artist:</Text>
          {artistOptions.map((item) => (
            <Button
              key={item}
              variant={item === artist ? 'solid' : 'outline'}
              colorScheme="blue"
              size="xs"
              onClick={() => setArtist(item)}
              mr="2"
              mt="2"
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box>
          <Text>Choose a technique:</Text>
          {techniqueOptions.map((item) => (
            <Button
              key={item}
              variant={item === technique ? 'solid' : 'outline'}
              colorScheme="blue"
              size="xs"
              onClick={() => setTechnique(item)}
              mr="2"
              mt="2"
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box>
          <Text>Choose a movement:</Text>
          {movementOptions.map((item) => (
            <Button
              key={item}
              variant={item === movement ? 'solid' : 'outline'}
              colorScheme="blue"
              size="xs"
              onClick={() => setMovement(item)}
              mr="2"
              mt="2"
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box w="full">
          {apiOutput !== '' ? (
            !address ? (
              <Connect />
            ) : (
              <>
                {transactionHash !== '' ? (
                  <PrimaryButton
                    text="View Transaction"
                    onClick={() =>
                      window
                        ?.open(
                          `https://goerli.etherscan.io/tx/${transactionHash}`,
                          '_blank'
                        )
                        ?.focus()
                    }
                  />
                ) : (
                  <PrimaryButton
                    text="Mint - 0.025 ETH"
                    isLoading={isMinting}
                    onClick={handleMint}
                  />
                )}

                <Text pb="4" pt="6" textAlign="center">
                  3,692 minted • 5d 3h 59m 45s
                </Text>
                <Text
                  onClick={() => {
                    setApiOutput('');
                    setViewOpensea(false);
                  }}
                  size="xs"
                  color="blue.500"
                  textAlign="center"
                  display="inline-block"
                  cursor="pointer"
                  w="full"
                >
                  Reset
                </Text>
              </>
            )
          ) : (
            <PrimaryButton
              text="Create"
              isLoading={isGenerating}
              onClick={callGenerateEndpoint}
            />
          )}
        </Box>
      </Stack>
      <Stack w="full" gap="4">
        <Stack maxW="500px" mx="auto">
          {apiOutput ? (
            <Box width={500} height={500} position="relative">
              <Skeleton
                zIndex={0}
                position="absolute"
                width={500}
                height={500}
              />
              <Box zIndex={1} width={500} height={500} position="absolute">
                <Image src={apiOutput} alt="AI" width={500} height={500} />
              </Box>
            </Box>
          ) : (
            <Box bg="gray.900" zIndex={0} width={500} height={500} />
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Art;
