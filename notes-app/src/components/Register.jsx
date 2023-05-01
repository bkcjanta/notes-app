import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TabIndicator,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    console.log(auth.currentUser);
    const SignUp = async () => {
        if (email && password) {
            setLoading(true)
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user)
                navigate("/login");
            } catch (err) {
                console.log(err)
            }
        } else {
            alert("Please fill all the fields")
        }
        setLoading(false)
    }
    return (
        <Box w={"100%"} bg={"blue.100"} h={"100vh"} alignItems={"center"} display={"flex"} m={"auto"} justifyContent={"center"}>
            <Box bg={"blue.100"} borderRadius={"10px"} w={"400px"} h={"400px"} alignItems={"center"} display={"flex"} m={"auto"} justifyContent={"center"} boxShadow={"dark-lg"}>
                <Box w={"300px"} h={"300px"}>
                    <Tabs isFitted variant='enclosed' colorScheme='teal' defaultIndex={1} >
                        <TabList >
                            <Tab onClick={() => { navigate("/login") }} _selected={{ color: 'white', bg: 'teal' }}>Login</Tab>
                            <Tab onClick={() => { navigate("/signup") }} _selected={{ color: 'white', bg: 'teal' }}>Sign Up</Tab>
                        </TabList>
                        <TabIndicator
                            bg="blue.500"
                            borderRadius="1px"
                        />
                        <TabPanels p={"10px"} border={"2px "} borderColor={"teal"} borderBottomRadius={"10px"}>
                            <TabPanel >
                                <Box display={"flex"} m={"auto"} alignSelf={"center"}>
                                    <Stack w={"100%"} spacing={"10"}>
                                        <Stack spacing={"5"}>
                                            <VStack spacing={"5"}>
                                                <Input focusBorderColor='teal.400' placeholder='Email' type='email' bg={"transparent"} border={"2px"}
                                                    borderColor={"teal"} />
                                                <Input focusBorderColor='teal.400' placeholder='Password' type='password' border={"2px"}
                                                    borderColor={"teal"} />
                                            </VStack>
                                            <Button w="100%" colorScheme="teal" variant="solid" m={"auto"}>Login</Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Box display={"flex"} m={"auto"} alignSelf={"center"}>
                                    <Stack w={"100%"} spacing={"10"}>
                                        <Stack spacing={"5"}>
                                            <VStack spacing={"5"}>
                                                <Input focusBorderColor='teal.400' placeholder='Email' bg={"transparent"} border={"2px"} borderColor={"teal"} onChange={(e) => setEmail(e.target.value)} value={email} />
                                                <Input focusBorderColor='teal.400' placeholder='Password' type={"password"} border={"2px"} borderColor={"teal"} onChange={(e) => setPassword(e.target.value)} value={password} />
                                                <Input focusBorderColor='teal.400' placeholder='Confirm Password' type={"password"} border={"2px"} borderColor={"teal"} onChange={(e) => setPassword(e.target.value)} value={password} />
                                            </VStack>
                                            <Button isLoading={loading} onClick={SignUp} w="100%" colorScheme="teal" variant="solid" m={"auto"}>Sign Up</Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box >
        </Box>
    );
}