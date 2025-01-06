import { useEffect, useState } from 'react'
import "./Pokemon.css"
export const Pokemon=()=>{
    const[apidata,setApiData]=useState(null);
    const[error,setError]=useState(true);
    const[loading,setLoading]=useState(true);

    const API="https://pokeapi.co/api/v2/pokemon?limit=32";
     const arr=[10,20,30,40,50,60,70,80,90,100,300,400]
    const pokemonData= async ()=>{
    try {
     const respond=await fetch(API);
     const data=await respond.json();
    //  console.log(data);
     
     const pokemonDataAll=data.results.map( async (data)=>{
        
        const res= await fetch(data.url);
        const allData= await res.json();
        
        
        return allData;
        
        
        
     })
    //  console.log(pokemonDataAll);
     
     const allApi= await Promise.all(pokemonDataAll);
     setApiData(allApi)
    
     
     
     
     setLoading(false);
     setError(false);
    } catch (error) {
      setError(error);
       setLoading(false)
    }
    }
    useEffect(()=>{
     pokemonData();
    },[])
   
   if(loading){
     return(
       <div className="load">
         <h1>Loading...</h1>
       </div>
     )
   }
   if(error){
     return(
       <div className="load">
         <h1>{error.message}</h1>
       </div>
     )
   }
     return (
       <>
       <div className='inputdata'>
       <input type="text" placeholder='Enter Name'/>
       </div>
       <div className='container'>
       {
        apidata.map((data,index)=>{
           return (
            <>
              <div className='box' key={index}>
                <p>
                <h2>{data.name.toUpperCase()}</h2>
                </p>
            
            <div className='img'>
                <img src={data.sprites.other.dream_world.front_default} alt="" />
            </div>
            <div className='allInfo'>
                    <h3>Height: {data.height}</h3>
                    <h3>Weight: {data.weight}</h3>
                    <h3>Speed: {data.stats[0].base_stat}</h3>
                    <h3>Abilities: {data.abilities[0].ability.name}</h3>
            </div>
            </div>
            </>
           )
        })
       }
       </div>
       </>
     )
}