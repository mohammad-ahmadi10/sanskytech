import styles from '@/styles/Heading.module.scss';

interface HeadingType {
    children: React.ReactNode;
    onHeading?: (name:string) => void;
}


const Heading = ({children , onHeading}:HeadingType)  =>{

  const handleOnClick = (e:React.MouseEvent<HTMLDivElement>) =>{
    const name = (e.currentTarget.childNodes[0] as HTMLHeadElement).innerHTML;
    if(onHeading)
    onHeading(name);
  }


  return (
    <div className={styles.heading} onClick={e=>  handleOnClick(e)}>{children}</div>
  )
}

export default Heading