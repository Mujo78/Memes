
import React, {useEffect, useState} from 'react';


export default function Main(){
   
    //const [memeImage, setMemeImg] = useState("");
   
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemeImages, setAllMemeImages] = useState([])
    

    useEffect(() => {
        async function getMemes(){
        const res = await fetch(`https://api.imgflip.com/get_memes`)
        const data = await res.json()
        setAllMemeImages(data.data.memes)
        }
        getMemes();

    }, [])

    function handleChange(event){
        setMeme(n =>{
            return{
                ...n,
                [event.target.name]:event.target.value        
            }
        })
    }
    
    function GetImage() {
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    name='topText'
                    placeholder="Top text"
                    value={meme.topText}
                    onChange={handleChange}
                    className="form--input"
                />
                <input 
                    type="text"
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                    placeholder="Bottom text"
                    className="form--input"
                />
                <button 
                    className="form--button"
                    onClick={GetImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt='nis' />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}