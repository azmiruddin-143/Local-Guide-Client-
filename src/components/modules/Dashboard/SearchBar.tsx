'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Command, Search } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getNavItemsByRole} from '@/lib/navItems.config'
import * as Icons from 'lucide-react'
import { UserRole } from '@/lib/auth-utils'

interface NavItem {
  title: string
  href: string
  icon: string
  section?: string
}

export default function SearchBar({ userInfo }: { userInfo : any}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Get all nav items based on user role
  const navItems: NavItem[] = userInfo?.role 
    ? getNavItemsByRole(userInfo.role as UserRole).flatMap(section => 
        section.items.map(item => ({
          ...item,
          section: section.title
        }))
      )
    : []

  // Filter items based on search
  const filteredItems = navItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.section?.toLowerCase().includes(search.toLowerCase())
  )

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Scroll selected item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [selectedIndex])

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open/close with Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
        return
      }

      // Only handle navigation when modal is open
      if (!open) return

      // Arrow down
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : prev
        )
      }

      // Arrow up
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
      }

      // Enter to select
      if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault()
        handleSelect(filteredItems[selectedIndex].href)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, selectedIndex, filteredItems])

  const handleSelect = (href: string) => {
    setOpen(false)
    setSearch('')
    setSelectedIndex(0)
    router.push(href)
  }

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [open])

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
    return Icon ? <Icon className="h-4 w-4" /> : <Search className="h-4 w-4" />
  }

  return (
    <>
      {/* Trigger Button */}
      <div className="flex-1 max-w-md">
        <button
          onClick={() => setOpen(true)}
          className="relative group w-full"
        >
          <div className="flex items-center w-full h-10 px-3 bg-accent/50 border border-accent hover:border-accent-foreground/20 rounded-md transition-all duration-200">
            <Search className="h-4 w-4 text-muted-foreground" />

            {/* Text only shows on sm and above */}
            <span className="hidden sm:flex sm:text-sm text-muted-foreground ml-2">
              Search anything...
            </span>

            {/* Shortcut keys only on sm+ */}
            <kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>K</span>
            </kbd>
          </div>
        </button>
      </div>


      {/* Command Palette Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-2xl">
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search navigation..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
              autoFocus
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => (
                  <button
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-left group ${
                      selectedIndex === index 
                        ? 'bg-accent' 
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                      selectedIndex === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{item.title}</div>
                      {item.section && (
                        <div className="text-xs text-muted-foreground">{item.section}</div>
                      )}
                    </div>
                    <div className={`text-xs text-muted-foreground transition-opacity ${
                      selectedIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      ↵
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Esc</kbd>
              Close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
