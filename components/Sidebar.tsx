'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';

const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useUser();

    const getInitials = (firstName?: string | null, lastName?: string | null) => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase();
        }
        if (firstName) {
            return firstName.substring(0, 2).toUpperCase();
        }
        if (lastName) {
            return lastName.substring(0, 2).toUpperCase();
        }
        return 'U';
    };

    const initials = getInitials(user?.firstName, user?.lastName);
    const fullName = user?.fullName || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '') || 'Cargando...';
    const username = user?.username || user?.primaryEmailAddress?.emailAddress || 'usuario';

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-start gap-6 border-r border-slate-200/60 bg-white/85 backdrop-blur-md px-5 pb-5 pt-2.5 text-slate-800 shadow-[1px_0_10px_rgba(0,0,0,0.015)] max-sm:hidden lg:w-64'>
            {/* Header User Profile Widget */}
            <div className='bg-slate-50/60 hover:bg-slate-50/90 border border-slate-100 hover:border-slate-200/50 p-3 rounded-xl flex items-center justify-between gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group/profile'>
                <div className='flex items-center gap-3 overflow-hidden'>
                    {/* Avatar */}
                    <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-orange-100 items-center justify-center border border-orange-200/60 shadow-inner group-hover/profile:scale-105 transition-transform duration-300'>
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt={fullName} className='h-full w-full object-cover' />
                        ) : (
                            <span className='text-sm font-semibold text-orange-700 select-none'>{initials}</span>
                        )}
                    </div>
                    {/* Details */}
                    <div className='flex flex-col min-w-0'>
                        <p className='text-xs font-semibold text-slate-900 truncate leading-tight'>{fullName}</p>
                        <p className='text-[10px] font-medium text-slate-500 truncate mt-0.5 leading-none'>{username}</p>
                    </div>
                </div>
                {/* Settings action */}
                <button onClick={() => window.location.href = '/settings'} className='h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-xs transition-all duration-150 shrink-0 border border-transparent hover:border-slate-200/30 active:scale-90'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </button>
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
                                    isActive
                                        ? "bg-orange-600"
                                        : "bg-slate-400 group-hover:bg-slate-700"
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
        </section>
    )
}

export default Sidebar