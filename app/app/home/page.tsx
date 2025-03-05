import { AuthenticationForm } from '../../components/Authentication/Authentication';
import { Welcome } from '../../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      {/* <RootLayout useAppShell={true}>
        <Welcome></Welcome>
      </RootLayout> */}
      <Welcome></Welcome>
    </>
  );
}
