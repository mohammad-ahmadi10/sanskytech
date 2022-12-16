import {useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { GlobalContext } from './../context/state';
import gsap from "gsap";
import { CustomEase } from 'gsap/all';


const defaultProperties = {
    dark: {
      circle: {
        r: 9,
        color: '#052b47',  
        fill:'#052b47',

    },
    
    mask: {
        cx: '50%',
        cy: '23%',
    },
    svg: {
        transform: 'rotate(40deg)',
        color: '#fff',  
      },
      lines: {
        opacity: 0,
      },
    },
    light: {
      circle: {
        r: 5,
        color: '#ffff60',  
        fill:  '#ffff60'
      },

      mask: {
        cx: '100%',
        cy: '0%',
      },
      svg: {
        transform: 'rotate(90deg)',
        color: '#ffff60',       
    },
      lines: {
        opacity: 1,
      },
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };



  export const Header = () => {
    gsap.registerPlugin(  );
    const themeContext = useContext(GlobalContext);
    const [isLightMode, setLightMode] = useState(true);
    const colorthemeMask = useRef<HTMLDivElement>(null);

  /*   const costumEase = 
    CustomEase.create("custom", "M0,0 C0.043,0.068 0.144,0.027 0.19,0.108 0.271,0.252 0.474,0.284 0.592,0.376 0.778,0.52 0.887,0.682 1,0.682 ");
 */
    const onthemeChangeComplete = () => {
      colorthemeMask.current!.classList.add("hidden");
      gsap.fromTo(colorthemeMask.current, {scale: 1, top:'50%' , opacity:0},
        {scale: 1, top:'-1px' , opacity:0, duration: 0.1, ease: "power2.inOut"});
        document.getElementsByTagName("html")[0].classList.remove("noOverflow");
        colorthemeMask.current!.style.width = "0.25rem";
      colorthemeMask.current!.style.height = "0.25rem";
      colorthemeMask.current!.style.top = "-1px";
      colorthemeMask.current!.style.left = "50%";
    }

    const onBounceComplete = (theme:string) =>{

      document.getElementsByTagName("html")[0].classList.add("noOverflow");

      colorthemeMask.current!.style.width = "100vw";
      colorthemeMask.current!.style.height = "100vh";
      colorthemeMask.current!.style.top = "0";
      colorthemeMask.current!.style.left = "0";


      gsap.fromTo(colorthemeMask.current, {scale:0,  borderRadius:0, opacity:1, backgroundColor: theme === "light" ? "white" : "black"}, 
      {scale: 1 , borderRadius:'50%', opacity:0, duration: 0.5, ease:"expo.inOut"
        , onComplete:onthemeChangeComplete});

        // Wait 550ms and then set the theme
        setTimeout(() => {
          localStorage.setItem("theme", theme);
          const html = document.getElementsByTagName("html")[0];
          html.setAttribute("data-theme", theme);
          html.className = theme;
          themeContext.setDefaultTheme(theme);
        }, 250);


    }


    const toggleDarkMode = (checked: boolean) => {
      setLightMode(checked);
      const theme = checked ?  "light" : "dark" ;
        
      colorthemeMask.current!.classList.remove("hidden");

      
          gsap.fromTo(colorthemeMask.current, {top:'-1px',  opacity:1, backgroundColor: theme === "light" ? "white" : "black"}, 
          { top:'50%',  opacity:1, duration: 0.25, ease:"bounce.out"
            , onComplete:_=> onBounceComplete(theme)});
      };


      // On mount, check if the user has a theme preference in localStorage
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setLightMode(theme === "light");
            const html = document.getElementsByTagName("html")[0];
            html.setAttribute("data-theme", theme);
            html.className = theme;
            themeContext.setDefaultTheme(theme);
        }
        
    }, []);



 


    return ( 
          <header className="flex">
            <div ref={colorthemeMask} className={` w-1 h-1  opacity-1  absolute z-[10000] 
                                                  left-2/4 -top-1
                                                  origin-center bg-white 
                                                  `}>

            </div>      


            <div className='flex w-full justify-end relative justify-center items-center m-0 mr-auto'>
    
            <div className='m-auto mr-0'>
            
            <DarkModeSwitch
                style={{ margin: '1rem' }}
                checked={isLightMode}
                onChange={toggleDarkMode}
                animationProperties={defaultProperties}
                size={25}
                />
    
            </div>

                </div>

            </header>
                      
    )
}


