import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';


interface Person {
  id: string;
  name: string;
  relatedPersonId: string;
}

interface Detail {
  id: string;
  age: number;
  address: string; 
  relatedPersons: Array<{ id: string; relation: string }>;
}

interface PersonDetailProps {
  person: Person;
  details: Detail;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const persons: Person[] = require('../../public/people.json');
  const paths = persons.map((person) => ({ params: { id: person.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const persons: Person[] = require('../../public/people.json');
  const details: Detail[] = require('../../public/details.json');
  
  const person = persons.find((p) => p.id === params?.id);
  const detail = details.find((d) => d.id === params?.id);

  return { props: { person, details: detail } };
};

const PersonDetail: React.FC<PersonDetailProps> = ({ person, details }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{person.name}</h1>
      <p className={styles.description}>Age: {details.age}</p>
      <p className={styles.description}>Address: {details.address}</p>
      <h2 className={styles.subtitle}>Related Persons</h2>
      <ul className={styles.list}>
        {details.relatedPersons.map((relatedPerson, index) => (
          <li key={index} className={styles.listItem}>
            ID: {relatedPerson.id}, Relation: {relatedPerson.relation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonDetail;
