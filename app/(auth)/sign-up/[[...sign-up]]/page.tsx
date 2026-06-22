'use client'

import { SignUp } from '@clerk/nextjs'
import '@/public/styles/Login/sign-in.css' // Reuse the sign-in styles or similar

const SignUpPage = () => {
    return (
        <div className="sign-in-root">
            {/* Panel izquierdo — branding */}
            <div className="sign-in-branding">
                <div className="sign-in-branding-inner">
                    {/* Logo + nombre */}
                    <div className="sign-in-logo">
                        <div className="sign-in-logo-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.2" />
                                <path d="M10 9L20 14L10 19V9Z" fill="white" />
                            </svg>
                        </div>
                        <span className="sign-in-logo-text">StreamWork</span>
                    </div>

                    {/* Tagline */}
                    <div className="sign-in-tagline">
                        <h1 className="sign-in-title">Regístrate en<br />StreamWork</h1>
                        <p className="sign-in-subtitle">
                            Crea tu cuenta para empezar a transmitir, grabar y colaborar en tiempo real.
                        </p>
                    </div>

                    {/* Features */}
                    <ul className="sign-in-features">
                        <li className="sign-in-feature-item">
                            <span className="sign-in-feature-icon">✦</span>
                            Reuniones en alta definición
                        </li>
                        <li className="sign-in-feature-item">
                            <span className="sign-in-feature-icon">✦</span>
                            Grabación automática de sesiones
                        </li>
                        <li className="sign-in-feature-item">
                            <span className="sign-in-feature-icon">✦</span>
                            Sala personal siempre disponible
                        </li>
                    </ul>

                    {/* Decorative blob */}
                    <div className="sign-in-blob sign-in-blob-1" />
                    <div className="sign-in-blob sign-in-blob-2" />
                </div>
            </div>

            {/* Panel derecho — formulario */}
            <div className="sign-in-form-panel">
                <div className="sign-in-form-wrapper">
                    <div className="sign-in-form-header">
                        <h2 className="sign-in-form-title">Crear una cuenta</h2>
                        <p className="sign-in-form-description">Completa los datos para registrarte</p>
                    </div>

                    <SignUp
                        appearance={{
                            variables: {
                                colorPrimary: '#EA580C',
                                colorBackground: '#ffffff',
                                colorNeutral: '#374151',
                                borderRadius: '10px',
                                fontFamily: 'var(--font-roboto), sans-serif',
                                fontSize: '15px',
                            } as any,
                            elements: {
                                rootBox: {
                                    width: '100%',
                                },
                                card: {
                                    boxShadow: 'none',
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    margin: '0',
                                },
                                headerTitle: { display: 'none' },
                                headerSubtitle: { display: 'none' },
                                header: { display: 'none' },
                                footer: { display: 'none' },
                                socialButtonsBlockButton: {
                                    border: '1.5px solid #e5e7eb',
                                    borderRadius: '10px',
                                    color: '#374151',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease',
                                },
                                dividerLine: { background: '#e5e7eb' },
                                dividerText: { color: '#9ca3af', fontSize: '13px' },
                                formFieldLabel: {
                                    color: '#374151',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    marginBottom: '6px',
                                },
                                formFieldInput: {
                                    border: '1.5px solid #e5e7eb',
                                    borderRadius: '10px',
                                    padding: '12px 14px',
                                    fontSize: '15px',
                                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                    background: '#f9fafb',
                                },
                                formButtonPrimary: {
                                    background: 'linear-gradient(135deg, #f37e2a 0%, #EA580C 100%)',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    padding: '13px',
                                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
                                    transition: 'all 0.2s ease',
                                    border: 'none',
                                },
                                identityPreviewText: { color: '#374151' },
                                identityPreviewEditButton: { color: '#EA580C' },
                                formFieldSuccessText: { color: '#16a34a' },
                                formFieldErrorText: { color: '#dc2626' },
                                alertText: { color: '#dc2626' },
                                otpCodeFieldInput: {
                                    border: '1.5px solid #e5e7eb',
                                    borderRadius: '8px',
                                },
                                formFieldAction: { color: '#EA580C' },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
