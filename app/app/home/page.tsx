import { AuthenticationForm } from '../../components/Authentication/Authentication';
import { Welcome } from '../../components/Welcome/Welcome';
import { AppStructure } from '../../components/AppShell/AppShell';
import { CarouselCard } from '@/components/Carousel/CarouselCard';
import { CarouselContainer } from '@/components/Carousel/CarouselContainer';


export default function HomePage() {
  return (
    <>
      <AppStructure>
        {/* <CarouselCard></CarouselCard> */}
        <CarouselContainer></CarouselContainer>
      </AppStructure>

    </>
  );
}
