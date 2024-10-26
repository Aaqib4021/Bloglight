import axios from "axios";
import  { useEffect, useState } from "react";

export const Phrases = () => {
    const [phrases ,setPhrases] = useState("");

    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://quotes15.p.rapidapi.com/quotes/random/',
            params: {
              language_code: 'en'
            },
            headers: {
              'x-rapidapi-key': 'f6b09a5cacmshe47fd78a9d93598p1fe9c1jsn648c8783eccd',
              'x-rapidapi-host': 'quotes15.p.rapidapi.com'
            }
          };

          try {
               axios.request(options).
               then(response =>{
                setPhrases(response.data.content)
               })
          } catch (error) {
              console.error(error);
          }
    },[])
      return phrases;
};
