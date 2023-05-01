import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                navigate("/dashboard");
            } else {
                setUser(null)
            }
        })
    }, [])
    return (
        <div>

            <Box w={"100%"} h={"100vh"} bg={"blue.100"} p={"10px"}>
                {!user ?
                    <>
                        <Heading Heading mt={"20px"} textAlign={"center"}>Welcome to My Notes App.</Heading>
                        <Text mt={"10px"} textAlign={"center"} color={"green"}>User friendly , Secure , Manage your tasks and notes with us.</Text>

                        <Box mt={"50px"} mb={"50px"}>
                            <SimpleGrid columns={[1, 1, 2]} spacing={[5, 5, 10]}>
                                <Flex _hover={{ bg: "red.500", scale: .2 }} justifyContent={"center"} alignItems={"center"} bg='red.600' borderRadius={"10px"} height='80px'><Heading m="auto" cursor={"pointer"} textAlign={"center"} color={"white"} size={["sm", "md", "md"]}>Create account & Login</Heading></Flex>
                                <Flex _hover={{ bg: "green.500", scale: .2 }} justifyContent={"center"} alignItems={"center"} bg='green.600' borderRadius={"10px"} height='80px'><Heading m="auto" cursor={"pointer"} textAlign={"center"} color={"white"} size={["sm", "md", "md"]}>Create Notes</Heading></Flex>
                                <Flex _hover={{ bg: "blue.500", scale: .2 }} justifyContent={"center"} alignItems={"center"} bg='blue.600' borderRadius={"10px"} height='80px'><Heading m="auto" cursor={"pointer"} textAlign={"center"} color={"white"} size={["sm", "md", "md"]}>Edit / Update / Delete Notes</Heading></Flex>
                                <Flex _hover={{ bg: "orange.500", scale: .2 }} justifyContent={"center"} alignItems={"center"} bg='orange.600' borderRadius={"10px"} height='80px'><Heading m="auto" cursor={"pointer"} textAlign={"center"} color={"white"} size={["sm", "md", "md"]}>Fun with Notes</Heading></Flex>
                            </SimpleGrid>
                        </Box>
                        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                            <Box mt={"50px"} w={"fit-content"} _hover={{ bg: "yellow.200", scale: .2 }} display={"flex"} m="auto" bg={"yellow.300"} p={"10px"} borderRadius={"5px"} >
                                <Link to="/login"><Heading size={["sm", "md", "md"]}>Get Started</Heading></Link>
                            </Box>
                        </Box>
                    </> :

                    <Box display={"flex"} justifyContent={"center"} w={"100%"} h={"95vh"}>
                        <Heading textAlign={"center"} >Loading....</Heading>
                    </Box>}

            </Box>


        </div>
    )
}

export default Home
