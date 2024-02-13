import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from "react-icons/ci";
import { toast } from 'react-toastify';

export default function App() {

  const [url, setURL] = useState();
  const [copied, setCopied] = useState(false);


  const onDrop = useCallback(acceptedFiles => {
    uploadfile(acceptedFiles[0])
  }, [])

  const HandleCopy = () => {
    toast("Url Copied Successfully");
    setCopied(true)
  }


  const uploadfile = async (file) => {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://chocolate-deer-kit.cyclic.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data.url);
      setURL(response.data.url)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <Box
      width={'100%'}
      height={'100vh'}
      border={'1px solid #000'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      bgColor={'#f7f7f7'}
      overflowY={'auto'}
    >
      <Box
        width={'80%'}
        height={'auto'}
        bgColor={'#FFF'}
        borderRadius={'15px'}
      >
        <Box {...getRootProps()} width={'100%'} height={'400px'} border={'1px solid #000'}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <Box
                width={'100%'}
                height={'100%'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <CiImageOn size={100} />
                <Text>Upload Your Image</Text>
              </Box>
          }
        </Box>
        {url && <Box mt={10}>
          <Flex
            width={'100%'}
            height={'auto'}
            py={4}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={10}
            border={'1px solid blueviolet'}
          >
            <Text bgColor={'blueviolet'} p={2} color={'#FFF'} borderRadius={'10px'}>{url && url}</Text>
            <CopyToClipboard text={url && url} onCopy={HandleCopy}>
              <Button>Copy Link</Button>
            </CopyToClipboard>
          </Flex>
        </Box>}

      </Box>
    </Box>
  )
}
