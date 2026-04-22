import { createFileRoute } from "@tanstack/react-router";
import PRORioja from "@/components/PRORioja";

export const Route = createFileRoute("/")({
  component: PRORioja,
});
