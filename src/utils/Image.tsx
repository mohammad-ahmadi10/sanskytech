import Image from "next/image";

export default function EmbadedImage({ src,alt,width,height, position }: 
    { src:string,alt:string,width:number,height:number, position:string }) {
        console.log(position);

        const getPosition = () => {
            if(!position) return;
            
            switch(position.toLowerCase()){
                case "left":
                    return "justify-start";
                case "right":
                    return "justify-end";
                case "center":
                    return "justify-center";
            }
        }
  return (
    <div className={`flex ${getPosition()} align-center w-full`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height} 
      />
    </div>
  );
}