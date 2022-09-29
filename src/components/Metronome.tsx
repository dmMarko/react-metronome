import React, { MutableRefObject, useRef, useState } from "react";
import "./Metronome.css"

import click from '../assets/click.mp3';


function Metronome() {
    const [bpmCount, setBpmCount] = useState(100);
    const [message, setMessage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    
    const previousTaps: MutableRefObject<number[]> = useRef([]);
    const tapsToCheck: number = 3;
    
    const timer = useRef(setInterval(() => {} , 0));

    let increaseBPM = () => {
        setBpmCount(bpmCount + 1);
        resetTaps();
    }

    let decreaseBPM = () => {
        setBpmCount(bpmCount - 1);
        resetTaps();
    }


    let resetTaps = () => {
        previousTaps.current = [];
        setMessage("");
    }

    const iter = useRef(0);

    let handleTap = () => {
        if (previousTaps.current) {
            previousTaps.current.push(new Date().getTime());

            if (previousTaps.current.length > tapsToCheck - 1) {
                let average: number = 0;
                for (let i = 0; i < previousTaps.current.length - 1; i++) {
                    average += previousTaps.current[i+1] - previousTaps.current[i];
                }
                average /= previousTaps.current.length - 1;

                previousTaps.current.shift();

                setBpmCount(Math.floor(1 / average * 60000));
                setMessage("");
            } else {
                setMessage(tapsToCheck - previousTaps.current.length + " taps left to activate")
            }
        }
    }

    let playClick = () => {
        new Audio(click).play();
    }


    let handlePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            timer.current = setInterval(playClick, Math.floor(60 / bpmCount * 1000))
        } else {
            setIsPlaying(false);
            clearInterval(timer.current);
        }

    }


    return (
        <div className="metronome">
            <button className="util-button" onClick={handlePlay}>{isPlaying? "pause": "play"}</button>
            <br />
            <button className="modifier-button" onClick={decreaseBPM}>-</button>
            <span className="BPM-view">{bpmCount}</span>
            <button className="modifier-button" onClick={increaseBPM}>+</button>
            <br />
            <button className="util-button" onClick={handleTap}>tap</button>
            <h1>{message}</h1>
        </div>
    );
}

export default Metronome