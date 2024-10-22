'use client';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Earth, MapPin, Package, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PersonIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';

interface ProfileFormType {
  initialData: any | null;
  categories: any;
  session: Session;
}

const NotificationCardContainer: React.FC<ProfileFormType> = ({ session }) => {
  const title = 'Адрес складов Ethno Logistics';
  const description =
    'При регистрации в онлайн магазине, пожалуйста, укажите один из следующих адресов. \n' +
    'Вы можете получить свою посылку в течение ≈5-10 рабочих дней после ввоза посылки на наш международный склад.\n' +
    'Внимание: во всех магазинах, где при регистрации нужен номер телефона для получения идентификационного кода, не предназначено использовать номер телефона склада.';

  function CustomContainer({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn(
          'flex items-center justify-center [&>div]:w-full',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div className=" xs:grid-cols-2 items-start justify-center gap-6 rounded-lg p-8 sm:grid-cols-2 md:grid  lg:grid-cols-2 xl:grid-cols-4">
        {addressList.map((address, index) => (
          <div
            className="col-span-2 grid items-start gap-6 lg:col-span-1"
            key={index}
          >
            <CustomContainer>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{address.title}</CardTitle>
                  <CardDescription>
                    {address.address}, {address.city}, {address.state},{' '}
                    {address.postalCode}, {address.country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <MapPin className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Address
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.address}
                      </p>
                    </div>
                  </div>

                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Earth className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">City</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Package className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Postal Code
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Earth className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Country
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.country}
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <Phone className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Country
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.country}
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <PersonIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Receiver
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.user.userId} {session.user.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                    <PersonIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Contact Person
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.contactPerson}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CustomContainer>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationCardContainer;

interface WarehouseAddress {
  title: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  contactPerson: string;
}

const addressList: WarehouseAddress[] = [
  {
    title: 'Российская Федерация',
    address: 'ул. Винокурова 7/5к3',
    city: 'Москва',
    state: 'Москвская область',
    postalCode: '62701',
    country: 'Российская Федерация',
    phone: '+7 499 390 07 70',
    contactPerson: 'Бехруз Садыков'
  },
  {
    title: 'Республика Узбекистан',
    address: 'ул. Богиравон, 55',
    city: 'Ташкент',
    state: 'Ташкентская область',
    postalCode: '100208',
    country: 'Республика Узбекистан',
    phone: '+998 55 520 20 20',
    contactPerson: 'Назиров Аббос'
  },
  {
    title: 'Кыргызская Республика',
    address: 'Жибек-Жолу 443/1А',
    city: 'Бишкек',
    state: 'Бишкек',
    postalCode: '62702',
    country: 'Кыргызская Республика',
    phone: '+996 999 44 11 11',
    contactPerson: 'Якубжанов Шерзод'
  },
  {
    title: 'Республика Таджикистан',
    address: 'ул. Якка-Чинарская, 142/2',
    city: 'Душанбе',
    state: 'Душанбе',
    postalCode: '62702',
    country: 'Республика Таджикистан',
    phone: '+992 20 309 90 00',
    contactPerson: 'Фаромуз Хамидов'
  },
  {
    title: 'Республика Казахстан',
    address: 'ул. Ислама Каримова, 164',
    city: 'Алматы',
    state: 'Алматы',
    postalCode: '62702',
    country: 'Республика Казахстан',
    phone: '+7 707 305 95 59',
    contactPerson: 'Алимджанов Убайдулло'
  },
  {
    title: 'Объединенные Арабские Эмираты',
    address: 'Дубай',
    city: 'Дубай',
    state: 'Дубай',
    postalCode: '62702',
    country: 'Объединенные Арабские Эмираты',
    phone: '555-5678',
    contactPerson: 'XXX'
  },
  {
    title: 'Турция',
    address: 'Фатих, махалле Катип Касим, улица Катип Касым Джамии, 5. 1.Kat',
    city: 'Стамбул',
    state: 'Стамбул',
    postalCode: '62702',
    country: 'Турция',
    phone: '+90 551 747 95 59',
    contactPerson: 'Кахрамон Мирзаев'
  },
  {
    title: 'Китай',
    address:
      'Hechang Science and Technology Industrial Park, No. 6 Qiaozi Road, Changping Town',
    city: 'Dongguan',
    state: 'Guangdong',
    postalCode: '62702',
    country: 'Китай',
    phone: '+86 16630103965',
    contactPerson: 'Zhang Wen'
  }
];
