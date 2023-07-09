import { useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UpdateUser() {
    const [user2, setUser] = useState({ userId: "", name: "", email: "" });
    const { user, error, isLoading } = useUser();
    // if (user && !isLoading) {
    //     const response = axios.patch(`https://harmony.jp.auth0.com/api/v2/users/${user.sub}`, {"name":"ad","email":"admin2@harmony.hires"}, {
    //         headers: {
    //             audience : "https://harmony.jp.auth0.com/api/v2/",
    //             Authorization: `Bearer ${user.accessToken}`,
    //         },
    //     });
    // }
    const handleUpdate = async () => {
        try {
            const response = await axios.patch("/api/users/update", {
                userId: user2.userId,
                userData: { name: user2.name, email: user2.email },
            });
            // const response = await axios.patch(`https://harmony.jp.auth0.com/api/v2/users/auth0|64a007a85d8d7f318a0edbab`, { name: "ASD", email: "admin2@harmony.hires" }, {
            //     headers: {
            //         audience: "https://harmony.jp.auth0.com/api/v2/",
            //         Authorization: `Bearer ${user.accessToken}`,
            //     },
            // });
            console.log("User data updated:", response.data);
        } catch (error) {
            console.error("Error updating user2 data:", error);
        }
    };

    return (
        <div>
            <input type="text" value={user2.userId} onChange={(e) => setUser({ ...user2, userId: e.target.value })} placeholder="User ID" />
            <input type="text" value={user2.name} onChange={(e) => setUser({ ...user2, name: e.target.value })} placeholder="Name" />
            <input type="text" value={user2.email} onChange={(e) => setUser({ ...user2, email: e.target.value })} placeholder="Email" />
            <button onClick={handleUpdate}>Update User</button>
        </div>
    );
}
