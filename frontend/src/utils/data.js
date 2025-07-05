import { LuLayoutDashboard, LuWalletMinimal, LuHandCoins, LuLogOut } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbTransactionRupee } from "react-icons/tb";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id:"04",
    label:"All Transactions",
    icon:TbTransactionRupee ,
    path:"/all",

  },
  {
    id:"05",
    label:"Splitwise",
    icon:RiMoneyRupeeCircleFill
,
    path:"/splitwise-details"
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "/logout",
  },

];
