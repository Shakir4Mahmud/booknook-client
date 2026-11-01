"use client";

import { CloudOff } from "lucide-react";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";

export default function ErrorState({ message, onRetry }) {
  return (
    <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
      <span className="logo-tile mb-4">
        <CloudOff className="h-5 w-5" />
      </span>
      <h3 className="text-xl font-bold">Could not load data</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {message || "Something went wrong. Please try again."}
      </p>
      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          className="btn-gloss mt-6 rounded-full px-8"
        >
          Try again
        </Button>
      )}
    </GlassCard>
  );
}