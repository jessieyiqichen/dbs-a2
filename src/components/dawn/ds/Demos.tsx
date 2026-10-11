"use client";
// Live examples for the design-system page: the walk card with its list button, and a toggling primary button.
import { useState } from "react";
import type { TrailPhoto } from "../Toned";
import { PrintCard } from "./Pieces";
import { PrimaryButton, SecondaryButton } from "./Primitives";

export function CardDemo({ id, photo }: { id: string; photo: TrailPhoto }) {
  const [on, setOn] = useState(false);
  return (
    <PrintCard
      id={id}
      photo={photo}
      footer={<SecondaryButton small selected={on} onClick={() => setOn(!on)}>{on ? "On my list" : "+ My list"}</SecondaryButton>}
    />
  );
}

export function AddToListDemo() {
  const [on, setOn] = useState(false);
  return <PrimaryButton selected={on} onClick={() => setOn(!on)}>{on ? "On your list" : "Add to my list"}</PrimaryButton>;
}
