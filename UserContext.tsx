import { createContext, useState } from "react";

const UserType = createContext({
  userId: "",
  setUserId: (id: string) => {},
});

interface props {
  children: any;
}

const UserContext = ({ children }: props) => {
  const [userId, setUserId] = useState<string>("");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};
export { UserType, UserContext };
