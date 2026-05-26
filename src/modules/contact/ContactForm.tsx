import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  User, Mail, MessageSquare, Send, CheckCircle, AlertCircle,
  type LucideIcon,
} from 'lucide-react'
import type { ContactFormData } from './contact.types'
import { cn } from '@/utils/cn'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

type FormValues = ContactFormData

const validators = {
  name:    (v: string) => v.trim().length >= 2  || 'Nombre muy corto',
  email:   (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Email inválido',
  subject: (v: string) => v.trim().length >= 5  || 'Asunto muy corto',
  message: (v: string) => v.trim().length >= 20 || 'Mensaje muy corto (mín. 20 caracteres)',
}

// ── Floating field ──────────────────────────────────────────────────────────
interface FloatingFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: LucideIcon
  error?: string
  fieldId: string
  watchValue?: string
  disabled?: boolean
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, icon: Icon, error, fieldId, watchValue, onFocus, onBlur, disabled, ...rest }, ref) => {
    const [focused, setFocused] = useState(false)
    const floated = focused || !!watchValue

    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <div
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200',
              focused ? 'text-primary' : 'text-[var(--color-text-muted)]'
            )}
          >
            <Icon size={16} />
          </div>
          <label
            htmlFor={fieldId}
            className={cn(
              'absolute left-12 z-10 pointer-events-none transition-all duration-200',
              floated
                ? 'top-2 text-xs text-primary'
                : 'top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-secondary)]'
            )}
          >
            {label}
          </label>
          <input
            ref={ref}
            id={fieldId}
            disabled={disabled}
            onFocus={(e) => { setFocused(true); (onFocus as any)?.(e) }}
            onBlur={(e)  => { setFocused(false); (onBlur  as any)?.(e) }}
            className={cn(
              'w-full pl-12 pt-6 pb-2 pr-4 rounded-xl text-sm outline-none transition-all duration-200',
              'text-[var(--color-text-primary)] bg-[var(--color-surface)]',
              'border',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-red-500 focus:border-red-500'
                : focused
                ? 'border-primary shadow-[0_0_0_3px_rgba(99,102,241,0.1)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            )}
            {...rest}
          />
        </div>
        {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

// ── Floating textarea ───────────────────────────────────────────────────────
interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  icon: LucideIcon
  error?: string
  fieldId: string
  watchValue?: string
  disabled?: boolean
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, icon: Icon, error, fieldId, watchValue, onFocus, onBlur, disabled, ...rest }, ref) => {
    const [focused, setFocused] = useState(false)
    const floated = focused || !!watchValue

    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <div
            className={cn(
              'absolute left-4 top-4 z-10 transition-colors duration-200',
              focused ? 'text-primary' : 'text-[var(--color-text-muted)]'
            )}
          >
            <Icon size={16} />
          </div>
          <label
            htmlFor={fieldId}
            className={cn(
              'absolute left-12 z-10 pointer-events-none transition-all duration-200',
              floated ? 'top-2 text-xs text-primary' : 'top-4 text-sm text-[var(--color-text-secondary)]'
            )}
          >
            {label}
          </label>
          <textarea
            ref={ref}
            id={fieldId}
            disabled={disabled}
            onFocus={(e) => { setFocused(true); (onFocus as any)?.(e) }}
            onBlur={(e)  => { setFocused(false); (onBlur  as any)?.(e) }}
            className={cn(
              'w-full pl-12 pt-7 pb-3 pr-4 rounded-xl text-sm outline-none transition-all duration-200 resize-none',
              'text-[var(--color-text-primary)] bg-[var(--color-surface)]',
              'border min-h-[120px]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-red-500'
                : focused
                ? 'border-primary shadow-[0_0_0_3px_rgba(99,102,241,0.1)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            )}
            {...rest}
          />
        </div>
        {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
      </div>
    )
  }
)
FloatingTextarea.displayName = 'FloatingTextarea'

// ── Spinner ─────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}

// ── Main form ────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError,   setIsError]   = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' })

  const w = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  data.name,
          from_email: data.email,
          subject:    data.subject,
          message:    data.message,
          to_email:   'geancarlosbarrionuevo@gmail.com',
        },
        PUBLIC_KEY,
      )
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 4000)
    } catch {
      setIsError(true)
      setTimeout(() => setIsError(false), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const fieldDisabled = isLoading

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FloatingInput
        fieldId="name"
        label="Nombre completo"
        icon={User}
        error={errors.name?.message}
        watchValue={w.name}
        disabled={fieldDisabled}
        {...register('name', { validate: validators.name, required: 'Campo requerido' })}
      />

      <FloatingInput
        fieldId="email"
        label="Correo electrónico"
        icon={Mail}
        type="email"
        error={errors.email?.message}
        watchValue={w.email}
        disabled={fieldDisabled}
        {...register('email', { validate: validators.email, required: 'Campo requerido' })}
      />

      <FloatingInput
        fieldId="subject"
        label="Asunto"
        icon={MessageSquare}
        error={errors.subject?.message}
        watchValue={w.subject}
        disabled={fieldDisabled}
        {...register('subject', { validate: validators.subject, required: 'Campo requerido' })}
      />

      <FloatingTextarea
        fieldId="message"
        label="Tu mensaje"
        icon={MessageSquare}
        error={errors.message?.message}
        watchValue={w.message}
        rows={5}
        disabled={fieldDisabled}
        {...register('message', { validate: validators.message, required: 'Campo requerido' })}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full mt-2 flex items-center justify-center gap-2.5',
          'px-6 py-3.5 rounded-xl text-sm font-semibold',
          'border transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-70',
          isSuccess
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : isError
            ? 'bg-red-500/10 border-red-500/30 text-red-400'
            : 'bg-primary border-primary text-white hover:bg-primary/90 hover:shadow-glow'
        )}
      >
        {isLoading ? (
          <><Spinner /> Enviando...</>
        ) : isSuccess ? (
          <><CheckCircle size={18} /> ¡Mensaje enviado!</>
        ) : isError ? (
          <><AlertCircle size={18} /> Error al enviar. Intenta de nuevo.</>
        ) : (
          <><Send size={18} /> Enviar mensaje</>
        )}
      </button>

      {/* Feedback messages */}
      <AnimatePresence>
        {isSuccess && (
          <motion.p
            key="success-msg"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-emerald-400 text-center"
          >
            Te responderé en menos de 24 horas.
          </motion.p>
        )}
        {isError && (
          <motion.p
            key="error-msg"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-red-400 text-center"
          >
            Puedes escribirme directamente a{' '}
            <a
              href="mailto:geancarlosbarrionuevo@gmail.com"
              className="underline hover:text-red-300 transition-colors"
            >
              geancarlosbarrionuevo@gmail.com
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
