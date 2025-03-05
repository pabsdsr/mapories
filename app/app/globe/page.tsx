
import { Globe } from '../../components/Globe/Globe';
import RootLayout from '../layout';



export default function MapView() {
  return (
    <RootLayout useAppShell={true}>
        <Globe></Globe>
    </RootLayout>
  );
}
