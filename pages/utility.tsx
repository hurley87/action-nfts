import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Layout from '@/components/Layout';

const UtilityPage: NextPage = () => {
  return (
    <Layout>
      <Stack py="12px" maxW="800px" gap="4">
        <Text>
          {`Mint holders will get exclusive access to a tool that'll let you
          create any NFT you can imagine with just text.
          `}
        </Text>
        <Text>
          {`We're building new kinds of creative tools using
          advances in AI. A new kind of Adobe Creative Suite that will enable a
          a whole new wave of AI-native artists.`}
        </Text>
        <Text>
          {`We think NFTs are the best way for artists to make money and build a community around their work. We'll make it easy for you to mint and sell your art too.`}
        </Text>
        <Text>
          {`Overall, this platform would represent a new and exciting approach to creating and selling digital art, democratizing the creation and ownership of NFTs and empowering anyone to express their creativity and imagination through the power of natural language.`}
        </Text>
      </Stack>
    </Layout>
  );
};

export default UtilityPage;
