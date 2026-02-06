import { TheArtifact } from "@/components/artifact/TheArtifact";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      {/* The Hero: 2.5D Artifact */}
      <TheArtifact />

      {/* Minimal Call to Action */}
      <div className="mt-8 text-center space-y-4">
        <h2 className="text-xl font-medium tracking-tight">The Digital Ghost System</h2>
        <p className="text-sm text-muted max-w-md mx-auto">
          Sovereignty is not given. It is engineered.
        </p>
      </div>
    </div>
  );
}
