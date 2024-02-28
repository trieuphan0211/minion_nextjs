import Header from "../../components/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
