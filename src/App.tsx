import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Text,
  Image,
  VStack,
  HStack,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

function App() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [utmSource, setUtmSource] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || 'direct');
  }, []);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async () => {
    setMessage('');

    if (!email) {
      setMessage(t('EMAIL_REQUIRED'));
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage(t('EMAIL_FORMAT_INVALID'));
      return;
    }

    try {
      const response = await fetch(
        'https://api.dev.donaboon.org/v1/landing/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, utm_source: utmSource }),
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setMessage(t('SUCCESS_MESSAGE'));
        setEmail('');
      } else {
        if (data.errors && data.errors.length > 0) {
          switch (data.errors[0]) {
            case 'landing.subscription.email.alreadyUsed':
              setMessage(t('EMAIL_ALREADY_SUBSCRIBED'));
              break;
            case 'landing.subscription.email.required':
              setMessage(t('EMAIL_REQUIRED'));
              break;
            case 'landing.subscription.email.invalid':
              setMessage(t('EMAIL_INVALID'));
              break;
            default:
              setMessage(t('SUBSCRIPTION_FAILED'));
          }
        } else {
          setMessage(t('SUBSCRIPTION_FAILED'));
        }
      }
    } catch (error) {
      setMessage(t('AN_ERROR_OCCURRED'));
      console.error('Subscription error:', error);
    }
  };

  return (
    <VStack>
      <VStack
        w='100vw'
        height='100vh'
        display='flex'
        flexDirection='column'
        backgroundImage='url(background.jpg)'
        backgroundSize='auto 100vh'
        alignItems='left'
        backgroundPosition='right center'
        backgroundRepeat='no-repeat'
      >
        <VStack
          w='100%'
          maxW='600px'
          height='100vh'
          justifyContent='space-between'
          alignItems='left'
          pl={{ base: 5, sm: 10 }}
          pr={{ base: 5, sm: 10, md: 0 }}
        >
          <VStack
            direction='row'
            alignItems='center'
            gap='10px'
            filter='brightness(10000%)'
            mt='50px'
          >
            <Text
              fontWeight={600}
              color='white'
              fontSize={{ base: 40, sm: 50 }}
              lineHeight={1}
            >
              {t('DONABOON')}
            </Text>
            <HStack alignItems='start' h='60px' ml={20}>
              <Image
                src='logo.png'
                alt='Donaboon Logo'
                width={{ base: 61, sm: 81 }}
                borderRadius='8px'
                mr={0}
              />
              <Text color='white' fontSize={{ base: 20, sm: 25 }}>
                {t('COMING_SOON')}
              </Text>
            </HStack>
          </VStack>

          <VStack
            textAlign='center'
            maxWidth='800px'
            color='white'
            pl={{ base: 0, md: '20px' }}
            marginInline={{ base: '10px', sm: '0' }}
          >
            <Text
              fontWeight={600}
              lineHeight={1.3}
              textShadow='2px 2px 4px rgba(0,0,0,0.3)'
              maxWidth='600px'
              mx='auto'
              fontSize={{ base: 23, sm: 27 }}
            >
              {t('JOIN_OUR_JOURNEY')}
            </Text>
            <Text
              as='h4'
              mb={4}
              lineHeight={1.3}
              textShadow='2px 2px 4px rgba(0,0,0,0.3)'
              maxWidth='600px'
              mx='auto'
              fontSize={{ base: 16, sm: 22 }}
            >
              {t('LEAVE_EMAIL_LAUNCH_NOTIFY')}
            </Text>

            <HStack
              w='full'
              gap={{ base: 2, sm: 5 }}
              pl={{ base: 0, sm: '10px' }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Input
                placeholder={t('YOUR_EMAIL_ADDRESS')}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg='#00000040'
                h={{ base: '40px', sm: '60px' }}
                borderRadius={{ base: '20px', sm: '30px' }}
                color='white'
                _placeholder={{ color: 'white', textAlign: 'center' }}
                fontSize={{ base: 13, sm: 20 }}
                fontWeight={400}
                padding='10px 14px'
                flex='1'
                border='none'
                outline='none'
                textAlign='center'
                _hover={{ outline: '5px solid #0d9488' }}
              />
              <Button
                onClick={handleSubmit}
                bg='#00000040'
                color='white'
                padding='12px 24px'
                h={{ base: '30px', sm: '60px' }}
                borderRadius='20px'
                width='auto'
                fontSize={{ base: 12, sm: 17 }}
                fontWeight={100}
                p={2}
                _hover={{ outline: '5px solid #0d9488' }}
              >
                {t('NOTIFY_ME')}
              </Button>
            </HStack>
            <Text color='white' fontWeight={500} m='none' h={10}>
              {message ?? ''}
            </Text>
          </VStack>

          <VStack
            color='white'
            alignItems='start'
            pl={{ base: 0, md: 5 }}
            gap={3}
          >
            <HStack
              gap={2}
              fontSize={{ base: 12, sm: 17 }}
              alignItems='end'
              pl={{ base: 3, md: 8 }}
            >
              <Link
                href='https://www.facebook.com/donaboon.official/'
                target='_blank'
                rel='noopener noreferrer'
                color='white'
                alignItems='end'
              >
                <Image
                  src='facebook.png'
                  alt='Facebook'
                  w={{ base: 15, sm: 19 }}
                />
                <Text fontWeight={600}>{t('EVERYDAY_NEWS')}</Text>
              </Link>
            </HStack>
            <HStack gap={3} pl={{ base: 0, sm: 5 }}>
              <HStack
                bg='#C0E0D3'
                gap={3}
                borderRadius={60}
                p={{ base: 1, sm: 2 }}
                paddingInline={{ base: 4, sm: 5 }}
              >
                <IconButton
                  onClick={() => handleLanguageChange('en')}
                  aria-label='Switch to English'
                  border='none'
                  background='none'
                >
                  <Image
                    src='usa.png'
                    alt='US Flag'
                    w={{ base: 41, sm: 50 }}
                    borderRadius={2}
                    _hover={{ outline: '5px solid #0d9488' }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleLanguageChange('ua')}
                  aria-label='Switch to Ukrainian'
                  border='none'
                  background='none'
                >
                  <Image
                    src='ukraine.png'
                    alt='Ukraine Flag'
                    w={{ base: 41, sm: 50 }}
                    borderRadius={2}
                    _hover={{ outline: '5px solid #0d9488' }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleLanguageChange('ro')}
                  aria-label='Switch to Romanian'
                  border='none'
                  background='none'
                >
                  <Image
                    src='romania.png'
                    alt='Romania Flag'
                    w={{ base: 41, sm: 50 }}
                    borderRadius={2}
                    _hover={{ outline: '5px solid #0d9488' }}
                  />
                </IconButton>
              </HStack>

              <a
                href='https://www.linkedin.com/in/donaboon-ro-45220837b/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='linkedin.png'
                  alt='LinkedIn'
                  w={{ base: 33, sm: 41 }}
                />
              </a>
              <a
                href='https://www.instagram.com/donaboon.official/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='instagram.png'
                  alt='Instagram'
                  w={{ base: 33, sm: 37 }}
                />
              </a>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default App;
