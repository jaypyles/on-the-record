import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function CommonCarousel() {
  const images = Array.from(
    { length: 5 },
    (_, i) => `/images/carousel/carousel-${i + 1}.jpg`
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 4000 })]}
      className="w-full"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="p-0">
                <CardContent className="flex items-center justify-center p-0 h-72">
                  <img
                    src={src}
                    alt={`Carousel ${index + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
