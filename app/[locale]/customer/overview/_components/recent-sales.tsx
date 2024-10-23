import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

export function RecentSales() {
  const t = useTranslations('OverViewPage');

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/*<AvatarImage src="/avatars/01.png" alt="Avatar" />*/}
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            69947497 Брюки Gucci
          </p>
          <p className="text-sm text-muted-foreground">GG-jersey track pants</p>
        </div>
        <div className="ml-auto font-medium">+$90</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          {/*<AvatarImage src="/avatars/02.png" alt="Avatar" />*/}
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            69947497 Polar coat
          </p>
          <p className="text-sm text-muted-foreground">Web-stripe trousers</p>
        </div>
        <div className="ml-auto font-medium">$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/*<AvatarImage src="/avatars/03.png" alt="Avatar" />*/}
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            69947497 Запчасти для машины
          </p>
          <p className="text-sm text-muted-foreground">
            Автомобильный руль БМВ, кожаный, черный
          </p>
        </div>
        <div className="ml-auto font-medium">+$29.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/*<AvatarImage src="/avatars/04.png" alt="Avatar" />*/}
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">69947497 Бады</p>
          <p className="text-sm text-muted-foreground">
            Optimum Nutrition, Gold Standard Pre-Workout
          </p>
        </div>
        <div className="ml-auto font-medium">+$9.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/*<AvatarImage src="/avatars/05.png" alt="Avatar" />*/}
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">D1 Milano</p>
          <p className="text-sm text-muted-foreground">Petite Moss 34mm</p>
        </div>
        <div className="ml-auto font-medium">+$93.00</div>
      </div>
    </div>
  );
}
