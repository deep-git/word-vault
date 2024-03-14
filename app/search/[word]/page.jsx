"use client";

import { fetchWord } from '@app/action';
import MaxWidthWrapper from '@components/MaxWidthWrapper';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react';
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa";

const page = () => {
    const word = useParams();

    const [dictionaryContent, setDictionaryContent] = useState([]);
    const audioRef = useRef();

    useEffect(() => {
        fetchWord(word.word).then((res) => {
            setDictionaryContent(res);
        });
    }, [word.word]);

    function playAudio() {
        if (audioRef.current) {
            audioRef.current.play();
        } else {
            throw new Error("Audio file error");
        }
    }

  return (
    <MaxWidthWrapper className="px-10">
        <div className="mt-10 min-h-screen text-text_main">
            {dictionaryContent && dictionaryContent !== "" ? (
                <div>
                    <div className="flex justify-between items-center flex-wrap">
                        <div>
                            <h2 className="text-5xl mb-5 font-bold">{dictionaryContent.word}</h2>
                            <span className="text-2xl text-purple-500">{dictionaryContent.phonetic}</span>
                        </div>

                        <div onClick={() => playAudio()} className="bg-purple-500/20 p-6 rounded-full">
                            {dictionaryContent.phonetics && dictionaryContent.phonetics.filter((sound) => sound.audio !== "").map((sound) => (
                                <audio key={sound.audio} ref={audioRef} src={`${sound.audio}`}/>
                            ))}
                            <FaPlay className="w-4 h-4 md:w-6 md:h-6 text-purple-500"/>
                        </div>
                    </div>
        
                    <div className="mt-10">
                        {dictionaryContent.meanings && dictionaryContent.meanings.map((meaning) => (
                            <div key={meaning.partOfSpeech} className="mt-10">
                                <div className="flex justify-center items-center gap-5">
                                    <h3 className="font-bold italic">{meaning.partOfSpeech}</h3>
                                    <div className="flex-1 h-[1px] bg-gray-300"/>
                                </div>

                                <div>
                                    <h4 className="text-gray-500 mt-10">Meaning</h4>
                                    <ul className="list-disc pl-9">
                                        {meaning && meaning.definitions.map((definition) => (
                                            <li key={definition.definition} className="mt-5 text-purple-500">
                                                <p className="text-card-foreground">{definition.definition}</p>
                                                {definition.example && (
                                                    <p className="text-gray-500 mt-2">"{definition.example}"</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {meaning.synonyms && meaning.synonyms.length > 0 && (
                                    <div className="flex mt-10 gap-5 flex-wrap">
                                        <h4 className="text-gray-500">Synonyms</h4>
                                        {meaning.synonyms.map((synonym) => (
                                            <span key={Math.random(1 * 100)} className="text-purple-500 font-bold">{synonym}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5 pt-5 mt-10 mb-10 border-t-[1px] border-t-gray-400">
                        <span className="text-sm text-gray-500">Source</span>
                        <Link target="_blank" href={`${dictionaryContent.sourceUrls}`} className="underline flex items-center gap-2">
                            <span className="text-[9px] md:text-sm">{dictionaryContent.sourceUrls}</span>
                            <FaExternalLinkAlt className="w-3 h-3 text-gray-500 no-underline"/>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex min-h-96 justify-center items-center">
                    <h2 className="text-3xl text-ellipsis overflow-hidden text-center">Word <span className="text-purple-500">"{word.word}"</span> was not found in dictionary!</h2>
                </div>
            )}
        </div>
    </MaxWidthWrapper>
  )
}

export default page