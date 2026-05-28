"use client"
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react'

type Props = {}

const ThemeSwitcher = (props: Props) => {

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

  return (
    <div>
        <Switch
        checked={theme === "light"}
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
        aria-label="Toggle theme"
        />
    </div>
  )
}

export default ThemeSwitcher