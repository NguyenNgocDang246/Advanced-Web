import axios from "axios";

export interface RegisterData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const res = await axios.post("http://localhost:3000/user/register", data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Request error");
    }
    throw new Error("Unexpected error");
  }
};

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const res = await axios.post("http://localhost:3000/user/login", data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Request error");
    }
    throw new Error("Unexpected error");
  }
};

export const getUserInfo = async (accessToken: string) => {
  const res = await axios.get("http://localhost:3000/user/info", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log(res.data.data);
  return res.data.data;
};
