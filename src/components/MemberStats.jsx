import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const MemberStats = () => {
  const [memberCounts, setMemberCounts] = useState({
    admin: 0,
    creators: 0,
    creatorLite: 0,
  });
  const [roleFirstLetters, setRoleFirstLetters] = useState({
    admin: "",
    creators: "",
    creatorLite: "",
  });
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setTotalMembers(users.length);

      const counts = { admin: 0, creators: 0, creatorLite: 0 };
      const firstLetters = { admin: "", creators: "", creatorLite: "" };

      users.forEach(({ member_role, member_name }) => {
        const role = member_role.trim().toLowerCase();

        if (role === "admin") {
          counts.admin += 1;
          if (!firstLetters.admin)
            firstLetters.admin = member_name.charAt(0).toUpperCase();
        }

        if (role === "creators") {
          counts.creators += 1;
          if (!firstLetters.creators)
            firstLetters.creators = member_name.charAt(0).toUpperCase();
        }

        if (role === "creator_lite") {
          counts.creatorLite += 1;
          if (!firstLetters.creatorLite)
            firstLetters.creatorLite = member_name.charAt(0).toUpperCase();
        }
      });

      setMemberCounts(counts);
      setRoleFirstLetters(firstLetters);
    });

    return () => unsubscribe();
  }, []);

  const roles = [
    {
      role: "Admin",
      count: memberCounts.admin,
      firstLetter: roleFirstLetters.admin,
    },
    {
      role: "Creators",
      count: memberCounts.creators,
      firstLetter: roleFirstLetters.creators,
    },
    {
      role: "Creator Lite",
      count: memberCounts.creatorLite,
      firstLetter: roleFirstLetters.creatorLite,
    },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mt-10 mb-6">Members ({totalMembers})</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-blue-100 rounded-xl py-4">
        {roles.map(({ role, count, firstLetter }, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-end px-8 py-4 border-r border-gray-300 last:border-0"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold">{count}</h3>
              <p className="text-md font-medium">{role}</p>
            </div>
            {count > 0 && firstLetter && (
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-white text-xl font-bold">
                {firstLetter}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberStats;
