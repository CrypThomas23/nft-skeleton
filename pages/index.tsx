import BaseLayout from "@components/ui/layout/base";
import type { NextPage } from "next";
import { PropsWithChildren } from "react";

type Props = {};

const HomePage: NextPage = ({}: PropsWithChildren<Props>) => {
  return <BaseLayout></BaseLayout>;
};

export default HomePage;
