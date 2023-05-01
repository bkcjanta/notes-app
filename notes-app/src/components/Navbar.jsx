import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { auth } from '../firebase';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const logo = "<Notes App/>"
export const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
                navigate("/login")
            }
        })
    }, [])
    const logout = () => {
        auth.signOut()
    }

    return (
        <>
            <Box position={"sticky"} top={0} zIndex={5} bg={useColorModeValue('blue.200', 'blue.700')} px={{ base: 4, sm: 4, md: 4, lg: 10 }} >
                <Flex w={"100%"} h={16} alignItems={'center'} justifyContent={'space-between'}>

                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <HStack w={{ base: "65%", sm: "60%", md: "100%", lg: "100%" }} justifyContent={"space-between"}>
                        <Heading size={"lg"} >{logo}</Heading>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>

                            {!user ? <Link to='/'> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Home</Heading> </Box></Link> :
                                <Text size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Hi! {user && user.email.split("@")[0]}</Text>
                            }
                            {user ? <Link to='/dashbord'> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Dashboard</Heading></Box></Link> :
                                <Link to={'/signup'}> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Register</Heading></Box></Link>}
                            {!user ? <Link to={'/login'}> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Login</Heading> </Box></Link> :
                                <Button onClick={logout} colorScheme='blue'>Logout</Button>}
                        </HStack>
                    </HStack>

                </Flex>

                {isOpen ? (
                    <Box display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={2}>
                            {!user ? <Link to='/'> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Home</Heading> </Box></Link> :
                                <Text size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Hi! {user && user.email.split("@")[0]}</Text>
                            }
                            {user ? <Link to='/dashbord'> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Dashboard</Heading></Box></Link> :
                                <Link to={'/signup'}> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Register</Heading></Box></Link>}
                            {!user ? <Link to={'/login'}> <Box px={2} py={1} rounded={'md'} _hover={{ color: "white", bg: "gray.700" }}><Heading size={["sm", "md", "md"]} _hover={{ color: "while", bg: "gray.700" }}>Login</Heading> </Box></Link> :
                                <Button onClick={logout} colorScheme='blue'>Logout</Button>}

                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}