import { cardVariants, Color } from "@/components";
import { db } from "@/firebase";
import clsx from "clsx";
import { doc, getDoc } from "firebase/firestore";
import dayjs, { dateFormat } from "@/lib/dayjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Post({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { color, to, badge, message, date } = data;

  return (
    <div className="grid grid-cols-1 w-full md:w-1/2 mx-auto">
      <div
        className={clsx(
          "w-full mx-auto mb-2 p-8 md:p-16 text-gray-100 rounded-md",
          cardVariants[color as Color]
        )}
      >
        <h2 className="font-semibold text-2xl md:text-5xl mb-2 md:mb-4">
          <span className="text-gray-200">To: </span>
          {to}
        </h2>
        <p className="text-gray-200 text-md md:text-xl">
          <pre className="whitespace-pre-wrap font-sans">{message}</pre>
        </p>
      </div>
      <div className="flex items-center justify-between font-semibold text-gray-400 text-sm md:text-lg">
        <span>{badge}</span>
        <span>{dateFormat(date)}</span>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getDoc(doc(db, "posts", id));
  if (!response.data()) {
    return { notFound: true };
  }

  return {
    props: {
      data: {
        ...response.data(),
        date: response?.data()?.date.seconds * 1000,
      },
    },
  };
};
