"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Code, Database, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SkillBar } from "@/components/skill-bar"
import { ProjectCard } from "@/components/project-card"
import { FloatingNav } from "@/components/floating-nav"
import { GlowingBlob } from "@/components/glowing-blob"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -10])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const scrollY = window.scrollY

        const sectionId = section.getAttribute("id") || ""

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#about" },
    { name: "Études", href: "#School" },
    { name: "Expérience", href: "#experience" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const handleDownloadCV = () => {
    // Créer un lien de téléchargement
    const link = document.createElement("a")
    link.href = "/CV Mayer Julian - Alternance.pdf"
    link.download = "CV Mayer Julian - Alternance.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
      <div ref={containerRef} className="min-h-screen bg-zinc-900 text-white overflow-hidden">
        {/* Floating Navigation */}
        <FloatingNav navItems={navItems} activeSection={activeSection} />

        {/* Decorative Elements */}
        <GlowingBlob className="fixed top-[20%] left-[10%] opacity-20 blur-3xl" color="purple" size="lg" followMouse={true} />
        <GlowingBlob className="fixed top-[60%] right-[15%] opacity-20 blur-3xl" color="blue" size="xl" followMouse={true} />

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">

            <GlowingBlob className="fixed top-[-45%] right-[-5%] opacity-40 blur-3xl" color="darkPurple" size="xxl" followMouse={false} />

          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="container relative z-10 text-center px-4"
          >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-8 w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
            >
              <Image src="/profile-photo-1.png" alt="Photo de profil" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 mix-blend-overlay" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-4 relative"
            >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-500">
              Julian Mayer
            </span>
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                <span className="font-mono">Développeur Web Full Stack</span>
              </p>

              <div className="flex gap-4 justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-purple-500/50 bg-black/50 backdrop-blur-sm hover:bg-purple-950/30 transition-all duration-300"
                    asChild
                >
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </Button>
                <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    asChild
                >
                  <Link href="#projects">Voir mes projets</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5, duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                À propos de moi
              </h2>

              <Card className="flex p-6 md:p-8 bg-gray-900/50 border-gray-800 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-blue-900/10" />
                <div className="relative z-10">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Développeur web passionné avec depuis plus de 7 ans dans le développent d'applications web. Spécialisé en Vue.Js, Next.js et Node.js, je m'efforce de créer des expériences utilisateur exceptionnelles et les plus interactives que possibles.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Toujours à l'affût des nouvelles technologies et méthodologies pour améliorer mes compétences et la
                    qualité de mon travail. Je suis particulièrement intéressé par les interfaces innovantes,
                    l'accessibilité et les performances web.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-950/30 text-green-300 border-green-800/50">
                      Vue.js
                    </Badge>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-800/50">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-950/30 text-emerald-300 border-emerald-800/50">
                      SpringBoot
                    </Badge>
                    <Badge variant="outline" className="bg-purple-950/30 text-purple-300 border-purple-800/50">
                      React
                    </Badge>
                    <Badge variant="outline" className="bg-indigo-950/30 text-indigo-300 border-indigo-800/50">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-950/30 text-yellow-300 border-yellow-500/50">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="bg-teal-950/30 text-teal-300 border-teal-800/50">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-800/50">
                      PHP
                    </Badge>
                    <Badge variant="outline" className="bg-purple-950/30 text-purple-300 border-purple-800/50">
                      Symfony
                    </Badge>
                    <Badge variant="outline" className="bg-orange-950/30 text-orange-300 border-orange-800/50">
                      Java
                    </Badge>
                    <Badge variant="outline" className="bg-fuchsia-950/30 text-fuchsia-300 border-fuchsia-800/50">
                      UI/UX
                    </Badge>
                    <Badge variant="outline" className="bg-violet-950/30 text-violet-300 border-violet-800/50">
                      BootStrap
                    </Badge>
                    <Badge variant="outline" className="bg-cyan-950/30 text-cyan-300 border-cyan-800/50">
                      Tailwind
                    </Badge>
                  </div>
                  
                </div>
                <Image src="/memojii-sticker.png" alt="" width={250} // ajuste à la taille que tu veux
                height={250}
                className="rounded-full object-contain" />
                </Card>
            </motion.div>
          </div>
        </section>

        {/* School Section */}
        <section id="School" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Études
            </motion.h2>

            <div className="max-w-6xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-blue-500 transform md:translate-x-[-0.5px]" />

              {/* Experience Items */}
              <div className="space-y-12 ">
                <TimelineItem
                    title="Expert en Développement Informatique"
                    company="MEWO"
                    period="Septembre 2024 - Présent"
                    description="Deux années pour acquérir une vision technique et projet à 360° en explorant tous les aspects du développement, de ses performances techniques et du management de la fonction : langages web, développement mobile, programmation orientée objet, webdesign, UX / UI, sémantique…"
                    align="right"
                    delay={0.1}
                />

                <TimelineItem
                    title="Développeur Full Stack"
                    company="Metz Numeric School"
                    period="Septembre 2021 - Juin 2024
"
                    description="Ce parcours en trois ans, offre une immersion progressive dans l’univers numérique, avec une première année axée sur les fondamentaux de la programmation et de la culture informatique, une deuxième année dédiée aux technologies avancées et aux méthodes de développement, et une troisième année en alternance (ou stage alterné) pour renforcer l’expérience professionnelle."
                    align="left"
                    delay={0.2}
                />

                <TimelineItem
                    title="Baccalauréat Technologique STI2D"
                    company="Lycée de la Communication"
                    period="Juin 2021"
                    description="Diplôme obtenu Mention Assez Bien - Option SIN"
                    align="right"
                    delay={0.3}
                />


              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}

        <section id="experience" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Parcours professionnel
            </motion.h2>

            <div className="max-w-6xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-blue-500 transform md:translate-x-[-0.5px]" />

              {/* Experience Items */}
              <div className="space-y-12 ">
                <TimelineItem
                    title="Alternant Développeur Analyste"
                    company="Cora Informatique"
                    period="Novembre 2023 - Novembre 2024"
                    description="J’ai participé à la refonte complète d’une application interne destinée au suivi des performances des fournisseurs. Ce projet avait pour objectif de moderniser l’interface et d’optimiser le traitement des flux de données. L’application permettait de récupérer et d'analyser des flux fournisseurs, puis de générer automatiquement des KPI (indicateurs de performance) sous format texte et Excel, avant de les transmettre via la plateforme Odrive."
                    align="right"
                    delay={0.1}
                    badges={["SpringBoot","Java", "Vue.js", "JavaScript", "BootStrap"]}
                    badgeColors={[
                      "bg-emerald-950/30 text-emerald-300 border-emerald-800/50",
                      "bg-orange-950/30 text-orange-300 border-orange-800/50",
                      "bg-green-950/30 text-green-300 border-green-800/50",
                      "bg-yellow-950/30 text-yellow-300 border-yellow-500/50",
                      "bg-violet-950/30 text-violet-300 border-violet-800/50"
                    ]}
                />

                <TimelineItem
                    title="Developpeur Web"
                    company="Witch Ink Tattoo"
                    period="Mai 2023 - Juillet 2023"
                    description="J’ai développé le site web de Witch Ink Tattoo, un salon de tatouage souhaitant valoriser son activité et ses artistes grâce à une présence en ligne soignée et moderne. Une fonctionnalité clé du projet est l’intégration de l’API Instagram, permettant de récupérer automatiquement les dernières photos publiées sur le compte du salon afin de maintenir le site à jour sans effort."
                    align="left"
                    delay={0.2}
                    badges={["Vue.js", "GSAP", "Node.js", "UI/UX", "Tailwind"]}
                    badgeColors={[
                      "bg-green-950/30 text-green-300 border-green-800/50",
                      "bg-rose-950/30 text-rose-300 border-rose-500/50",
                      "bg-teal-950/30 text-teal-300 border-teal-800/50",
                      "bg-fuchsia-950/30 text-fuchsia-300 border-fuchsia-800/50",
                      "bg-cyan-950/30 text-cyan-300 border-cyan-800/50"
                    ]}
                />

                <TimelineItem
                    title="Developpeur Web"
                    company="Ceguipro"
                    period="Mai 2022 - Juillet 2022"
                    description="J'ai développé un site vitrine pour un artisan plombier, conçu avec les technologies HTML, CSS et JavaScript, en m’appuyant sur le framework Bootstrap pour assurer une mise en page responsive et rapide à déployer. Ce site présente les différents services proposés (dépannages, installations, entretiens), ainsi que les informations de contact et un formulaire de demande d’intervention."
                    align="right"
                    delay={0.3}
                    badges={["Vue.js", "JavaScript", "Node.js", "UI/UX", "BootStrap"]}
                    badgeColors={[
                      "bg-green-950/30 text-green-300 border-green-800/50",
                      "bg-yellow-950/30 text-yellow-300 border-yellow-500/50",
                      "bg-teal-950/30 text-teal-300 border-teal-800/50",
                      "bg-fuchsia-950/30 text-fuchsia-300 border-fuchsia-800/50",
                      "bg-violet-950/30 text-violet-300 border-violet-800/50"
                    ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Compétences
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-purple-400" />
                    Développement Front-end
                  </h3>
                  <div className="space-y-6">
                    <SkillBar name="Vue.js" value={90} color="green" />
                    <SkillBar name="React / Next.js" value={75} color="purple" />
                    <SkillBar name="JavaScript / TypeScript" value={85} color="yellow" />
                    <SkillBar name="HTML / CSS / Tailwind" value={95} color="orange" />
                    <SkillBar name="UI/UX Design" value={80} color="violet" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Database className="mr-2 h-5 w-5 text-blue-400" />
                    Développement Back-end
                  </h3>
                  <div className="space-y-6">
                    <SkillBar name="SpringBoot" value={85} color="darkGreen" />
                    <SkillBar name="Node.js / Express" value={85} color="blue" />
                    <SkillBar name="PHP / Symphony" value={75} color="darkPurple" />
                    <SkillBar name="SQL / NoSQL" value={65} color="cyan" />
                    <SkillBar name="API RESTful" value={95} color="teal" />
                    <SkillBar name="DevOps / CI/CD" value={50} color="red" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="md:col-span-2"
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-violet-400" />
                    Autres compétences
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge name="Git" icon="🔄" />
                    <SkillBadge name="Docker" icon="🐳" />
                    <SkillBadge name="CI/CD" icon="⚙️" />
                    <SkillBadge name="Stripe" icon="🛍️" />
                    <SkillBadge name="Agile/Scrum" icon="📊" />
                    <SkillBadge name="UI/UX" icon="🎨" />
                    <SkillBadge name="SEO" icon="🔍" />
                    <SkillBadge name="Testing" icon="🧪" />
                    <SkillBadge name="GSAP" icon="🦸‍♂️" />
                    <SkillBadge name="Responsive Design" icon="📱" />
                    <SkillBadge name="Figma" icon="🖌️" />
                    <SkillBadge name="Jira" icon="🗓️" />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Projets récents
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                  title="Classio"
                  description="Plateforme de vente en ligne avec panier d'achat, paiement sécurisé et gestion des commandes."
                  tags={["Next.Js", "Node.js", "Postgresql", "Prisma", "Tailwind"]}
                  image="/ClassioCapture.png"
                  delay={0.1}
              />

              <ProjectCard
                  title="Triman"
                  description="Un jeu de dés multijoueur en temps réel où plusieurs participants peuvent s'affronter simultanément, chacun lançant ses dés à tour de rôle"
                  tags={["Next.js", "TypeScript", "Socket.io", "Tailwind"]}
                  image="/TrimanCapture.png"
                  delay={0.2}
              />

              <ProjectCard
                  title="Application Interne Cora Informatique"
                  description="Refonte d’une application interne permettant l’analyse automatisée de flux fournisseurs et la génération de KPI diffusés via Odrive."
                  tags={["Vue.js", "SpringBoot"]}
                  image="/CoraInformatique.jpeg"
                  delay={0.3}
              />

              <ProjectCard
                  title="Plateforme Éducative MNS QUIZZ"
                  description="Projet de fin de troisième années du Bachelor Développeur Full Stack."
                  tags={["Vue.js", "SpringBoot", "Express", "SpringBoot", "JWT",]}
                  image="/project4.png"
                  delay={0.4}
              />

              <ProjectCard
                  title="Witch-Ink-Tatoo.fr"
                  description="Site vitrine pour un salon de tatouage avec des animations et une galerie d'images relié au compte Instagram du salon."
                  tags={["Vue.js", "Tailwind", "GSAP", "Node.Js"]}
                  image="/witchInk.jpeg"
                  delay={0.5}
              />

              <ProjectCard
                  title="CEGUIPRO.fr"
                  description="Site vitrine pour un plombier avec un formulaire de prise de rendez-vous selon les disponibilités de l'artisan."
                  tags={["HTML", "Bootstrap", "JavaScript", "Node.js"]}
                  image="/project6.png"
                  delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Contact
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-lg mx-auto"
            >
              <Card className="p-8 bg-gray-900/50 border-gray-800 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-blue-900/10" />

                <div className="relative z-10 space-y-6">
                  <ContactItem
                      icon={<Mail className="h-5 w-5 text-purple-400" />}
                      label="Email"
                      value="julianmayerpro@gmail.com"
                  />

                  <ContactItem
                      icon={<Github className="h-5 w-5 text-purple-400" />}
                      label="GitHub"
                      value="github.com/xonyis"
                      link="https://github.com/xonyis"
                  />

                  <ContactItem
                      icon={<Linkedin className="h-5 w-5 text-purple-400" />}
                      label="LinkedIn"
                      value="linkedin.com/in/julian-mayer"
                      link="https://www.linkedin.com/in/julian-mayer-6519a0229/"
                  />

                  <div className="pt-6">
                    <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                        size="lg"
                        onClick={handleDownloadCV}
                    >
                      Télécharger mon CV
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-400 flex justify-center gap-6 items-center">
            <p>© {new Date().getFullYear()} Julian Mayer - Tous droits réservés</p>
            <Image src="/memojii-sticker.png" alt="" width={50} height={50} />
          </div>
        </footer>
      </div>
  )
}

// Timeline Item Component
function TimelineItem({
                        title,
                        company,
                        period,
                        description,
                        align = "left",
                        delay = 0,
                        badges,
                        badgeColors
                      }: {
  title: string
  company: string
  period: string
  description: string
  align?: "left" | "right"
  delay?: number
  badges?: string[]
  badgeColors?: string[]
}) {
  return (
      <motion.div
          initial={{ opacity: 0, x: align === "left" ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay }}
          className={cn("relative flex flex-col md:flex-row items-center", align === "right" ? "md:flex-row-reverse" : "")}
      >
        {/* Timeline dot */}
        <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transform md:translate-x-[-50%] z-10" />

        {/* Content */}
        <div className={cn("w-full md:w-[calc(40%-20px)]", align === "left" ? "md:pr-2" : "md:pl-2")}>
          <Card className="p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-blue-900/10" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-white">{title}</h3>
                  <p className="text-purple-300">{company}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/70 px-2 py-1 rounded">{period}</span>
              </div>
              <p className="text-gray-300 text-sm/6">{description}</p>
              {/* Badges */}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={badgeColors?.[index] || "bg-gray-800/50 text-gray-300 border-gray-700"}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            </div>
          </Card>
        </div>
      </motion.div>
  )
}

// Skill Badge Component
function SkillBadge({ name, icon }: { name: string; icon: string }) {
  return (
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-sm flex items-center gap-2"
      >
        <span>{icon}</span>
        <span>{name}</span>
      </motion.div>
  )
}

// Contact Item Component
function ContactItem({
                       icon,
                       label,
                       value,
                       link,
                     }: {
  icon: React.ReactNode
  label: string
  value: string
  link?: string
}) {
  return (
      <div className="flex items-start gap-4">
        <div className="bg-gray-800/70 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          {link ? (
              <Link
                  href={link}
                  target="_blank"
                  className="text-white hover:text-purple-300 transition-colors flex items-center gap-1 group"
              >
                {value}
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
          ) : (
              <p className="text-white">{value}</p>
          )}
        </div>
      </div>
  )
}
