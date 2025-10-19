import { ref } from "vue";
import axios from "axios";
import { clientUrl } from "../utils/constants";

const user = ref(null);

export function useAuth() {
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) return null;
    try {
      const res = await axios.get(`${clientUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      user.value = res.data;
      return res.data;
    } catch (e) {
      console.error("Ошибка получения профиля:", e);
      return null;
    }
  };

  const logout = (router: any) => {
    localStorage.removeItem("token");
    user.value = null;
    router.push("/");
  };

  return { user, fetchProfile, logout, token };
}
