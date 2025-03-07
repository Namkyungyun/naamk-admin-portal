import Link from "next/link";

export default async function ContentLayout(props) {
  const { children } = props;

  return <div>{children}</div>;
}
