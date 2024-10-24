'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import LocaleSwitcherSelect from '@/components/LocaleSwitcherSelect';
import { useTranslations } from 'next-intl';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function UserNav() {
  const { data: session } = useSession();

  const t = useTranslations('AvatarMenuTop');

  if (session) {
    return (
      <>
        <LocaleSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/*<AvatarImage*/}
                {/*  src={session.user?.fullName ?? ''}*/}
                {/*  alt={session.user?.fullName ?? ''}*/}
                {/*/>*/}
                <AvatarFallback>{session.user?.fullName?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user?.fullName}
                </p>
                <p
                  className="text-xs leading-none text-muted-foreground"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <strong
                    onClick={() => {
                      navigator.clipboard
                        .writeText(session.user?.userId || '')
                        .then(() => {});
                      toast.success(t('copied'));
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    ID: {session.user?.userId}
                  </strong>
                  <DropdownMenuShortcut>
                    <Copy
                      size={12}
                      onClick={() => {
                        navigator.clipboard
                          .writeText(session.user?.userId || '')
                          .then((r) => {});
                        toast.success('Copied to clipboard');
                      }}
                      style={{ cursor: 'pointer', marginLeft: '0.5rem' }}
                    />
                  </DropdownMenuShortcut>
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                {t('profile')}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('myPayments')}
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('settings')}
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              {/*<DropdownMenuItem>New Team</DropdownMenuItem>*/}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
              {t('logout')}
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
