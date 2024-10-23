'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useLocale, useTranslations } from 'next-intl';

const formSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9](?:\d\s?){0,14}$/, {
    message: 'Введите действительный номер телефона'
  }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть длиной не менее 6 символов' }),
  confirmPassword: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { data: session, status } = useSession();

  const t = useTranslations('Login');
  const r = useTranslations('Register');

  const [isFormLoading, setIsFormLoading] = useState(false);

  const formLogin = useForm<UserFormValue>({
    resolver: zodResolver(
      formSchema.pick({ phoneNumber: true, password: true })
    )
  });

  const formRegister = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (status === 'authenticated') {
      const userRole = session?.user?.role;
      if (userRole === 'Administrator') {
        router.push('/admin');
      } else if (userRole === 'Customer') {
        router.push('/customer');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);
  //
  // const onSubmitLogin = async (data: UserFormValue) => {
  //   startTransition(() => {
  //     signIn('credentials', {
  //       phoneNumber: data.phoneNumber.replace(/\s/g, ''),
  //       password: data.password,
  //       redirect: false,
  //       typeL: 'signIn'
  //     });
  //     toast.success('Signed In Successfully!');
  //   });
  // };

  // const useLoadingToast = (isFormLoading: boolean) => {
  //   useEffect(() => {
  //     let toastId: string | number | null = null;
  //
  //     if (isFormLoading) {
  //       toastId = toast.loading('Loading...');
  //     } else if (toastId) {
  //       toast.dismiss(toastId);
  //     }
  //     return () => {
  //       if (toastId) {
  //         toast.dismiss(toastId);
  //       }
  //     };
  //   }, [isFormLoading]);
  // };

  const onSubmitLogin = async (data: UserFormValue) => {
    // setIsFormLoading(true);
    const toastId = toast.loading(t('loading'));
    try {
      const result = await signIn('credentials', {
        phoneNumber: data.phoneNumber.replace(/\s/g, ''),
        password: data.password,
        redirect: false,
        typeL: 'signIn'
      });

      if (result?.error) {
        toast.dismiss(toastId);
        toast.error(t('error'));
      } else {
        toast.dismiss(toastId);
        toast.success(t('success'));
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(t('error'));
    } finally {
      // setIsFormLoading(false);
    }
  };

  const onSubmitRegister = async (data: UserFormValue) => {
    setIsFormLoading(true);
    try {
      const result = await signIn('credentials', {
        phoneNumber: data.phoneNumber.replace(/\s/g, ''),
        password: data.password,
        redirect: false,
        typeL: 'signUp'
      });

      if (result?.error) {
        toast.error(r('error'));
      } else {
        toast.success(r('success'));
      }
    } catch (error) {
      toast.error(r('error'));
    } finally {
      setIsFormLoading(false);
    }
  };

  // const onSubmitRegister = async (data: UserFormValue) => {
  //   try {
  //     const result = await signIn('credentials', {
  //       phoneNumber: data.phoneNumber.replace(/\s/g, ''),
  //       password: data.password,
  //       redirect: true,
  //       typeL: 'signUp'
  //     });
  //     // console.error('No response from server.', result);
  //     if (result === null) {
  //       toast('No response from server.');
  //       // console.error('No response from server.');
  //       return;
  //     }
  //
  //     if (result?.error) {
  //       // console.error('Error during registration:', result.error);
  //       toast('Unexpected error during registration.');
  //     } else {
  //       toast('Event has been created.');
  //     }
  //   } catch (error) {
  //     // console.error('Unexpected error during registration:', error);
  //     toast('Unexpected error during registration.');
  //   }
  // };

  return (
    <>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t('title')}</TabsTrigger>
          <TabsTrigger value="register">{r('title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Form {...formLogin}>
            <form
              onSubmit={formLogin.handleSubmit(onSubmitLogin)}
              className="w-full space-y-2"
            >
              <Card>
                <CardContent className="mt-5 space-y-2">
                  <FormField
                    control={formLogin.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phoneNumberLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('phoneNumberInput')}
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formLogin.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('passwordLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={t('passwordInput')}
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button disabled={loading} type="submit" className="w-full">
                    {t('submit')}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="register">
          <Form {...formRegister}>
            <form
              onSubmit={formRegister.handleSubmit(onSubmitRegister)}
              className="w-full space-y-2"
            >
              <Card>
                <CardContent className="mt-5 space-y-2">
                  {/*<FormField*/}
                  {/*  control={formRegister.control}*/}
                  {/*  name="email"*/}
                  {/*  render={({ field }) => (*/}
                  {/*    <FormItem>*/}
                  {/*      <FormLabel>Введите электронный адрес</FormLabel>*/}
                  {/*      <FormControl>*/}
                  {/*        <Input type="email" placeholder="Электронный адрес" disabled={loading} {...field} />*/}
                  {/*      </FormControl>*/}
                  {/*      <FormMessage />*/}
                  {/*    </FormItem>*/}
                  {/*  )}*/}
                  {/*/>*/}
                  <FormField
                    control={formRegister.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{r('phoneNumberLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={r('phoneNumberInput')}
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{r('passwordLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={r('passwordInput')}
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{r('confirmPasswordLabel')}</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={r('confirmPasswordInput')}
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button disabled={loading} type="submit" className="w-full">
                    {r('submit')}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </>
  );
}
