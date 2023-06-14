import { Button, Box, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure, Modal, Accordion, AccordionItem, AccordionButton, AccordionPanel, Heading, HStack, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useAuth from '../useAuth';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
const Dashboard = () => {
    const [uid, setUid] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false)
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState(null);
    const user = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        if (user) {
            setUid(user.uid)
        }
    }, [user])
    useEffect(() => {
        const getNotes = async () => {
            const dbRef = collection(database, 'users', uid, 'notes');
            const q = query(dbRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const tempDoc = [];
            querySnapshot.forEach((doc) => {
                tempDoc.push({ ...doc.data(), id: doc.id });
            });
            setNotes(tempDoc);

            console.log(tempDoc)
        };
        if (uid) {
            getNotes();
        }
    }, [uid, flag]);






    const AddNote = async () => {
        setLoading(true);
        if (title && content && uid) {
            const temp = title.charAt(0).toUpperCase() + title.slice(1);
            const temp2 = content.charAt(0).toUpperCase() + content.slice(1);
            try {

                const docRef = await addDoc(collection(database, 'users', uid, 'notes'), {
                    title: temp,
                    content: temp2,
                    createdAt: new Date().toISOString(),
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }
        setLoading(false);
        setTitle('');
        setContent('');
        setFlag(!flag)
        onClose()
    }

    const handleDelete = async (note) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            setLoading(true);
            try {
                await deleteDoc(doc(database, 'users', uid, 'notes', note.id));
                alert("Note deleted successfully")
            } catch (e) {
                console.error("Error removing document: ", e);
                alert("Error deleting note")
            }
            setLoading(false);
            setFlag(!flag)
        } else {
            return;
        }
    }

    const handleEdit = async (note) => {
        setTitle(note.title);
        setContent(note.content);
        onOpen();
        setEdit(true);
        setNote(note)

    }

    const handleUpdate = async () => {
        setLoading(true);
        if (title && content && uid) {
            const temp = title.charAt(0).toUpperCase() + title.slice(1);
            const temp2 = content.charAt(0).toUpperCase() + content.slice(1);
            try {
                const docRef = await updateDoc(doc(database, 'users', uid, 'notes', note.id), {
                    title: temp,
                    content: temp2,
                    createdAt: new Date().toISOString(),
                });

            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setFlag(!flag);
            setLoading(false);
            setTitle('');
            setContent('');
            setEdit(false);
            setNote(null);
            onClose()

        }
        setLoading(false);
    }


    return (
        <div>
            <Box w={"100%"} p={"10px"}>
                <Flex mb={"10px"} w="100%" justifyContent={"center"} > <Button size={["sm", "md", "md"]} colorScheme='green' onClick={onOpen} >CREATE NOTE +</Button></Flex>

                <Box>
                    <Accordion allowToggle w={["95%", "80%", "70%"]} m={"auto"} spacing={10}>
                        {notes.map((note, ind) => (

                            <AccordionItem key={note.createdAt}>
                                {({ isExpanded }) => (
                                    <>
                                        <h2>
                                            <AccordionButton bg={"teal.200"}>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    <Heading size={["sm"]}> {ind + 1 + " " + note.title}</Heading>
                                                </Box>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    {note.createdAt.split("T")[0] + note.createdAt.split("T")[1].split(".")[0]}
                                                </Box>

                                                {isExpanded ? (
                                                    <MinusIcon fontSize='12px' />
                                                ) : (
                                                    <AddIcon fontSize='12px' />
                                                )}
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel p={0} m={0} bg={"whiteAlpha.200"}>
                                            {
                                                // split the content by new line and space
                                                <Box border={"1px"} p={5} m={0}>
                                                    {note.content.split("\n").map((item, ind) => (
                                                        <p key={ind}>{item}</p>
                                                    ))}
                                                    <HStack justifyContent={"center"}>
                                                        <HStack>
                                                            <Button onClick={() => handleEdit(note)} colorScheme='yellow' size={"sm"} p={0} m={0}>Edit</Button>
                                                            <Button isLoading={loading} onClick={() => handleDelete(note)} colorScheme='red' size={"sm"} p={0} m={0}>Delete</Button>

                                                        </HStack>
                                                    </HStack>
                                                </Box>


                                            }

                                        </AccordionPanel>

                                    </>
                                )}
                            </AccordionItem>

                        ))}
                    </Accordion>
                </Box>
            </Box>


            {/* Modal */}

            <>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => {
                    setTitle('');
                    setContent('');
                    setEdit(false);
                    setNote(null);
                    onClose()
                }}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Note</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <Stack spacing={"10"}>
                                <Input placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} value={title} />

                                <Textarea h={"200px"} placeholder={"content"} onChange={(e) => setContent(e.target.value)} value={content} />
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button isLoading={loading} colorScheme='green' mr={3} onClick={edit ? handleUpdate : AddNote}>
                                {edit ? "Update" : "Save"}
                            </Button>
                            <Button onClick={() => {
                                setTitle('');
                                setContent('');
                                setEdit(false);
                                setNote(null);
                                onClose()
                            }}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </div>
    )
}

export default Dashboard
