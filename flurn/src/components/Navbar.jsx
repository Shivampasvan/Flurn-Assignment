import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Box
        bg={useColorModeValue('blue.100', 'blue.900')}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={999}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box display={{base:"none",md:"block", lg:"block",xl:"block","2xl":"block"}}>FLURN</Box>
          <Box
            display="flex"
            justifyContent='space-evenly'
            width='100%'
            mt={4}
            marginBottom="13px"
          >
            <Button variant='link' onClick={() => navigate('/')}  marginLeft="-10px">
              Search
            </Button>
            <Button variant='link' onClick={() => navigate('/list')}  marginLeft="5px" marginRight="5px">
              List
            </Button>
            <Button variant='link' onClick={() => navigate('/bookmarks')} >
              Bookmarks
            </Button>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}