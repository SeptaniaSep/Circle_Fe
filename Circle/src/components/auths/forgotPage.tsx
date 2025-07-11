import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPage() {
  return (
    <div className="min-h-screen flex mt-10 justify-center bg-[#111] text-white">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-4xl font-semibold text-green-600 mb-1">circle</h1>
        <h2 className="text-xl font-semibold mb-6">Forgot password</h2>

        <form className="space-y-3">
          <Input
            type="email"
            placeholder="Email*"
            className="border border-gray-600 text-white"
          />

          <Button
            type="submit"
            className="w-full rounded-full bg-green-600 hover:bg-green-700 mt-2"
          >
            Send Instruction
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Already have account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
