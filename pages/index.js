import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date/date';
//import useSWR from 'swr'; // Fetch hook creado por el team de nextJs, al parecer es bueno

/* Esto del pre render es muy bonito, static pre render para generar pre render al momento del build y exportarlo a todos, usamos
Pre render del server para hacer un pre render con cada request, quizas no podamos hacer fetch 1 sola vez y ya, tal vez sea una pagina con querys dinamicos ( esto es mas lento )*/

/* Client side render, seria hacer el pre render con templates que no necesiten datos y luego cuando el js cargue, popular el resto, de la forma normal */

/* Hacemos un fetch de datos (si es necesario tener datos en nuestras pre render pages) usando getStaticProps(ejecutada en el server), estos datos van a los props que 
se usaran en la pagina pre render que queramos que se genera en el build de nextjs, solo podemos llamar esta funcion dentro de una page*/
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
/* Las paginas de Nextjs son pre renderizadas con lo basico para cargar mas rapido, luego llega el js y se rehidrata la pagina y se vuelve ya interactiva y full 
si le enviamos props con datos del static props, podremos enviarle datos del backend al pre render*/
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey i'm Jose a FrontEnd developer</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// usando el fetch de los de nextJs, se ve bueno
function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}

//Server side rendering
/* export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
} */
