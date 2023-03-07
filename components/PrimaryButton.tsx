import { Button } from '@chakra-ui/react';

type Props = {
  text?: string;
  onClick: () => void;
  isLoading?: boolean;
};

const PrimaryButton = ({
  text = 'Connect Wallet',
  onClick,
  isLoading,
}: Props) => {
  return (
    <Button
      isLoading={isLoading}
      fontSize="18px"
      colorScheme="blue"
      w="full"
      p="24px"
      borderRadius="xs"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
