import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '../components/Logo';
import { Paragraph, Button, Headline, Subheading } from 'react-native-paper';

export const WelcomeScreen: React.FunctionComponent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, }}>
      <View style={{ padding: 24, justifyContent: 'center' }}>
        <View
          style={{
            marginBottom: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Headline style={{ marginTop: 24 }}>
            Welcome to Poketto Wallet
          </Headline>
          <Paragraph>Secured store for your digital assets</Paragraph>
        </View>
        <View>
          <Button
            mode="contained"
            uppercase={ false }
            onPress={() => navigation.navigate('new_wallet')}>
            Create a new wallet
          </Button>
          <Button
            mode="text"
            style={{marginTop: 8}}
            uppercase={ false }
            onPress={() => navigation.navigate('import_wallet')}>
            Import my existing wallet
          </Button>
        </View>
      </View>
    </View>
  );
};
