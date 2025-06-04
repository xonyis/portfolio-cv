import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function SnakeGamePage() {
    const [time, setTime] = useState(new Date())

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    }
    return (
        <div className=" flex flex-col bg-white">
                    <span className="text-lg font-medium text-black font-pixelify text-center mb-3">
                        {formatTime(time)}
                    </span>
                    <div className=" flex justify-center bg-white ">
                        <div>
                            <Image
                                src="/memojii-sticker.png"
                                alt=""
                                width={100} // ajuste à la taille que tu veux
                                height={100}
                                className="rounded-full object-contain ml-4"
                            />
                            <p className="text-black underline text-center text-sm/3">Xonyis Os<br/>
                                <span className="text-neutral-400 text-xs underline text-center">V1.0.0</span><br/>
                            </p>

                        </div>
                    </div>
                    {/* Informations de profil */}
                    <div className="flex-1 mx-auto px-4 space-y-4 bg-white">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs">@</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">Email</p>
                                <p className="text-sm text-black">juliamayerpro@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                                <span className="text-white text-xs">G</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">GitHub</p>
                                <p className="text-sm text-black">github.com/xonyis</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs">in</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">LinkedIn</p>
                                <p className="text-sm text-black">linkedin.com/in/julian-mayer</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 mx-auto px-4 space-y-4 mt-3">
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Technologies utilisées pour XonyisOs:</p>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-mono">Next.js</span>
                            <span className="bg-sky-200 text-sky-800 px-2 py-1 rounded text-xs font-mono">TailwindCSS</span>
                          </div>
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">Socket.io</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">shadcn/ui</span>
                          </div>
                        </div>
                    </div>

                        
                    </div>

                    {/* Bouton de déconnexion */}
                    <div className="p-2 flex text-center mt-3 w-48 mx-auto ">
                        <Link href="/"
                            
                            className="mx-auto text-red-500 hover:text-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            <Image
                                src="/Power_Red.png"
                                alt=""
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="mx-auto text-red-500 hover:text-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            <Image
                                src="/Wrench_Orange.png"
                                alt=""
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </button>
                    </div>
                </div>
    )
}