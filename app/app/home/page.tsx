import { AuthenticationForm } from '../../components/Authentication/Authentication';
import { Welcome } from '../../components/Welcome/Welcome';
import { AppStructure } from '../../components/AppShell/AppShell';


export default function HomePage() {
  return (
    <>
      <AppStructure>
        <Welcome></Welcome>
      </AppStructure>

    </>
  );
}
