import { ToggleThemeButton } from '@/_presentation/_components/ui/toggleThemeButton';

export default function Header() {
    return (
        <nav className=" absolute right-10 top-10">
            <ToggleThemeButton />
        </nav>
    );
}
