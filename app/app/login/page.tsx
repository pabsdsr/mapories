

import { AuthenticationForm } from '../../components/Authentication/Authentication';
import { Welcome } from '../../components/Welcome/Welcome';
import RootLayout from '../layout';

export default function LoginPage() {
  return (
    <>
      <RootLayout useAppShell={false}>
        <AuthenticationForm></AuthenticationForm>
      </RootLayout>
    </>
  );
}
