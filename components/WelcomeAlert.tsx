'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function WelcomeAlert() {
    const { isLoaded, isSignedIn, user } = useUser();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')) {
            return;
        }

        if (isLoaded && isSignedIn && user) {
            const greetedKey = `sw_welcomed_${user.id}`;
            const alreadyGreeted = sessionStorage.getItem(greetedKey);

            if (!alreadyGreeted) {
                // Set the session flag immediately to avoid double firing during render cycles
                sessionStorage.setItem(greetedKey, 'true');

                const isDark = document.documentElement.classList.contains('dark');
                
                Swal.fire({
                    title: `¡Bienvenido, ${user.firstName || user.username || 'Usuario'}!`,
                    text: 'Has iniciado sesión correctamente en StreamWork.',
                    icon: 'success',
                    confirmButtonText: '¡Comenzar!',
                    confirmButtonColor: '#f97316', // Naranja
                    background: isDark ? '#1e293b' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    iconColor: '#f97316',
                    timer: 4000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'rounded-2xl border border-slate-200/10 shadow-2xl',
                        title: 'font-semibold text-xl',
                        confirmButton: 'px-6 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95'
                    },
                    buttonsStyling: true
                });
            }
        }
    }, [isLoaded, isSignedIn, user, pathname]);

    return null;
}
