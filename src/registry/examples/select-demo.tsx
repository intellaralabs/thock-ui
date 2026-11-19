import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <Select defaultValue="sunset">
      <SelectTrigger className="w-60" aria-label="Theme">
        <SelectValue placeholder="Pick a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Warm</SelectLabel>
          <SelectItem value="sunset">Sunset</SelectItem>
          <SelectItem value="ember">Ember</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Cool</SelectLabel>
          <SelectItem value="glacier">Glacier</SelectItem>
          <SelectItem value="midnight">Midnight</SelectItem>
          <SelectItem value="neon" disabled>Neon (soon)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
