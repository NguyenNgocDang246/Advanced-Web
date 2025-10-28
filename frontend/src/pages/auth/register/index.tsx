import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { registerUser } from "../../../api/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => setMessage(`Registered successfully, ${data.data.email}!`),
    onError: (error) => setMessage(`${error}`),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setMessage(null);
      await mutation.mutateAsync(value);
    },
  });

  return (
    <div>
      <h2 className="text-3xl mb-6 text-center font-bold text-blue-700">Sign Up</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Email is required"
                : !/\S+@\S+\.\S+/.test(value)
                ? "Invalid email address"
                : undefined,
          }}
        >
          {(field) => (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@example.com"
              />
              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => (value.length < 6 ? "At least 6 characters" : undefined),
          }}
        >
          {(field) => (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••"
              />
              {field.state.meta.errors?.[0] && (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition disabled:opacity-70"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log in here
        </Link>
      </p>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 hover:text-blue-600 underline"
        >
          ← Back to Home
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.startsWith("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
