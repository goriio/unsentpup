import { CardList, CardProps, Spinner } from '@/components';
import { db } from '@/firebase';
import {
  collection,
  CollectionReference,
  orderBy,
  query,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';

export default function Home() {
  const [posts, loading, error] = useCollection(
    query(
      collection(db, 'posts') as CollectionReference<CardProps>,
      orderBy('date', 'desc')
    )
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
        <CardList posts={posts?.docs} />
      </div>
    </>
  );
}
