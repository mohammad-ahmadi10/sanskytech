import Image from 'next/image';
import { useCallback, useState, useEffect, useContext } from 'react';
import {DropEvent, FileRejection, useDropzone} from 'react-dropzone'
import { GlobalContext } from './../context/state';
import {fileType} from "./../../types/createblogtypes";


export default function App() {
    const [isLoad, setIsLoad] = useState(false);
    const [base64, setBase64] = useState<string>('');

    
    const themeContext = useContext(GlobalContext);

    useEffect(() =>{
      if(localStorage.getItem("img")){
        const image = localStorage.getItem("img")!;
        setBase64(image);
        setIsLoad(true);
      }
    }, [themeContext.defaultTheme])

    

    const thumb = () =>{
      return <div className='inline-flex rounded-sm relative
                              border border-slate-500/50 dark:border-[#eaeaea] my-8 w-[230px] h-[230px] sm:w-[500px] sm:h-[300px]  p-2 box-border'>
              <div className='flex m-w-0 overflow-hidden relative w-full h-full'>
                <Image src={base64} alt='preview' object-fit='contain' fill className='object-contain'          
                />
              </div>                    

      </div>
    }
    const onDrop = useCallback((acceptedFiles: any[] , fileRejections: FileRejection[], event: DropEvent) => {
      
      const reader = new FileReader();
      reader.onloadend = () =>{
        const r = reader.result;
        setBase64(r as string);
        setIsLoad(true);
        localStorage.setItem("img", r as string);        
      }
      reader.readAsDataURL(acceptedFiles[0])

      

        
      }, [])
      const {getRootProps, getInputProps} = useDropzone({accept:{'image/*':[]} ,onDrop})
    return (
      <>
        <label htmlFor="main-image" className='dark:text-[#a6adba] text-[0.875rem] pl-2'>Main image</label>
        <div id="main-image" {...getRootProps({className:'flex flex-col items-center border border-dashed border-black dark:border-white p-3'})} >
          <input {...getInputProps()} />
          <p className={`${isLoad ? "text-xs self-stretch" : "text-lg"} text-gray-700`}>Select or drop a main image</p>
          <aside className='flex flex-row flex-wrap margin-top-6 justify-center items-center
                          '>
              {
                base64 !== '' &&
                thumb()}
          </aside>
        </div>
        </>
      )
    
}