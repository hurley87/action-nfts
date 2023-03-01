import { Box, Button, Text, Stack, Skeleton } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const gesturalOptions = [
  'Dripping',
  'Splattering',
  'Smearing',
  'Brushwork',
  'Scumbling',
];
const abstractionOptions = [
  'Non-figurative',
  'Lyrical',
  'Geometric',
  'Minimalist',
  'Cubist',
];
const artistOptions = [
  'Jackson Pollock',
  'Willem de Kooning',
  'Mark Rothko',
  'Lee Krasners',
  'Joan Mitchell',
];

// function that picks a randon number between 0 and the length of the array
const getRandomNumber = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
};

const Home: NextPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState('');
  const [gestural, setGestural] = useState(gesturalOptions[0]);
  const [abstraction, setAbstraction] = useState(abstractionOptions[0]);
  const [artist, setArtist] = useState(artistOptions[0]);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');

    const prompt = `A ${gestural}, ${abstraction} painting in the style of ${artist}`;

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const { url } = data;

    console.log(url);

    setApiOutput(`${url}`);
    setIsGenerating(false);
  };
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        {gesturalOptions.map((item) => (
          <Button
            key={item}
            variant={item === gestural ? 'ghost' : 'outline'}
            colorScheme="black"
            size="sm"
            onClick={() => setGestural(item)}
          >
            {item}
          </Button>
        ))}
      </Box>
      <Box>
        {abstractionOptions.map((item) => (
          <Button
            key={item}
            variant={item === abstraction ? 'ghost' : 'outline'}
            colorScheme="black"
            size="sm"
            onClick={() => setAbstraction(item)}
          >
            {item}
          </Button>
        ))}
      </Box>
      <Box>
        {artistOptions.map((item) => (
          <Button
            key={item}
            variant={item === artist ? 'ghost' : 'outline'}
            colorScheme="black"
            size="sm"
            onClick={() => setArtist(item)}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Stack maxW="xl" mx="auto">
        {apiOutput ? (
          <Box width={400} height={400} position="relative">
            <Skeleton zIndex={0} position="absolute" width={400} height={400} />
            <Box zIndex={1} width={400} height={400} position="absolute">
              <Image src={apiOutput} alt="AI" width={400} height={400} />
            </Box>
          </Box>
        ) : (
          <Button
            isLoading={isGenerating}
            colorScheme="gray"
            onClick={callGenerateEndpoint}
            width={400}
            height={400}
          >
            Generate
          </Button>
        )}
        {apiOutput !== '' && (
          <Button onClick={() => setApiOutput('')}>Try again</Button>
        )}
      </Stack>
    </div>
  );
};

export default Home;
