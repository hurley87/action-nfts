import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { Toaster } from 'react-hot-toast';

const { chains, provider } = configureChains(
  [baseGoerli],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: () => ({
        http: 'https://wiser-blue-aura.base-goerli.quiknode.pro/a7e699d32d5c307d7110798e3957fa5880743d36/',
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Automatism',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      // toast.error(
      //   "Network Error: Ensure Metamask is connected & on the same network that your contract is deployed to."
      // );
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster position="top-center" />
          </QueryClientProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
