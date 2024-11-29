import { LuArrowUpDown, LuUser } from "react-icons/lu";
import { PageEnum } from "./enum";
import { IoKeyOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { MdHistory, MdOutlineMail } from "react-icons/md";

export const navItem = [
  {
    name: "account",
    icon: <LuUser />,
    href: `/${PageEnum.Account}/${PageEnum.Profile}`
  },
  {
    name: "change_password",
    icon: <IoKeyOutline />,
    href: `/${PageEnum.Account}/${PageEnum.ChangePass}`
  },
  {
    name: "my_bank_account",
    icon: <CiBank />,
    href: `/${PageEnum.Account}/${PageEnum.BankAccount}`
  },
  {
    name: "records",
    icon: <LuArrowUpDown />,
    href: `/${PageEnum.Account}/${PageEnum.Record}`
  },
  {
    name: "transaction_report",
    icon: <MdHistory />,
    href: `/${PageEnum.Account}/${PageEnum.Transaction}`
  },
  {
    name: "inbox",
    icon: <MdOutlineMail />,
    href: `/${PageEnum.Account}/${PageEnum.Inbox}`
  },
  // {
  //   name: "vip",
  //   icon: <MdOutlineDiamond />,
  //   href: `/${PageEnum.Account}/${PageEnum.Vip}`
  // },
]