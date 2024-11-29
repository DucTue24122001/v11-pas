import AccountLayout from "@/components/account/layouts/AccountLayout";

export default function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccountLayout>
      {children}
    </AccountLayout>
  )
}