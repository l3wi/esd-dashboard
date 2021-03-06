import styled from 'styled-components'

import { useWeb3 } from '../contexts/useWeb3'
import { web3 } from '../utils/ethers'
import { commas } from '../utils/helpers'

import MigrationModal from '../components/modals/migrate'

import { useRouter } from 'next/router'

import useContractBalance from '../hooks/useContractBalance'
import contracts from '../contracts'

import {
  Flex,
  Grid,
  Box,
  Center,
  Image,
  Link,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
} from '@chakra-ui/react'

const { dollar, stake, oldDao, oldDollar } = contracts

import Page from '../components/page'
import MoreInfo from '../components/moreInfo'

export default function Home() {
  const router = useRouter()

  const { web3, connectWallet, disconnectWallet, account } = useWeb3()
  const dollarBalance = useContractBalance(dollar.address)
  const stakeBalance = useContractBalance(stake.address)
  const oldDaoBalance = useContractBalance(oldDao.address)
  const oldDollarBalance = useContractBalance(oldDollar.address)

  return (
    <Page
      header={'Welcome to the Empty Set Dollar DAO'}
      subheader={'Manage, trade, and govern the ESD'}
    >
      <Box m={'-97px 0 20px'}>
        {oldDaoBalance > 0 || oldDollarBalance > 0 ? (
          <Box
            bg="white"
            p="2em 4em"
            border="1px solid #e8e8e8"
            borderRadius="lg"
            m="0em 0em 1em"
          >
            <Flex>
              <Box w="50%" pr="10px">
                <Heading fontSize="2xl">
                  Migrate your ESD V1 to ESD V1.5
                </Heading>
                <Text m="1em 0em 0em">
                  ESD has recently upgraded. Connect your wallet and click the
                  migrate button to burn your ESD V1 tokens and receive the
                  equivalent ESDS.
                </Text>
                <Text m="1em 0em 0em">
                  Learn more about the transition on <Link>our blog</Link>.
                </Text>
              </Box>
              <Box w="50%">
                <Heading fontSize="lg">Your V1 Balance</Heading>
                <Flex m="1em 0em 0em">
                  <Stat w="fit-content">
                    <StatLabel>Dollar (ESD)</StatLabel>
                    <Skeleton isLoaded={oldDollarBalance} mr="10px">
                      <StatNumber>ø {commas(oldDollarBalance)}</StatNumber>
                    </Skeleton>
                  </Stat>
                  <Stat>
                    <StatLabel>Stake (ESDS)</StatLabel>
                    <Skeleton isLoaded={oldDaoBalance} mr="10px">
                      <StatNumber>ø {commas(oldDaoBalance)}</StatNumber>
                    </Skeleton>
                  </Stat>
                </Flex>
                <br />
                <MigrationModal
                  account={account}
                  esd={oldDollarBalance}
                  esds={oldDaoBalance}
                />
              </Box>
            </Flex>
          </Box>
        ) : null}

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box
            bg="white"
            p="2em 4em"
            border="1px solid #e8e8e8"
            borderRadius="lg"
            flexGrow="1"
          >
            <Heading fontSize="2xl">Your Balance</Heading>
            <Flex m=".5em 0 0">
              <Stat>
                <StatLabel>Dollar (ESD)</StatLabel>
                <Skeleton isLoaded={dollarBalance} mr="10px">
                  <StatNumber>ø {commas(dollarBalance)}</StatNumber>
                </Skeleton>
              </Stat>
              <Stat>
                <StatLabel>Stake (ESDS)</StatLabel>
                <Skeleton isLoaded={stakeBalance} mr="10px">
                  <StatNumber>ø {commas(stakeBalance)}</StatNumber>
                </Skeleton>
              </Stat>
            </Flex>
          </Box>
          <Box
            bg="white"
            p="2em 4em"
            border="1px solid #e8e8e8"
            borderRadius="lg"
            w="auto"
          >
            <Heading fontSize="2xl" m="0em 0em 0.5em">
              Get Started with ESD
            </Heading>
            <Link onClick={() => router.push('/dollar')}>
              <Text fontSize="lg" m="0em 0em 0.25em">
                Mint & Redeem ESD tokens &rarr;
              </Text>
            </Link>
            <Link onClick={() => router.push('/governance')}>
              <Text fontSize="lg" m="0em 0em 0.25em">
                Make a proposal or vote in the governance process &rarr;
              </Text>
            </Link>
            <Link href="https://docs.emptyset.finance" isExternal={true}>
              <Text fontSize="lg" m="0em 0em 0.25em">
                Get stuck into the documentation &rarr;
              </Text>
            </Link>
          </Box>
        </Grid>
        <MoreInfo />
      </Box>
    </Page>
  )
}
