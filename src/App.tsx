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
  Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DonaboonLogoIcon } from './DonaboonLogo';
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
    <VStack
      w='100vw'
      height='100svh'
      backgroundImage='url(background.jpg)'
      backgroundSize='cover'
      alignItems='left'
      backgroundPosition='right center'
    >
      <VStack
        w='full'
        height='full'
        maxW='xl'
        justifyContent='space-between'
        p='10'
        bg='teal.700/50'
        backdropFilter='blur(3px)'
        boxShadow='2xl'
      >
        <VStack alignItems='center' w='full'>
          <HStack align='center'>
            <Text
              fontWeight='bold'
              color='teal.50'
              fontSize={{ base: '6xl', smDown: '5xl' }}
              lineHeight={0.5}
            >
              {t('DONABOON')}
            </Text>
            <Icon
              as={DonaboonLogoIcon}
              css={{
                width: { base: '4rem', smDown: '3.5rem' },
              }}
              stroke='white'
              fill='teal.50'
            />
          </HStack>
          <Text
            color='teal.50'
            fontSize={{ base: '2xl', smDown: 'xl' }}
            letterSpacing={1.5}
            textAlign='start'
          >
            {t('COMING_SOON')}
          </Text>
        </VStack>
        <VStack textAlign='center' color='teal.50' gap='8'>
          <VStack gap='0'>
            <Text fontWeight='bold' fontSize={{ base: '2xl', smDown: 'xl' }}>
              {t('JOIN_OUR_JOURNEY')}
            </Text>
            <Text fontWeight='semibold' fontSize={{ base: 'xl', smDown: 'lg' }}>
              {t('LEAVE_EMAIL_LAUNCH_NOTIFY')}
            </Text>
          </VStack>

          <HStack
            w='full'
            gap={{ base: '4', smDown: '3' }}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Input
              placeholder={t('YOUR_EMAIL_ADDRESS')}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              textAlign='center'
              colorPalette='teal'
              size={{ base: 'xl', smDown: 'lg' }}
              variant='subtle'
              bgColor='teal.600/90'
              color='teal.50'
              fontSize={{ base: 'xl', smDown: 'lg' }}
              _placeholder={{ color: 'teal.100' }}
              outlineColor='teal.50'
              outlineWidth='2px'
              transition='all 0.2s'
              _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
              _active={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
              _focus={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
              rounded='xl'
              w='full'
            />
            <Button
              onClick={handleSubmit}
              fontSize={{ base: 'xl', smDown: 'lg' }}
              colorPalette='teal'
              size={{ base: 'xl', smDown: 'lg' }}
              variant={'surface'}
              rounded='xl'
              w={{ base: 'auto', mdDown: 'full' }}
            >
              {t('NOTIFY_ME')}
            </Button>
          </HStack>
          <Text color='white' fontWeight={500} m='none' h={10}>
            {message ?? ''}
          </Text>
        </VStack>

        <VStack color='white' alignItems='center' gap={3}>
          <HStack gap={2} fontSize={{ base: 12, sm: 17 }} alignItems='end'>
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
          <HStack gap={4}>
            <HStack
              bg='#C0E0D3'
              gap={3}
              rounded='xl'
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
                  transition='all 0.2s'
                  _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
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
                  transition='all 0.2s'
                  _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
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
                  transition='all 0.2s'
                  _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
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
  );
}

export default App;
