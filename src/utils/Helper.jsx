export const SIDEBAR_MENU = [
  {
    id: 0,
    name: "Dashboard",
    icon: "fa fa-dashboard",
    link: "/dashboard",
    active: false,
  },
  {
    id: 1,
    name: "Users",
    icon: "fa fa-users",
    link: "/users",
    active: false,
  },
];

export const MEMBER_LIST = [
  {
    id: 0,
    member_name: "Alex Smith",
    member_email: "alex.smith@gmail.com",
    member_role: "Admin",
    date_added: "29 July 2024",
    Status: "Active",
  },
  {
    id: 1,
    member_name: "Sam Lee",
    member_email: "samlee1@gmail.com",
    member_role: "Creator",
    date_added: "29 July 2024",
    Status: "Active",
  },
];

export const roleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Creators", value: "creators" },
  { label: "Creator Lite", value: "creator_lite" },
];

export const statusOptions = ["All", "Active", "Inactive"];
