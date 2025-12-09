import Question from "@/components/form/Question";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-200">
      <div className="text-center space-y-4 ">
        {/* Use component */}
        <Question/>
      </div>
    </div>
  );
}
