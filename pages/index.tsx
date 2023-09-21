import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type Person = {
  id: string;
  name: string;
  age: number;
};

type Activity = {
  personId: string;
  activity: string;
  frequency: string;
};

type HomeProps = {
  people: Person[];
  activities: Activity[];
};

const Home: NextPage<HomeProps> = ({ people, activities }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>People Activities</title>
        <meta name="description" content="A Next.js app displaying people and their activities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>People List</h1>

        <ul className="list-group">
          {people.map((person) => (
            <li key={person.id} className="list-group-item">
              <Link href={`/people/${person.id}`}>
                <a>{person.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // Get the path to your JSON files
  const peoplePath = path.join(process.cwd(), 'data/people.json');
  const activitiesPath = path.join(process.cwd(), 'data/activities.json');

  // Read the JSON files and parse the data
  const peopleData: Person[] = JSON.parse(fs.readFileSync(peoplePath, 'utf-8'));
  const activitiesData: Activity[] = JSON.parse(fs.readFileSync(activitiesPath, 'utf-8'));

  // Pass the data to your page component as props
  return {
    props: {
      people: peopleData,
      activities: activitiesData,
    },
  };
}
