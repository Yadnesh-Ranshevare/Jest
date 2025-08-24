"use client"

// components/User.js
import { useEffect, useState } from "react";
type User = {
    id: number;
    name: string;
}
export default function User() {
  const [user, setUser] = useState<User>({} as User);

  useEffect( () => {
    const fetchData = async ()=> {
        await fetch("/api/user")
            .then((res) => res.json())
            .then(setUser);
    }
    fetchData()
  }, []);

  if (!user) return <p>Loading...</p>;
  return <p>Hello {user.name}</p>;
}
