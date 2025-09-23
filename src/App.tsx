import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Text,
  Image,
  VStack,
  HStack
} from '@chakra-ui/react';


function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [utmSource, setUtmSource] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || 'direct');
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('https://api.dev.donaboon.org/v1/landing/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: utmSource }),
      });

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setMessage('Thank you for subscribing! We will notify you when we launch.');
        setEmail('');
      } else {
        if (data.errors && data.errors.length > 0) {
          switch (data.errors[0]) {
            case 'landing.subscription.email.alreadyUsed':
              setMessage('This email is already subscribed.');
              break;
            case 'landing.subscription.email.required':
              setMessage('Email is required.');
              break;
            case 'landing.subscription.email.invalid':
              setMessage('Please enter a valid email address.');
              break;
            default:
              setMessage('Subscription failed. Please try again.');
          }
        } else {
          setMessage('Subscription failed. Please try again.');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <VStack
      w="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      backgroundImage="url(background.jpg)"
      backgroundSize="auto 100vh"
      alignItems='left'
      backgroundPosition='right center'
      backgroundRepeat='no-repeat'
    >
      <VStack
        w={{base:'100%', md:'700px'}}
        height="100vh"
        justifyContent='space-between'
        alignItems='left'
        >
        <VStack
          direction="row"
          alignItems="center"
          gap="10px"
          filter="brightness(10000%)"
          mt="50px"
        >
          
          <Text fontWeight={600} color="white" fontSize={{base: 60, md: 85}} lineHeight={1}>
            DONABOON
          </Text>
          <HStack
          alignItems="start" h='60px' ml={20}>
            <Image
              src="logo.png"
              alt="Donaboon Logo"
              width={{base: 100, md: 150}}
              borderRadius="8px"
              mr={5}
            />
            <Text color="white" fontSize={{base: 30, md: 40}}>
              COMING SOON
            </Text>
          </HStack>
          
        </VStack>

        <VStack
          textAlign="center"
          maxWidth="800px"
          color="white"
          pl={{base:0, md:"20px"}}
          marginInline={{base:'10px', md:"0"}}
        >
          <Text
            fontWeight={600}
            lineHeight={1.3}
            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            maxWidth="600px"
            mx="auto"
            fontSize={{base: 40, md: 50}}
          >
            Join our journey! 
          </Text>
          <Text
            as="h4"
            mb={4}
            lineHeight={1.3}
            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
            maxWidth="600px"
            mx="auto"
            fontSize={{base: 30, md: 40}}
          >
            Leave your email and be the first to know when we launch.
          </Text>

          <HStack w='full' gap={5} pl={{base:0, md:"10px"}}>
            <Input
              placeholder="Your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg='#00000040'
              h='80px'
              borderRadius='40px'
              color="white"
              _placeholder={{ color: "white", textAlign: 'center'}}
              fontSize={{base: 23, md: 30}}
              fontWeight={400}
              padding= '10px 14px'
              flex='1'
              border='none'
              outline='none'
              textAlign='center'
            />
            <Button
              onClick={handleSubmit}
              bg='#00000040'
              color="white"
              padding="12px 24px"
              h='80px'
              borderRadius="30px"
              width="auto"
              fontSize={{base: 20, md: 25}}
              fontWeight={100}
              p={2}
            >
              NOTIFY ME
            </Button>
          </HStack>

          {message && (
            <Text mt={3} color="white" fontWeight={500}>
              {message}
            </Text>
          )}
        </VStack>

        <VStack
          color="white"
          alignItems='start'
          pl={5}
          gap={3}
        >
          <HStack gap={2} fontSize={{base: 23, md: 30}} alignItems='end' pl={8}>
            <Image src="facebook.png" alt="Facebook" w={{base: 23, md: 30}}/>
            <Text fontWeight={600}>DONABOON | EVERYDAY NEWS</Text>
          </HStack>
          <HStack gap={5} pl={{base: 0, md: 5}}>
            <HStack bg='#C0E0D3' gap={8}
              borderRadius={60} p={5} paddingInline={7}>
              <Image src="usa.png" alt="US Flag" w={{base: 61, md: 81}}/>
              <Image src="ukraine.png" alt="Ukraine Flag" w={{base: 61, md: 81}}/>
              <Image src="romania.png" alt="Romania Flag" w={{base: 61, md: 81}}/>
            </HStack>
            
            <Image src="linkedin.png" alt="LinkedIn" w={{base: 55, md: 75}}/>
            <Image src="instagram.png" alt="Instagram" w={{base: 49, md: 65}}/>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default App;