import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Layout from '@/components/Layout';

const TraitsPage: NextPage = () => {
  return (
    <Layout>
      <Stack py="12px" maxW="800px" gap="4">
        <Text fontWeight="bold" fontSize="xl">
          Artists
        </Text>
        <Text>
          André Masson - Masson was a French Surrealist painter and graphic
          artist who was known for his use of automatic drawing and painting.
          His work often depicted biomorphic forms and abstract landscapes.
        </Text>
        <Text>
          Joan Miró - Miró was a Spanish painter, sculptor, and ceramicist who
          is often associated with Surrealism. He used automatism in his work to
          create abstract forms and symbols that were inspired by the natural
          world.
        </Text>
        <Text>
          Jackson Pollock - Pollock was an American painter who was associated
          with the Abstract Expressionist movement. He used a technique called
          drip painting, where he would allow paint to drip and splatter onto
          the canvas in a spontaneous, uncontrolled manner.
        </Text>
        <Text>
          Lee Krasner - Krasner was an American painter and one of the pioneers
          of Abstract Expressionism. Like Pollock, she used a form of automatism
          in her work, allowing the unconscious mind to guide her creative
          process.
        </Text>
        <Text>
          Max Ernst - Ernst was a German painter, sculptor, and collage artist
          who was closely associated with Surrealism. He used a variety of
          techniques, including automatic drawing and collage, to create works
          that explored the subconscious mind and the irrational nature of human
          thought.
        </Text>
        <Text fontWeight="bold" fontSize="xl" pt="10">
          Techniques
        </Text>
        <Text>
          Automatic drawing - This technique involves drawing without any
          conscious control or planning. The artist allows their hand to move
          freely across the surface of the paper or canvas, creating
          spontaneous, unpremeditated lines and shapes.
        </Text>
        <Text>
          Collage - Collage involves combining various materials, such as
          photographs, newspaper clippings, and other found objects, to create a
          new composition. Artists often use this technique in an intuitive,
          spontaneous manner, allowing the materials to guide the creative
          process.
        </Text>
        <Text>
          Frottage - Frottage involves rubbing a pencil or other drawing tool
          over a textured surface, such as a piece of wood or a leaf, in order
          to create a pattern or texture that can be incorporated into a larger
          composition.
        </Text>
        <Text>
          Grattage - Grattage involves scraping or scratching the surface of a
          painted canvas or other support in order to reveal the layers of paint
          beneath. This technique can create unexpected textures and patterns,
          and can be used in a spontaneous, intuitive manner.
        </Text>
        <Text>
          Decalcomania - Decalcomania involves pressing a painted or inked
          surface onto a piece of paper or other support, and then lifting it up
          to reveal a mirrored image. This technique can create unexpected
          patterns and textures, and can be used in a spontaneous, intuitive
          manner.
        </Text>
        <Text fontWeight="bold" fontSize="xl" pt="10">
          Movements
        </Text>
        <Text>
          Surrealism - Surrealism is an artistic and literary movement that
          emerged in the 1920s and 30s, and is characterized by its exploration
          of the subconscious mind and its use of dreamlike, irrational imagery.
          Many Surrealist artists used automatism techniques, such as automatic
          drawing and painting, to create works that were guided by intuition
          and spontaneity.
        </Text>
        <Text>
          Abstract Expressionism - Abstract Expressionism is a style of art that
          emerged in the United States in the 1940s and 50s, and is
          characterized by its emphasis on spontaneous, gestural marks and its
          rejection of traditional representational art. Many Abstract
          Expressionist artists, such as Jackson Pollock and Lee Krasner, used
          automatism techniques in their work.
        </Text>
        <Text>
          CoBrA - CoBrA was an international avant-garde movement that emerged
          in Europe in the late 1940s and early 50s, and is characterized by its
          rejection of traditional artistic conventions and its emphasis on
          spontaneity, experimentation, and play. Many CoBrA artists used
          automatism techniques, such as automatic drawing and painting, to
          create works that were guided by chance and intuition.
        </Text>
        <Text>
          Art Brut - Art Brut, also known as Outsider Art, is a style of art
          that emerged in the 20th century and is characterized by its rejection
          of traditional artistic conventions and its emphasis on individual
          creativity and expression. Some Art Brut artists, such as Jean
          Dubuffet, used automatism techniques in their work.
        </Text>
      </Stack>
    </Layout>
  );
};

export default TraitsPage;
