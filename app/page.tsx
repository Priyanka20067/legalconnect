import connectDB from '@/lib/mongoose';
import LawyerModel, { Lawyer } from '@/models/Lawyer';
import Link from 'next/link';
import styles from './styles/Home.module.css';

export default async function Home() {
  await connectDB();
  const lawyers: Lawyer[] = await LawyerModel.find().lean<Lawyer[]>();

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Welcome to LegalConnect</h1>
      <h2 className={styles.sectionTitle}>Available Lawyers</h2>
      {lawyers.length === 0 ? (
        <p className={styles.noLawyers}>No lawyers found.</p>
      ) : (
        <ul className={styles.lawyersGrid}>
          {lawyers.map((lawyer) => (
            <li key={lawyer._id} className={styles.lawyerCard}>
              <h3 className={styles.lawyerName}>{lawyer.name}</h3>
              <p className={styles.lawyerSpecialization}>Specialization: {lawyer.specialization}</p>
              <Link href={`/lawyers/${lawyer._id}`} className={styles.profileLink}>
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}