import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

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

type PersonDetailsProps = {
  person: Person;
  relatedActivities: Activity[];
};

const PersonDetails = ({ person, relatedActivities }: PersonDetailsProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{person.name}'s Details</h1>
      <p>Age: {person.age}</p>
      <h2>Related Activities</h2>
      <ul>
        {relatedActivities.map((activity, index) => (
          <li key={index}>
            Activity: {activity.activity}, Frequency: {activity.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonDetails;

export async function getStaticPaths() {
  const peoplePath = path.join(process.cwd(), 'data/people.json');
  const peopleData: Person[] = JSON.parse(fs.readFileSync(peoplePath, 'utf-8'));

  const paths = peopleData.map((person) => ({
    params: { id: person.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const peoplePath = path.join(process.cwd(), 'data/people.json');
  const activitiesPath = path.join(process.cwd(), 'data/activities.json');

  const peopleData: Person[] = JSON.parse(fs.readFileSync(peoplePath, 'utf-8'));
  const activitiesData: Activity[] = JSON.parse(fs.readFileSync(activitiesPath, 'utf-8'));

  const person = peopleData.find((person) => person.id === params.id);
  const relatedActivities = activitiesData.filter((activity) => activity.personId === params.id);

  return {
    props: {
      person,
      relatedActivities,
    },
  };
}
