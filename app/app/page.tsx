import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { Hero } from '../components/Hero/Hero';
import RootLayout from './layout';

export default function HeroPage() {
  return (
      <RootLayout useAppShell={false}>
        <Hero />
      </RootLayout>
  );
}
