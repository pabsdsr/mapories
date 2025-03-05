import { AuthenticationForm } from '../../components/Authentication/Authentication';
import { Welcome } from '../../components/Welcome/Welcome';
import RootLayout from '../layout';

export default function HomePage() {
  return (
    <>
      <RootLayout useAppShell={true}>
        <Welcome></Welcome>
      </RootLayout>
    </>
  );
}
