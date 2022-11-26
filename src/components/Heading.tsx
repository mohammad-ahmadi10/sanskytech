import styles from '@/styles/Heading.module.scss';

interface HeadingType {
    children: React.ReactNode;
    onHeading?: (name:string) => void;
}


const Heading = ({children , onHeading}:HeadingType)  =>{
  return (
    <div className={styles.heading} onClick={e=> onHeading ? onHeading((e.currentTarget.childNodes[0] as HTMLHeadElement).innerHTML) : console.log("no function")}>{children}</div>
  )
}

export default Heading