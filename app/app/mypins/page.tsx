import { AppStructure } from '../../components/AppShell/AppShell';
import { CarouselCard } from '@/components/Carousel/CarouselCard';
import { CarouselContainerAll } from '@/components/Carousel/CarouselContainerAll';


export default function HomePage() {
  return (
    <>
      <AppStructure>
        <CarouselContainerAll></CarouselContainerAll>
      </AppStructure>

    </>
  );
}
