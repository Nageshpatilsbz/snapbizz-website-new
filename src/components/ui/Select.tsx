import { Check, ChevronDown, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'

interface SelectProps {
  id: string
  name: string
  value: string
  options: readonly string[]
  placeholder: string
  icon: LucideIcon
  invalid?: boolean
  onChange: (value: string) => void
}

export function Select({ id, name, value, options, placeholder, icon: Icon, invalid, onChange }: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef({ text: '', time: 0 })
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState<CSSProperties>({})
  const listId = `${id}-options`

  const openMenu = (last = false) => {
    const trigger = triggerRef.current
    if (!trigger) return
    const bounds = trigger.getBoundingClientRect()
    const below = window.innerHeight - bounds.bottom - 12
    const above = bounds.top - 12
    const openAbove = below < 260 && above > below
    setPosition({
      position: 'fixed',
      left: bounds.left,
      width: bounds.width,
      maxHeight: Math.max(0, Math.min(288, openAbove ? above : below)),
      ...(openAbove ? { bottom: window.innerHeight - bounds.top + 8 } : { top: bounds.bottom + 8 }),
    })
    const selectedIndex = options.indexOf(value)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : last ? options.length - 1 : 0)
    searchRef.current = { text: '', time: 0 }
    setOpen(true)
  }

  const choose = (index: number) => {
    onChange(options[index])
    setOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node
        && !triggerRef.current?.contains(event.target)
        && !menuRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    const closeOnScroll = (event: Event) => {
      if (event.target instanceof Node && menuRef.current?.contains(event.target)) return
      setOpen(false)
    }
    const close = () => setOpen(false)
    document.addEventListener('pointerdown', closeOutside)
    window.addEventListener('scroll', closeOnScroll, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      window.removeEventListener('scroll', closeOnScroll, true)
      window.removeEventListener('resize', close)
    }
  }, [open])

  useEffect(() => {
    const menu = menuRef.current
    const option = menu?.children[activeIndex]
    if (!open || !menu || !option) return
    const menuBounds = menu.getBoundingClientRect()
    const optionBounds = option.getBoundingClientRect()
    if (optionBounds.top < menuBounds.top + menu.clientTop) {
      menu.scrollTop += optionBounds.top - menuBounds.top - menu.clientTop
    } else if (optionBounds.bottom > menuBounds.top + menu.clientTop + menu.clientHeight) {
      menu.scrollTop += optionBounds.bottom - menuBounds.top - menu.clientTop - menu.clientHeight
    }
  }, [activeIndex, open])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      setOpen(false)
      if (event.key === 'Escape' && open) event.preventDefault()
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) openMenu(event.key === 'ArrowUp')
      else setActiveIndex((index) => (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
      return
    }
    if (event.key === 'Home' || event.key === 'End') {
      if (open) {
        event.preventDefault()
        setActiveIndex(event.key === 'Home' ? 0 : options.length - 1)
      }
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(activeIndex)
      else openMenu()
      return
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault()
      const now = Date.now()
      const text = (now - searchRef.current.time < 700 ? searchRef.current.text : '') + event.key.toLowerCase()
      searchRef.current = { text, time: now }
      const start = open ? activeIndex + 1 : 0
      const match = options.findIndex((_, offset) => options[(start + offset) % options.length].toLowerCase().startsWith(text))
      if (match >= 0) {
        if (!open) openMenu()
        setActiveIndex((start + match) % options.length)
        searchRef.current = { text, time: now }
      }
    }
  }

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        aria-labelledby={`${id}-label`}
        aria-invalid={Boolean(invalid)}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onClick={() => open ? setOpen(false) : openMenu()}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (event.relatedTarget && !menuRef.current?.contains(event.relatedTarget)) setOpen(false)
        }}
        className={`flex min-h-11 w-full items-center gap-3 rounded-xl border bg-surface-soft px-3 py-2.5 text-left text-sm transition-colors focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/15 ${
          invalid ? 'border-brand-red' : open ? 'border-brand-blue bg-white ring-4 ring-brand-blue/10' : 'border-line hover:border-brand-blue/50'
        }`}
      >
        <Icon className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
        <span className={`min-w-0 flex-1 ${value ? 'text-ink' : 'text-ink-500'}`}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-ink-300 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open ? createPortal(
        <div
          ref={menuRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="z-[60] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-1.5 shadow-[0_16px_48px_-12px_rgba(26,32,48,0.3)]"
          style={position}
        >
          {options.map((option, index) => (
            <div
              key={option}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={value === option}
              onMouseDown={(event) => event.preventDefault()}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug ${
                activeIndex === index ? 'bg-brand-blue-light text-brand-blue-dark' : value === option ? 'bg-brand-blue/5 text-brand-blue-dark' : 'text-ink-700'
              }`}
            >
              <span className="min-w-0 flex-1">{option}</span>
              {value === option ? <Check className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>,
        document.body,
      ) : null}
    </>
  )
}
