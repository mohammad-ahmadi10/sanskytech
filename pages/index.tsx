import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '@/styles/Home.module.scss'

import Link from 'next/link';
/* import { Button } from 'antd';
import "antd/dist/antd.dark.css" */


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sanskytech blog</title>
        <meta name="description" content="Be on the sanskytech blog to get more recent Information around Technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main>
          <Link href="/blog/create-new-blog">
            <span className='px-3 py-3 bg-blue-500 rounded-sm hover:bg-sky-700' >
              <span >New Blog</span> 
            </span>
          </Link>
        </main>
     </div>
  )
}

export default Home
