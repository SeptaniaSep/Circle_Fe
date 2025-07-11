import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Password tidak cocok.");
      return;
    }
    // Lanjut ke API call reset password
    console.log("Password baru:", password);
  };

  return (
    <div className="min-h-screen flex mt-10 justify-center text-white">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-4xl font-semibold text-green-600 mb-1">circle</h1>
        <h2 className="text-xl font-semibold mb-6">Reset password</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="New Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" border border-gray-600 text-white"
          />
          <Input
            type="password"
            placeholder="Confirm New Password*"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className=" border border-gray-600 text-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full rounded-full bg-green-600 hover:bg-green-700 mt-2"
          >
            Create New Password
          </Button>
        </form>
      </div>
    </div>
  );
}
