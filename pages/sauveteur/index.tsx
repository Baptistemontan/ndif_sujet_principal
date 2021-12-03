import { GetServerSideProps } from "next";

export default function index() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};
