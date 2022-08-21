import { CardList, CardProps, Spinner } from '@/components';
import { db } from '@/firebase';
import { collection, QueryDocumentSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';

function lowercaseIncludes(string1: string, string2: string) {
  return string1.toLowerCase().includes(string2.toLowerCase());
}

export default function Search() {
  const [filtered, setFiltered] = useState<QueryDocumentSnapshot<CardProps>[]>(
    []
  );
  const { query } = useRouter();
  const { string } = query;

  const [posts, loading, error] = useCollection(collection(db, 'posts'));

  useEffect(() => {
    const filteredPosts = posts?.docs.filter((post) => {
      const { to, badge, message } = post.data();

      if (
        lowercaseIncludes(to, string as string) ||
        lowercaseIncludes(badge, string as string) ||
        lowercaseIncludes(message, string as string)
      ) {
        return post;
      }
    });

    setFiltered(
      filteredPosts as SetStateAction<QueryDocumentSnapshot<CardProps>[]>
    );
  }, [posts, string]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <h2 className="text-gray-300 mb-4 font-semibold">
        Search results for: {string}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
        <CardList posts={filtered} />
      </div>
    </>
  );
}
