import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import QuienesSomos from '../components/QuienesSomos/QuienesSomos'
import CtaBanda from '../components/CtaBanda/CtaBanda'
import Valores from '../components/Valores/Valores'
import Galeria from '../components/Galeria/Galeria'
import Contacto from '../components/Contacto/Contacto'
import FAQ from '../components/FAQ/FAQ'
import Footer from '../components/Footer/Footer'
import CookieBanner from '../components/CookieBanner/CookieBanner'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuienesSomos />
      <CtaBanda text="¿Tienes un terreno o estás pensando en construir?" cta="Cuéntanos tu proyecto" />
      <hr />
      <Valores />
      <hr />
      <Galeria />
      <CtaBanda text="Cada proyecto es único. El tuyo también lo será." cta="Solicita una llamada gratuita" dark />
      <hr />
      <Contacto />
      <FAQ />
      <Footer />
      <CookieBanner />
    </>
  )
}
