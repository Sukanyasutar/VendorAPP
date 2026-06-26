import { useNavigate } from "react-router";
import { FileQuestion } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
        <FileQuestion className="h-10 w-10 text-neutral-400" />
      </div>
      <h1 className="mt-6 text-xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-neutral-500">The page you're looking for doesn't exist.</p>
      <Button className="mt-6" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
}
