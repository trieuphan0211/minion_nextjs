import CurriculumVitae from "../components/common/cv";
import Header from "../components/ui/header";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Header />
      <CurriculumVitae />
    </main>
  );
}
