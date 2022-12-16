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
      document.getElementsByTagName("html")[0].classList.remove("noOverflow");
      gsap.fromTo(colorthemeMask.current, {scale: 2600, opacity:0},
        {scale: 0, opacity:0, duration: 0.1, ease: "power2.inOut"});
    }


    const toggleDarkMode = (checked: boolean) => {
      setLightMode(checked);
      const theme = checked ?  "light" : "dark" ;
        
       gsap.fromTo(colorthemeMask.current, {scale: 0, opacity:1, backgroundColor: theme === "light" ? "#ffff60" : "black"}, 
        {scale: 2600 , opacity:0, duration: 1, ease:"expo.inOut"
          , onComplete:onthemeChangeComplete});
        document.getElementsByTagName("html")[0].classList.add("noOverflow");
        
        
        // Wait 550ms and then set the theme
        setTimeout(() => {
          localStorage.setItem("theme", theme);
          const html = document.getElementsByTagName("html")[0];
          html.setAttribute("data-theme", theme);
          html.className = theme;
          themeContext.setDefaultTheme(theme);
        }, 550);
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

            <div className='flex w-full justify-end relative justify-center items-center m-0 mr-auto'>
    
            <div className='m-auto mr-0 relative'>

            <div ref={colorthemeMask} className={` w-1 h-1 opacity-1 rounded-full absolute z-[10000] 
                                                  -translate-x-1/2 -translate-y-1/2 left-2/4 top-1/2
                                                  `}>
            </div>
            <DarkModeSwitch
                style={{ margin: '1rem' }}
                checked={isLightMode}
                onChange={toggleDarkMode}
                animationProperties={defaultProperties}
                size={40}
                />
    
            </div>

                </div>

            </header>
                      
    )
}


