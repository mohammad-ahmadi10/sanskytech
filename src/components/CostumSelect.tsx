import { useContext, useEffect, useState } from "react";
import { StylesConfig } from "react-select";
import Select from 'react-select/creatable';
import { GlobalContext } from "../context/state";
import {TagOption, TagOptions} from "./../utils/Tags"







export  default () => {

    const themeContext = useContext(GlobalContext);
  let colourStyles  : StylesConfig<TagOption , true>;

  const onMenuOpen = () => {
  }

    colourStyles = {
      control: (styles, cx) => ({ ...styles }),
      
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: themeContext.defaultTheme === "light" ? "black" : "white",
          ":hover": {
            backgroundColor: themeContext.defaultTheme === "light" ? "black" : "white",
            color: themeContext.defaultTheme === "light" ? "white" : "black",
          },
          
        };
      }
     
    };





    return ( 
      <div className="w-full">
        <label className="label" htmlFor="long-value-select">
        <span className="label-text">Tags</span>
        </label>

    <Select
      id="long-value-select" instanceId="long-value-select"
      closeMenuOnSelect={false}
                //menuPortalTarget={document.body}
                defaultValue={[TagOptions[0], TagOptions[1]]}
                isMulti
                options={TagOptions}
                

                styles={colourStyles}


                theme={theme => ({...theme,
                  colors:{
                    ...theme.colors,
                    neutral0: themeContext.defaultTheme === "light" ? "white" : "#2B2A33",
/*                     neutral5: themeContext.defaultTheme === "light" ? "black" : "white", */
                    neutral10: themeContext.defaultTheme === "light" ? "#e6e6e6" : "#666666", // single container background
                    neutral20: themeContext.defaultTheme === "light" ? "#d5d7d2" : "#ffffff53",
/*                     neutral30: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral40: themeContext.defaultTheme === "light" ? "black" : "white", */
                    neutral50: themeContext.defaultTheme === "light" ? "#b6b7b5" : "white",
/*                     neutral60: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral70: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral80: themeContext.defaultTheme === "light" ? "black" : "white",
                    neutral90: themeContext.defaultTheme === "light" ? "black" : "white", */
                    
                    primary25: "transparent" ,
                   primary50: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary75: themeContext.defaultTheme === "light" ? "black" : "white",
                    primary90: themeContext.defaultTheme === "light" ? "black" : "white",
                     primary95: themeContext.defaultTheme === "light" ? "black" : "white",
                  },
                  borderRadius: 0,
                  spacing: {
                    baseUnit: 4,
                    controlHeight: 50,
                    menuGutter: 0,
                  }
                })}

                placeholder="Select Tags for this blog..." 
                onMenuOpen={onMenuOpen}
                />
      </div>
      )

    };