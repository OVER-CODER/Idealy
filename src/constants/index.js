export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/dashboard",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/dashboard/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/dashboard/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/dashboard/create-idea",
      label: "Create Idea",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/dashboard/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/dashboard/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "ideas", label: "Ideas", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "ideas", label: "Ideas", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];