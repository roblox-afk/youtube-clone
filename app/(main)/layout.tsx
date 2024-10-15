import NavBar from "@/components/navigation/NavBar";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen">
            <NavBar isLoggedIn={false} />
            <main>
                {children}
            </main>
        </div>
    );
}