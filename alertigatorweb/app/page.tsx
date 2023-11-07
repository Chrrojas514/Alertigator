import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
    <NavBar />
    <main 
      className="flex min-h-screen flex-col items-center justify-between
                 p-24 text-4xl text-center text-">
      Alertigator utility bot for your discord server! Add today!
    </main>
    </>
  )
}
