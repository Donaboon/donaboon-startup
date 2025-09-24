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
import { useNavigate, useParams } from 'react-router-dom';
import { buildRoute } from './utils/router.utils';

import backgroundSrc from '/background.jpg';
import facebookSrc from '/facebook.png';
import instagramSrc from '/instagram.png';
import linkedinSrc from '/linkedin.png';
import romaniaSrc from '/romania.png';
import ukraineSrc from '/ukraine.png';
import usaSrc from '/usa.png';

function App() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { language } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || 'direct');

    if (language) {
      if (['en', 'ua', 'ro'].includes(language)) {
        i18n.changeLanguage(language);
      } else {
        i18n.changeLanguage('en');

        navigate(buildRoute('/', { language: 'en', saveSearchParams: true }));
      }
    }
  }, [language, navigate]);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    navigate(buildRoute('/', { language: lng, saveSearchParams: true }));
  };

  const handleSubmit = async () => {
    setMessage('');

    if (!email) {
      setMessage('EMAIL_REQUIRED');
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage('EMAIL_FORMAT_INVALID');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        'https://api.donaboon.org/v1/landing/subscribe',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            utmSource,
            lang: i18n.language,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setMessage('SUCCESS_MESSAGE');
        setEmail('');
        setIsCompleted(true);
      } else {
        if (data.errors && data.errors.length > 0) {
          switch (data.errors[0]) {
            case 'landing.subscription.email.alreadyUsed':
              setMessage('EMAIL_ALREADY_SUBSCRIBED');
              break;
            case 'landing.subscription.email.required':
              setMessage('EMAIL_REQUIRED');
              break;
            case 'landing.subscription.email.invalid':
              setMessage('EMAIL_INVALID');
              break;
            default:
              setMessage('SUBSCRIPTION_FAILED');
          }
        } else {
          setMessage('SUBSCRIPTION_FAILED');
        }
      }
    } catch (error) {
      setMessage('AN_ERROR_OCCURRED');
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack
      w='100vw'
      height='100svh'
      backgroundImage={`url(${backgroundSrc})`}
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

          {!isCompleted && (
            <HStack
              w='full'
              gap={{ base: '4', smDown: '3' }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Input
                autocomplete='email'
                placeholder={t('YOUR_EMAIL_ADDRESS')}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                textAlign='center'
                colorPalette='teal'
                size={{ base: 'xl', smDown: 'lg' }}
                variant='subtle'
                bgColor='teal.700/90'
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
                disabled={isLoading}
              />
              <Button
                onClick={handleSubmit}
                fontSize={{ base: 'xl', smDown: 'lg' }}
                colorPalette='teal'
                size={{ base: 'xl', smDown: 'lg' }}
                variant={'surface'}
                rounded='xl'
                w={{ base: 'auto', mdDown: 'full' }}
                loading={isLoading}
              >
                {t('NOTIFY_ME')}
              </Button>
            </HStack>
          )}
          {message && (
            <Text color='white' fontWeight={500} m='none' h={10}>
              {t(message)}
            </Text>
          )}
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
                src={facebookSrc}
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
                  src={usaSrc}
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
                  src={ukraineSrc}
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
                  src={romaniaSrc}
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
                src={linkedinSrc}
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
                src={instagramSrc}
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
