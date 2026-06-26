'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { useUser, useClerk } from '@clerk/nextjs';

const Sidebar = () => {
    const pathname = usePathname();
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const [mobileOpen, setMobileOpen] = useState(false);

    const getInitials = (firstName?: string | null, lastName?: string | null) => {
        if (!isLoaded) return '...';
        if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
        if (firstName) return firstName.substring(0, 2).toUpperCase();
        if (lastName) return lastName.substring(0, 2).toUpperCase();
        return 'U';
    };

    const initials = getInitials(user?.firstName, user?.lastName);
    const fullName = !isLoaded ? 'Cargando...' : (!isSignedIn ? 'No identificado' : (user?.fullName || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '') || 'Usuario'));
    const username = !isLoaded ? 'Por favor espera' : (!isSignedIn ? 'Invitado' : (user?.username || user?.primaryEmailAddress?.emailAddress || 'usuario'));

    const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
        <>
            {/* Logo */}
            <div className='flex items-center px-1 pb-1'>
                <Image
                    src="/icons/Connect.png"
                    alt="StreamWork"
                    width={350}
                    height={16}
                    className="max-h-12 w-auto object-contain"
                    priority
                />
            </div>

            {/* Header User Profile Widget */}
            <div className='bg-slate-50/60 hover:bg-slate-50/90 border border-slate-100 hover:border-slate-200/50 p-3 rounded-xl flex items-center justify-between gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group/profile'>
                <div className='flex items-center gap-3 overflow-hidden'>
                    <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-orange-100 items-center justify-center border border-orange-200/60 shadow-inner group-hover/profile:scale-105 transition-transform duration-300'>
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt={fullName} className='h-full w-full object-cover' />
                        ) : (
                            <span className='text-sm font-semibold text-orange-700 select-none'>{initials}</span>
                        )}
                    </div>
                    <div className='flex flex-col min-w-0'>
                        <p className='text-xs font-semibold text-slate-900 truncate leading-tight'>{fullName}</p>
                        <p className='text-[10px] font-medium text-slate-500 truncate mt-0.5 leading-none'>{username}</p>
                    </div>
                </div>
                <div className='flex items-center gap-0.5'>
                    <button onClick={() => window.location.href = '/settings'} title="Configuración" className='h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-xs transition-all duration-150 shrink-0 border border-transparent hover:border-slate-200/30 active:scale-90'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                    <button onClick={() => signOut({ redirectUrl: '/sign-in' })} title="Cerrar sesión" className='h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 hover:shadow-xs transition-all duration-150 shrink-0 border border-transparent hover:border-red-200/30 active:scale-90'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Block */}
            <div className='flex flex-col gap-1.5'>
                <p className='text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-3.5 px-4'>Navegación</p>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || (link.route !== '/' && pathname.startsWith(link.route));
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            onClick={onLinkClick}
                            className={cn(
                                "group relative flex items-center gap-4 rounded-lg pl-5 pr-4 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-1",
                                isActive
                                    ? "bg-orange-50 text-orange-600 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-md bg-orange-600" />
                            )}
                            <div
                                className={cn(
                                    "w-5 h-5 transition-all duration-200",
                                    isActive ? "bg-orange-600" : "bg-slate-400 group-hover:bg-slate-700"
                                )}
                                style={{
                                    maskImage: `url(${link.imgUrl})`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskImage: `url(${link.imgUrl})`,
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat'
                                }}
                            />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </>
    );

    return (
        <>
            {/* ── SIDEBAR ESCRITORIO (sm+) ── */}
            <section className='hidden sm:flex sticky left-0 top-0 h-screen w-fit flex-col justify-start gap-6 border-r border-slate-200/60 bg-white/85 backdrop-blur-md px-5 pb-5 pt-2.5 text-slate-800 shadow-[1px_0_10px_rgba(0,0,0,0.015)] lg:w-64'>
                <SidebarContent />
            </section>

            {/* ── MÓVIL (solo < sm) ── */}
            <button
                className='sm:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md active:scale-95 transition-all duration-150'
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
            >
                <Image src={'/icons/menu.png'} alt="menu" width={24} height={24} />
            </button>

            {/* ── MÓVIL: overlay backdrop ── */}
            {mobileOpen && (
                <div
                    className='sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300'
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── MÓVIL: drawer lateral ── */}
            <aside
                className={cn(
                    'sm:hidden fixed top-0 left-0 z-50 h-screen w-72 flex flex-col gap-6 bg-white/95 backdrop-blur-md border-r border-slate-200/60 px-5 pb-5 pt-4 shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Botón cerrar */}
                <button
                    className='absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150'
                    onClick={() => setMobileOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <SidebarContent onLinkClick={() => setMobileOpen(false)} />
            </aside>
        </>
    );
}

export default Sidebar